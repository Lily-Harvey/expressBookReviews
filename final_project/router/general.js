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

  const get_books = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify({books}, null, 4)));
  });

  get_books.then(() => console.log("Promise for Task 10 resolved"));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

  const get_books_isbn = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
        if (req.params.isbn <= 10) {
        resolve(res.send(books[isbn]));
    }
        else {
            reject(res.send('ISBN not found'));
        }
    });
    get_books_isbn.then(function(){
            console.log("Promise for Task 11 is resolved");
   }).catch(function () { 
                console.log('ISBN not found');
  });
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

  const get_books_author = new Promise((resolve, reject) => {
    let booksbyauthor = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["author"] === req.params.author) {
        booksbyauthor.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
      resolve(res.send(JSON.stringify({booksbyauthor}, null, 4)));
      }
    });
    reject(res.send("The mentioned author does not exist "))     
    });

    get_books_author.then(function(){
            console.log("Promise is resolved");
   }).catch(function () { 
                console.log('The mentioned author does not exist');
  });
});

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

  const get_books_title = new Promise((resolve, reject) => {
    let booksbytitle = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["title"] === req.params.title) {
        booksbytitle.push({"isbn":isbn,
                            "author":books[isbn]["author"],
                            "reviews":books[isbn]["reviews"]});
      resolve(res.send(JSON.stringify({booksbytitle}, null, 4)));
      }
    });
    reject(res.send("The mentioned title does not exist "))     
    });
    get_books_title.then(function(){
            console.log("Promise is resolved");
   }).catch(function () { 
                console.log('The mentioned title does not exist');
  });
});

module.exports.general = public_users;
