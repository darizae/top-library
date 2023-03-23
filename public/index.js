/* eslint-disable no-alert */
// Making form visible

const formSpace = document.getElementById('form-space');
const form = document.getElementById('form');

const formIsVisible = () => formSpace.classList.contains('invisible');

function makeFormVisible() {
  formSpace.classList.remove(formIsVisible ? 'invisible' : null);
}

function makeFormInvisible() {
  formSpace.classList.add(formIsVisible ? 'invisible' : null);
}

const addButton = document.getElementById('add-btn');
addButton.addEventListener('click', makeFormVisible);

// Book Object

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function info() {
  const readingStatus = this.read ? 'already read' : 'not read yet';
  return `${this.title} by ${this.author}. ${this.pages} pages, ${readingStatus}.`;
};

// Adding a new book

const library = [];

const formElements = [
  document.getElementById('title'),
  document.getElementById('author'),
  document.getElementById('pages'),
  document.getElementById('read'),
];

function getFormValues() {
  return [
    formElements[0].value,
    formElements[1].value,
    formElements[2].value,
    formElements[3].value,
  ];
}

function areEqualBooks(book1, book2) {
  const keys1 = Object.keys(book1);
  const keys2 = Object.keys(book2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys1) {
    if (keys1[key] !== keys2[key]) {
      return false;
    }
  }

  return true;
}

function bookIsAlreadyInLibrary(newBook) {
  // eslint-disable-next-line no-restricted-syntax
  for (const book of library) {
    if (areEqualBooks(book, newBook)) {
      return true;
    }
  }

  return false;
}

function addBookToLibrary(event) {
  event.preventDefault();
  const newBookInfo = getFormValues();

  const newBook = new Book(newBookInfo[0], newBookInfo[1], newBookInfo[2], newBookInfo[3]);

  if (bookIsAlreadyInLibrary(newBook)) {
    alert('Book is already in library');
    return;
  }

  library.push(newBook);

  form.reset();
  makeFormInvisible();
}

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', addBookToLibrary);
