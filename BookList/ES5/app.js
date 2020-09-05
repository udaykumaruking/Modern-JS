// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function (book) {
  //   console.log(book);
  const list = document.getElementById('book-list');
  // create tr element
  const row = document.createElement('tr');
  // Insert cols into rows
  row.innerHTML = `<td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X<a></td>
  `;
  list.appendChild(row);
  //console.log(row);
};
// Show alert
UI.prototype.showAlert = function (message, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
};
// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

// event listenr for adding
document.addEventListener('DOMContentLoaded', displayBooks);
document.getElementById('book-form').addEventListener('submit', function (e) {
  //   console.log('test');
  // Getting Form Values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;
  // Instantiating book constructor
  const book = new Book(title, author, isbn);
  //   console.log(book);
  // Instantiating UI constructor
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list

    ui.addBookToList(book);
    addBook();
    ui.showAlert('Book Added Successfully', 'success');

    // clear fields
    ui.clearFields();
  }

  // Add book to list

  //   ui.addBookToList(book);

  //   // clear fields
  //   ui.clearFields();
  //   console.log(ui);
  //   console.log(title, author, isbn);
  e.preventDefault();
});

// event listenr for deletion
document.getElementById('book-list').addEventListener('click', function (e) {
  //   console.log(123);
  const ui = new UI();
  ui.deleteBook(e.target);
  removeBook();
  // Show message
  ui.showAlert('Book Removed!', 'removed');
  e.preventDefault();
});

function getBooks() {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
}
function displayBooks() {
  const books = getBooks();
  books.forEach(function (book) {
    const ui = new UI();
    // Add book to UI
    ui.addBookToList(book);
  });
}
function addBook(book) {
  const books = getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}
function removeBook(isbn) {
  const books = getBooks();
  books.forEach(function (book, index) {
    if (book.isbn === isbn) {
      books.splice(index, 1);
    }
  });
  localStorage.setItem('books', JSON.stringify(books));
}
