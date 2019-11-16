import React, { Component } from "react";
import { observer } from "mobx-react";

import bookStore from "../stores/bookStore";

class BookForm extends Component {
  state = {
    title: "",
    color: ""
  };

  submitBook = event => {
    event.preventDefault();
    bookStore.addBook(this.state, this.props.author);
    if (!bookStore.errors) {
      this.props.onCloseModal();
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {bookStore.errors && (
            <div className="alert alert-danger" role="alert">
              {bookStore.errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <select
              className="form-control"
              name="color"
              onChange={this.handleChange}
            >
              <option value="white">White</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="yellow">Yellow</option>
            </select>
          </div>

          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default observer(BookForm);
