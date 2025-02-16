import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

import Book from '../books/book.model'; // Assuming you have a Book model
import { IUser } from '../users/user.interface';
import Order from './order.model';
import { orderUtils } from './order.utils';

const createOrder = async (
  user: IUser,
  payload: { books: { book: string; quantity: number }[] }, // Updated to books instead of products
  client_ip: string,
) => {
  if (!payload?.books?.length)
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Order is not specified');

  const books = payload.books;

  let totalPrice = 0;
  const bookDetails = await Promise.all(
    books.map(async (item) => {
      const book = await Book.findById(item.book); // Fetching book instead of product
      if (book) {
        const subtotal = book ? (book.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item; // You can modify this to return book details, if needed
      }
    }),
  );

  let order = await Order.create({
    user,
    books: bookDetails,
    totalPrice,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_email: user.email,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

const getOrders = async () => {
  const data = await Order.find();
  return data;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

export const orderService = {
  createOrder,
  getOrders,
  verifyPayment,
};
