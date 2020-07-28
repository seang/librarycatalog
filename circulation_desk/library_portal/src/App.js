import React from 'react';
import logo from './logo.svg';
import './App.css';
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
       setBooks(data.books);
     }).catch(error => {
       console.error(error);
     });},[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
