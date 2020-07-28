import React from "react";
import "./App.css";
import Book from "./Book";

import fetchGraphQL from "./fetchGraphQL";
const { useState, useEffect } = React;

function App() {
  const [books, setBooks] = useState([]);
  const [update,triggerUpdate] = useState(null);
  const [search, setSearch] = useState(null)
  const handleSubmit = async (evt) => {
triggerUpdate()
	};
  useEffect(() => {
    const catalogRecursion = async (cursor,compiledBooks=[])=>{
      let isMounted = true;
      await fetchGraphQL(`
           query {
            books${cursor?'('+'after: "'+cursor+'")': search?'(search:'+'"'+search+'")':""}{
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
            if (!isMounted) {
              return;
            }
            const data = response.data;
            compiledBooks = [...compiledBooks, ...data.books.edges]
            if (response.data.books.pageInfo.hasNextPage){
              catalogRecursion(response.data.books.pageInfo.endCursor,compiledBooks)
            }
    
            
            setBooks(compiledBooks);
          })
          .catch((error) => {
            console.error(error);
          })}
   
  catalogRecursion()}, [update]);
  return (
    <div className="App">
      <h1>Library Catalogue</h1>
      <input
      value={search} onChange={(e)=>{setSearch(e.target.value)}}
      ></input><button onClick={handleSubmit}>Search Catalogue</button>
      <br></br>
      <br></br>
      <button onClick={()=>triggerUpdate(Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5))}>Refresh Catalogue</button>
      
      {books &&
        books.map((book) => <Book update={()=>triggerUpdate("updated")} book={book.node} key={book.node.id}></Book>)}
    </div>
  );
}

export default App;
