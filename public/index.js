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

function removeForm() {
  form.reset();
  makeFormInvisible();
}

function areEqualBooks(book1, book2) {
  if (book1.title === book2.title
      && book1.author === book2.author
      && book1.pages === book2.pages) {
    return true;
  }
  return false;
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

function generateRandomColor() {
  const baseColor = [37, 150, 190]; // RGB values for the base color
  const maxDelta = 30; // Maximum difference for each RGB value

  // Generate a random delta for each RGB value
  const deltaR = Math.floor(Math.random() * maxDelta) * (Math.random() < 0.5 ? -1 : 1);
  const deltaG = Math.floor(Math.random() * maxDelta) * (Math.random() < 0.5 ? -1 : 1);
  const deltaB = Math.floor(Math.random() * maxDelta) * (Math.random() < 0.5 ? -1 : 1);

  // Calculate the new RGB values based on the base color and the deltas
  const r = Math.max(0, Math.min(255, baseColor[0] + deltaR));
  const g = Math.max(0, Math.min(255, baseColor[1] + deltaG));
  const b = Math.max(0, Math.min(255, baseColor[2] + deltaB));

  return `rgb(${r}, ${g}, ${b})`;
}

function addBookToDisplay(title, index, info) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book');

  bookDiv.style.backgroundColor = generateRandomColor();
  bookDiv.setAttribute('title', info);
  bookDiv.setAttribute('data-index', index);

  const leftSideDiv = document.createElement('div');
  leftSideDiv.classList.add('left-side');
  bookDiv.appendChild(leftSideDiv);

  const bookTitleDiv = document.createElement('div');
  bookTitleDiv.classList.add('book-title');
  bookTitleDiv.textContent = title;
  bookDiv.appendChild(bookTitleDiv);

  const displayDiv = document.getElementById('display');
  displayDiv.appendChild(bookDiv);
}

function addBookToLibrary(event) {
  event.preventDefault();

  const requiredInputs = form.querySelectorAll('input[required]');

  // eslint-disable-next-line no-restricted-syntax
  for (const input of requiredInputs) {
    if (!input.value) {
      event.preventDefault();
      alert('Please fill out all required fields.');
      return;
    }
  }

  const newBookInfo = getFormValues();

  const newBook = new Book(newBookInfo[0], newBookInfo[1], newBookInfo[2], newBookInfo[3]);

  if (bookIsAlreadyInLibrary(newBook)) {
    alert('Book is already in library');
    return;
  }

  library.push(newBook);
  addBookToDisplay(newBook.title, library.indexOf(newBook), newBook.info());

  removeForm();
}

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', addBookToLibrary);

const cancelButton = document.getElementById('cancel-button');
cancelButton.addEventListener('click', removeForm);
