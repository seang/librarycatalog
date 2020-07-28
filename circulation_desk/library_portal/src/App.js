import React from "react";
import "./App.css";
import Book from "./Book";

import fetchGraphQL from "./fetchGraphQL";
const { useState, useEffect } = React;

function App() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchGraphQL(`
       query {
        books(first:3){
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
               id
          title
          author
          quantity
          reserved
            }
          }
        }
       }
     `)
      .then((response) => {
        console.log(response);
        if (!isMounted) {
          return;
        }
        const data = response.data;
        setBooks(data.books.edges);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="App">
      {books &&
        books.map((book) => <Book book={book.node} key={book.node.id}></Book>)}
    </div>
  );
}

export default App;
