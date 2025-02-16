import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { bookService } from './book.service';

// create a controller for create book
const createBook = catchAsync(async (req, res) => {
  console.log(req.body);
  await bookService.createBook(req.body);
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
  const bookId = req.params.bookId;
  const result = await bookService.getSpecificBook(bookId);
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'A single BOOK retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const updateBook = catchAsync(async (req, res) => {
  const bookId = req?.params?.productId;
  const body = req.body;
  const result = await bookService.updateBook(bookId, body);
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Book updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
const deleteBook = catchAsync(async (req, res) => {
  const bookId = req.params.bookId;
  await bookService.deleteBook(bookId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Book deleted successfully',
    statusCode: StatusCodes.OK,
    data: null,
  });
});
const getRecentBooks = catchAsync(async (req, res) => {
  const result = await bookService.getRecentBooks();
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Recent books retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const bookController = {
  createBook,
  getBooks,
  getSpecificBook,
  updateBook,
  deleteBook,
  getRecentBooks,
};
