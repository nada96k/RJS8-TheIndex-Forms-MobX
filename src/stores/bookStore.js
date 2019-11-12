import { decorate, observable, computed } from "mobx";
import axios from "axios";

// const instance = axios.create({
//   baseURL: "https://the-index-api.herokuapp.com/api/"
// });

class BookStore {
  books = [];

  query = "";

  loading = true;

  fetchBooks = async () => {
    try {
      const res = await axios.get(
        "https://the-index-api.herokuapp.com/api/books/"
      );
      const books = res.data;
      this.books = books;
      this.loading = false;
    } catch (err) {}
  };

  get filteredBooks() {
    return this.books.filter(book => {
      return book.title.toLowerCase().includes(this.query.toLowerCase());
    });
  }

  getBookById = id => this.books.find(book => +book.id === +id);

  getBooksByColor = color =>
    this.filteredBooks.filter(book => book.color === color);

  addBook = async userData => {
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/api/books/",
        userData
      );
      const newBook = res.data;
      this.books.push(newBook);
      console.log("responce", newBook);
    } catch (err) {
      console.log(err.response);
    }
  };
}

decorate(BookStore, {
  books: observable,
  query: observable,
  loading: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
