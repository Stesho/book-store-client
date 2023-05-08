import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import Book, { BookCreateData } from '../core/types/book';
import Author from '../core/types/author';
import ConfirmationStore from './confirmationStore';

class BookStore {
  private books: Book[] = [];

  constructor(private confirmationStore: ConfirmationStore) {
    makeAutoObservable(this);
  }

  async fetchBooks(): Promise<void> {
    const fetchedBooks = await api.fetchBooks();

    if (fetchedBooks !== null) {
      this.books = fetchedBooks;
    }
  }

  async fetchBookById(id: number): Promise<Book | null> {
    return await api.fetchBookById(id);
  }

  async createBook(book: BookCreateData): Promise<void> {
    const response = await api.createBook(book);

    // if (response !== null) {
    //   this.books = [...this.books, response];
    // }
  }

  async deleteBookById(id: number): Promise<void> {
    const response = await api.deleteBookById(id);

    if (response !== null) {
      this.books = this.books.filter((book) => book.id !== id);
    }
  }

  deleteBook(book: Book): void {
    this.confirmationStore.show(
      'Delete this book?',
      book.name,
      async () => await this.deleteBookById(book.id),
    );
  }
  async updateBook(book: Book): Promise<Book | null> {
    return await api.updateBook(book);
  }

  getBooks() {
    return this.books;
  }
}

export default BookStore;
