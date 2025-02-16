import QueryBuilder from '../../builder/queryBuilder';
import { IBook } from './book.interface';
import Book from './book.model';

const createBook = async (payload: IBook): Promise<IBook> => {
  const result = await Book.create(payload);
  return result;
};

const getBook = async (query: Record<string, unknown>) => {
  const searchableFields = ['description', 'category', 'brand', 'name'];
  const BookQuery = new QueryBuilder(Book.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await BookQuery.modelQuery;
  const meta = await BookQuery.countTotal();
  // console.log(result,meta,"test")
  return {
    meta,
    result,
  };
};

const getSpecificBook = async (id: string) => {
  const result = await Book.findById(id);
  return result;
};

const updateBook = async (id: string, data: Partial<IBook>) => {
  const result = await Book.findByIdAndUpdate(id, data, { new: true });
  return result;
};
const deleteBook = async (id: string) => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};
const getRecentBooks = async () => {
  const result = await Book.find().sort({ createdAt: -1 }).limit(4);
  return result;
};

export const bookService = {
  createBook,
  getBook,
  getSpecificBook,
  updateBook,
  deleteBook,
  getRecentBooks,
};
