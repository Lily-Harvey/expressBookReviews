const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Register a new user
public_users.post("/register", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    return res.status(400).json({message: "Username or password not provided"});
  }
  if (users.some(user => user.username === username)) {
    return res.status(400).json({message: "Username already exists"});
  } else {
    users.push({username: username, password: password});
    return res.status(201).json({message: "User created"});
  }
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  if(books[isbn]){
    return res.send(JSON.stringify(books[isbn]));
  }
  else{
    return res.status(404).json({message: "Book not found"});
  }});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let author = req.params.author;
  let book = {};
  let book_list = [];
  for(let i in books){
    book = books[i];
    if(book.author === author){
      book_list.push(book);
    }
  }
  if(book_list.length > 0){
    return res.send(JSON.stringify(book_list));
  }
  else{
    return res.status(404).json({message: "Author not found"});
  }});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let book = {};
  let book_list = [];
  for(let i in books){
    book = books[i];
    if(book.title === title){
      book_list.push(book);
    }
  }
  if(book_list.length > 0){
    return res.send(JSON.stringify(book_list));
  }
  else{
    return res.status(404).json({message: "Title not found"});
  }});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  if(books[isbn]){
    return res.send(JSON.stringify(books[isbn].reviews));
  }
  else{
    return res.status(404).json({message: "Book not found"});
  }});

module.exports.general = public_users;
