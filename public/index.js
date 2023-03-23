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

function addBookToLibrary(event) {
  event.preventDefault();
  const newBookInfo = getFormValues();

  const newBook = new Book(newBookInfo[0], newBookInfo[1], newBookInfo[2], newBookInfo[3]);

  // bookAlreadyInLibrary()

  library.push(newBook);

  form.reset();
  makeFormInvisible();
}

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', addBookToLibrary);
