import QueryBuilder from '../../builder/queryBuilder';
import { IBook } from './book.interface';
import Book from './book.model';

// create this service for create a bike
const createBook = async (payload: IBook): Promise<IBook> => {
  const result = await Book.create(payload);
  return result;
};

// create this service for get all book
const getBook = async (query: Record<string, unknown>) => {
  const searchableFields = [
    'model',
    'description',
    'category',
    'brand',
    'name',
  ];
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

// create this service for get a Specific  book
const getSpecificBook = async (id: string) => {
  const result = await Book.findById(id);
  return result;
};

// create this service for update a book
const updateBook = async (id: string, data: Partial<IBook>) => {
  // console.log(data,"update data")
  const result = await Book.findByIdAndUpdate(id, data, { new: true });
  return result;
};

// create this service for delete a book use a id
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
