import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { bookService } from './book.service';

// create a controller for create book
const createBook = catchAsync(async (req, res) => {
  await bookService.createBook(req.body); // Changed bikeService to bookService
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Book created successfully',
    statusCode: StatusCodes.OK,
  });
});

// get all books
const getBooks = catchAsync(async (req, res) => {
  const queryData = req?.query;
  const result = await bookService.getBook(queryData);
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'All books retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result.result,
    meta: result.meta,
  });
});

const getSpecificBook = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const result = await bookService.getSpecificBook(productId);
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Book retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const updateBook = catchAsync(async (req, res) => {
  const productId = req?.params?.productId;
  const body = req.body;
  const result = await bookService.updateBook(productId, body);
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Book updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
const deleteBook = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  await bookService.deleteBook(productId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Book deleted successfully',
    statusCode: StatusCodes.OK,
    data: null,
  });
});

export const bookController = {
  createBook,
  getBooks,
  getSpecificBook,
  updateBook,
  deleteBook,
};
