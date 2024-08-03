// // Book Description from ../practice/index.js turning into a Library App

const myLibrary = [];
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
    return this.title + " by " + this.author + ", " + this.pages + ", " + result;
  };
  addBookToLibrary(this);
}
// Add to library
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// New button Functionality
document.getElementById("showForm").addEventListener("click", function () {
  var formContainer = document.getElementById("formContainer");

  if (formContainer.classList.contains("hidden")) {
    formContainer.classList.remove("hidden");
  } else {
    formContainer.classList.add("hidden");
  }
});

const Dune = new Book("Dune", "Frank Helbert", 320, false);
const Martian = new Book("The Martian", "Andy Something", 220, true);

function displayBooks() {
  myLibrary.forEach((element) => {
    console.log(element);
  });
}
