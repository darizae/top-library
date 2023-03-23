// Making form visible

const form = document.getElementById('form-space');

const formIsVisible = () => form.classList.contains('invisible');

function makeFormVisible() {
  form.classList.remove(formIsVisible ? 'invisible' : null);
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
