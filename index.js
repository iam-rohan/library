// // Book Description from ../practice/index.js turning into a Library App

const myLibrary = [new Book("Dune", "Frank Herbert", 320, false), new Book("The Martian", "Andy Weir", 220, true)];

// Constructor FUnction
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  let result = "";
  if (isRead == true) {
    result = "already read.";
  } else {
    result = "not read yet.";
  }
  this.info = () => {
    return this.title + " by " + this.author + ", " + this.pages + " pages" + ", " + result;
  };
}
// Add to library
function addBookToLibrary(book) {
  myLibrary.push(book);
  displayLibrary();
}
const dialog = document.querySelector("#dialog");
const submitBtn = document.querySelector("#submitBtn");
const cancelBtn = document.querySelector("#cancelBtn");

// New entry button Functionality
document.getElementById("showForm").addEventListener("click", function () {
  var formContainer = document.getElementById("formContainer");
  formContainer.classList.remove("hidden");
  dialog.showModal();

  clearForm();
});

//Cancel button functionality
cancelBtn.addEventListener("click", (e) => {
  dialog.close();
  clearForm();
});

//Submit button functionality
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const author = document.getElementById("author").value.trim();
  const title = document.getElementById("title").value.trim();
  const pages = document.getElementById("pages").value.trim();
  const isRead = document.querySelector('input[name="isRead"]:checked').value === "Read";

  //Creating a new book entry in the library
  const newBook = new Book(title, author, Number(pages), isRead);
  addBookToLibrary(newBook);
  dialog.close();
});

function displayLibrary() {
  const displayArea = document.getElementById("displayArea");
  displayArea.innerHTML = "";

  // Loop through the library array to display the book objects
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book-card");

    const deleteCard = document.createElement("button");
    deleteCard.setAttribute("class", "deleteCardBtn btn");
    deleteCard.setAttribute("data-index", index);
    deleteCard.innerHTML = "X";

    const bookInfo = document.createElement("div");
    bookInfo.textContent = book.info();

    bookCard.appendChild(bookInfo);
    bookCard.appendChild(deleteCard);
    displayArea.appendChild(bookCard);

    deleteCard.addEventListener("click", (e) => {
      const bookIndex = e.target.dataset.index;

      deleteRecord(bookIndex);
    });
  });
}
displayLibrary();

// Function to delete a book card and it's entry from the library
function deleteRecord(bookIndex) {
  myLibrary.splice(bookIndex, 1);
  displayLibrary();
}

// Function to clear form fields
function clearForm() {
  document.getElementById("author").value = "";
  document.getElementById("title").value = "";
  document.getElementById("pages").value = "";

  const isReadRadio = document.querySelector('input[name="isRead"]:checked');
  if (isReadRadio) {
    isReadRadio.checked = false;
  }
}
