const form = document.getElementById('form-space');

const formIsVisible = () => form.classList.contains('invisible');

function makeFormVisible() {
  form.classList.remove(formIsVisible ? 'invisible' : null);
}

const addButton = document.getElementById('add-btn');
addButton.addEventListener('click', makeFormVisible);
