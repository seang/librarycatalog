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
     `).then((response) => {
      console.log(response);
    });
  };
  render(props) {
    return (
      <div>
        <br></br>
        <div>
          Title: {this.props.book.title} | Author: {this.props.book.author} | Reserved: {String(this.props.book.reserved)} |  <button value={this.props.book.title} onClick={this.toggleReservation}>
          Toggle Reservation
        </button>
        </div>
        
       
      </div>
    );
  }
}

export default Book;
