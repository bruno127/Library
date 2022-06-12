let myLibrary = [];

// const used for the submit process, no event handlers attached
const three = document.querySelector('.three')
const nameInput = document.querySelector('#name');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const statusInput = document.querySelector('#status');
const submitInput = document.querySelector('#submit');
const newButton = document.querySelector('#button')

// const for elements that have event handlers attached

const formInput = document.querySelector('form');
const tableInput = document.querySelector('table');
const tableInput2 = document.querySelector('table');
const deleteAllButton = document.querySelector('button');

//submit button handler

formInput.addEventListener('submit', () => {
  onSubmit();
  clearForm();
});

// delete row button handler

tableInput.addEventListener('click', deleteRow);

// delete all button handler

deleteAllButton.addEventListener('click', deleteAll);

// toggle status of 'Read' or 'Unread' button handler

tableInput2.addEventListener('click', toggleStatus);

// constructor allows us to easily create "sub objects" = books within the larger myLibrary object, and enjoy of the benefits of heredity
class Book {
  constructor(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}
// pushes the values submitted onto a new object within myLibrary, uses the Book constructor
function onSubmit() {
  const book = new Book(
    nameInput.value,
    authorInput.value,
    pagesInput.value,
    statusInput.value
  );
  myLibrary.push(book);
  updateTable();
}

// clears the form when onsubmit is clicked, called by an event handler

function clearForm() {
  nameInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
}

// Every time you change myLibrary object this function is called immediatly afterwards
// it reprints the whole table with the new myLibrary values, could have been written shorter but to lazy to optimize it now.

function updateTable() {
  const tBody = document.querySelector('tbody');
  tBody.textContent = '';
  for (let i = 0; i < myLibrary.length; i++) {
    const newRow = document.createElement('tr');
    tBody.appendChild(newRow);

    const newNumber = document.createElement('td');
    newNumber.textContent = i + 1;
    newRow.appendChild(newNumber);

    const newTitle = document.createElement('td');
    newTitle.textContent = myLibrary[i].name;
    newRow.appendChild(newTitle);

    const newAuthor = document.createElement('td');
    newAuthor.textContent = myLibrary[i].author;
    newRow.appendChild(newAuthor);

    const newPages = document.createElement('td');
    newPages.textContent = myLibrary[i].pages;
    newRow.appendChild(newPages);

    const newStatus = document.createElement('td');
    newStatus.innerHTML = `<button class = '${myLibrary[i].status}'>${myLibrary[i].status}</button>`;
    newRow.appendChild(newStatus);

    const deleteButton = document.createElement('td');
    deleteButton.innerHTML = `<button class = 'delete' >Delete</button>`;
    newRow.appendChild(deleteButton);
  }
}
// deletes a book from the myLibrary object and adjusts the indexes on the left of the table
function deleteRow(event) {
  if (!event.target.classList.contains('delete')) {
    return;
  }
  const button = event.target;
  const bookIndex =
    Number(button.parentNode.parentNode.childNodes[0].innerHTML) - 1;
  button.closest('tr').remove();
  myLibrary.splice(bookIndex, 1);
  updateTable();
}
// called by the delete All button, self explanatory

function deleteAll(event) {
  myLibrary = [];
  updateTable();
}

// Works similarly to the delete Row function, uses the index to tell what book we are dealing with ( if you have multiple how do you know which one to delete) and updates the status of said book, then calls updateTable so we can show the change.

function toggleStatus(event) {
  if (event.target.classList.contains('Read')) {
    const button = event.target;
    const bookIndex =
    Number(button.parentNode.parentNode.childNodes[0].innerHTML) - 1;
    myLibrary[bookIndex].status = 'Unread';
    updateTable();
  } else if (event.target.classList.contains('Unread')) {
    const button = event.target;
    const bookIndex =
      Number(button.parentNode.parentNode.childNodes[0].innerHTML) - 1;
    myLibrary[bookIndex].status = 'Read';
    updateTable();
  }
}

//Big thanks to Pico CSS
