import React, { Component } from "react";

class Book extends Component {
  render(props) {
    return (
      <div>
        <div>
          {this.props.book.title} {this.props.book.author}
        </div>
        <div>Reserved: {String(this.props.book.reserved)}</div>
        <div>ID: {this.props.book.id}</div>
        <button>Toggle Reservation</button>
      </div>
    );
  }
}

export default Book;
