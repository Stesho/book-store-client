import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import Author from '../core/types/author';

class AuthorStore {
  private authors: Author[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAuthors(): Promise<void> {
    const fetchedAuthors = await api.fetchAuthors();

    if (fetchedAuthors !== null) {
      this.authors = fetchedAuthors;
    }
  }

  async fetchAuthorById(id: number): Promise<Author | null> {
    return await api.fetchAuthorById(id);
  }

  async updateAuthor(author: Author): Promise<Author | null> {
    return await api.updateAuthor(author);
  }

  async deleteAuthor(id: number): Promise<void | null> {
    const response = await api.deleteAuthorById(id);

    if (response !== null) {
      this.authors = this.authors.filter((author) => author.id !== id);
    }
  }

  getAuthors() {
    return this.authors;
  }
}

export default AuthorStore;
