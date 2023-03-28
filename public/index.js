/* eslint-disable no-use-before-define */
/* eslint-disable radix */
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
    formElements[3].checked,
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

const displayDiv = document.getElementById('display');

function generateBook(title, index, info) {
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

  return bookDiv;
}

function generateReadToggle(index, read) {
  const readStatus = document.createElement('input');
  readStatus.classList.add('toggle-read');
  readStatus.setAttribute('type', 'checkbox');
  readStatus.setAttribute('data-index', index);
  readStatus.checked = read;

  readStatus.addEventListener('click', () => {
    library[index].read = readStatus.checked;

    const bookDiv = document.querySelector(`div.book[data-index="${index}"]`);
    bookDiv.setAttribute('title', library[index].info());
  });

  const readLabel = document.createElement('label');
  readLabel.classList.add('read-label');
  readLabel.textContent = 'Read';
  readLabel.setAttribute('for', 'toggle-read');

  return [readStatus, readLabel];
}

function addBookToDisplay(title, index, read, info) {
  const bookCell = document.createElement('div');
  bookCell.classList.add('book-cell');

  const toggle = generateReadToggle(index, read);

  bookCell.appendChild(generateBook(title, index, info));
  bookCell.appendChild(toggle[0]);
  bookCell.appendChild(toggle[1]);

  displayDiv.appendChild(bookCell);
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
  addBookToDisplay(newBook.title, library.indexOf(newBook), newBook.read, newBook.info());

  removeForm();
}

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', addBookToLibrary);

const cancelButton = document.getElementById('cancel-button');
cancelButton.addEventListener('click', removeForm);

const removalButton = document.createElement('button');
removalButton.textContent = 'Remove';
removalButton.classList.add('header-button');
removalButton.setAttribute('id', 'removal');
// eslint-disable-next-line no-use-before-define
removalButton.addEventListener('click', removeBook);
const headerDiv = document.getElementById('header');

function toggleRemovalButton() {
  if (!headerDiv.contains(removalButton)) {
    headerDiv.appendChild(removalButton);
  } else {
    headerDiv.removeChild(removalButton);
  }
}

function removeBook() {
  const selectedBookDivs = document.querySelectorAll('.selected');

  if (selectedBookDivs.length === 0) {
    alert('No books selected');
    return;
  }

  selectedBookDivs.forEach((bookDiv) => {
    const index = parseInt(bookDiv.getAttribute('data-index'));
    library.splice(index, 1);
    displayDiv.removeChild(bookDiv);
  });

  toggleRemoveName();
  toggleRemovalButton();
}

function toggleSelectivity(bookDiv) {
  if (bookDiv.onclick === null) {
    bookDiv.addEventListener('click', () => bookDiv.classList.toggle('selected'));
  } else {
    bookDiv.removeEventListener('click', () => bookDiv.classList.toggle('selected'));
  }
}

function toggleBookSelection() {
  const bookDivs = document.querySelectorAll('.book');
  bookDivs.forEach((book) => {
    book.classList.remove('selected');
    toggleSelectivity(book);
  });
}

const removeButton = document.getElementById('remove-btn');

function toggleRemoveName() {
  removeButton.textContent = (!headerDiv.contains(removalButton))
    ? 'Select the books you want to remove'
    : 'Remove Book';
}

removeButton.addEventListener('click', () => {
  if (library.length === 0) {
    alert('Library is empty');
    return;
  }

  toggleRemoveName();
  toggleBookSelection();
  toggleRemovalButton();
});
