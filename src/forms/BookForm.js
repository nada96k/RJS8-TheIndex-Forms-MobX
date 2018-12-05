import React, { Component } from "react";

import bookStore from "../stores/BookStore";
import { observer } from "mobx-react";

class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      color: ""
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.submitBook = this.submitBook.bind(this);
  }

  onTextChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitBook(event) {
    event.preventDefault();
    bookStore.addBook(this.state, this.props.authorID);
  }

  render() {
    return (
      <form onSubmit={this.submitBook}>
        <input
          type="text"
          name="title"
          placeholder="Book Name"
          onChange={this.onTextChange}
        />
        <select name="color" onChange={this.onTextChange}>
          <option value="">Color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="grey">Grey</option>
          <option value="purple">Purple</option>
        </select>
        <input type="submit" value="Add Book" />
      </form>
    );
  }
}

export default observer(BookForm);
