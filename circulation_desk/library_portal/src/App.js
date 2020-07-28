import React from 'react';
import './App.css';
import Book from './Book'

import fetchGraphQL from './fetchGraphQL';
const { useState, useEffect } = React;

function App() {
   // We'll load the name of a repository, initially setting it to null
   const [books, setBooks] = useState(null);

   // When the component mounts we'll fetch a repository name
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
     `).then(response => {
       console.log(response)
       // Avoid updating state if the component unmounted before the fetch completes
       if (!isMounted) {
         return;
       }
       const data = response.data;
       setBooks(data.books.edges);
     }).catch(error => {
       console.error(error);
     });},[])
  return (
    <div className="App">
      {books && books.map( book => <Book book={book.node} key={book.node.id}></Book>)}
    </div>
  );
}

export default App;
