import React, { Component } from "react";
import { observer } from "mobx-react";

import bookStore from "../stores/bookStore";

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
    bookStore.addBook(this.state, this.props.author);
    this.props.closeModal();
  }

  render() {
    return (
      <div className="mt-5">
        <form onSubmit={this.submitBook}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <select
              name="color"
              className="form-control"
              onChange={this.onTextChange}
            >
              <option value="white">White</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
              <option value="black">Black</option>
              <option value="grey">Grey</option>
              <option value="purple">Purple</option>
            </select>
          </div>
          <input type="submit" value="Add Book" />
        </form>
      </div>
    );
  }
}

export default observer(BookForm);
