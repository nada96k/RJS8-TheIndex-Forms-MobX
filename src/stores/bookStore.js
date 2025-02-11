import { decorate, observable, computed } from "mobx";
import { instance } from "./instance";

function errToArray(err) {
  return Object.keys(err).map(key => `${key}: ${err[key]}`);
}

class BookStore {
  books = [];

  query = "";

  loading = true;

  errors = null;

  fetchBooks = async () => {
    try {
      const res = await instance.get("/api/books/");
      const books = res.data;
      this.books = books;
      this.loading = false;
    } catch (err) {}
  };

  addBook = async (newBook, author) => {
    newBook.authors = [author.id];
    try {
      const res = await instance.post("/api/books/", newBook);
      const book = res.data;
      this.books.unshift(book);
      author.books.push(book.id);
      this.errors = null;
      console.log("BOOK", book);
    } catch (err) {
      this.errors = errToArray(err.response.data);
    }
  };

  get filteredBooks() {
    return this.books.filter(book => {
      return book.title.toLowerCase().includes(this.query.toLowerCase());
    });
  }

  getBookById = id => this.books.find(book => +book.id === +id);

  getBooksByColor = color =>
    this.filteredBooks.filter(book => book.color === color);
}

decorate(BookStore, {
  books: observable,
  query: observable,
  loading: observable,
  errors: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
