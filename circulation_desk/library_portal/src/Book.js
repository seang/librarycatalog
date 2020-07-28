import React, { Component } from "react";
import fetchGraphQL from "./fetchGraphQL";

class Book extends Component {

  toggleReservation = (event) => {
    fetchGraphQL(`
    mutation {
      updateBook(bookTitle: "${event.target.value}"){
        book {
          id
          author
          reserved
          title
        }
      }
    }
     `)
      .then((response) => {
        console.log(response)})
  }
  render(props) {
    return (
      <div>
        <div>
          {this.props.book.title} {this.props.book.author}
        </div>
        <div>Reserved: {String(this.props.book.reserved)}</div>
        <div>ID: {this.props.book.id}</div>
        <button value={this.props.book.title}onClick={this.toggleReservation}>Toggle Reservation</button>
      </div>
    );
  }
}

export default Book;
