// // Book Description from ../practice/index.js turning into a Library App

// Constructor Function
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  info = () => {
    return this.title + " by " + this.author + ", " + this.pages + " pages.";
  };
}

// Array storing the book records
const myLibrary = [new Book("Dune", "Frank Herbert", 320, false), new Book("The Martian", "Andy Weir", 220, true)];

//Book prototype to toggle status of isRead
Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

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
  const isRead = document.getElementById("read").checked;

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

    const readStatus = document.createElement("div");
    readStatus.setAttribute("class", "readStatus");
    readStatus.innerHTML = "Read Status ";

    const readToggle = document.createElement("button");
    readToggle.setAttribute("class", "statusbtn btn");
    readToggle.setAttribute("data-index", index);
    readToggle.innerHTML = book.isRead ? "Read" : "Not Read";

    const bookInfo = document.createElement("div");
    bookInfo.setAttribute("class", "bookInfo");
    bookInfo.textContent = book.info();

    bookCard.appendChild(bookInfo);
    bookCard.appendChild(deleteCard);
    readStatus.appendChild(readToggle);
    bookCard.appendChild(readStatus);
    displayArea.appendChild(bookCard);

    readToggle.addEventListener("click", (e) => {
      const bookIndex = e.target.dataset.index;
      const bookToToggle = myLibrary[bookIndex];
      bookToToggle.toggleReadStatus(); // Call the toggle method on the correct book instance
      displayLibrary(); // Refresh the display after toggling read status
    });

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

  const isReadCheckbox = document.getElementById("read");
  if (isReadCheckbox) {
    isReadCheckbox.checked = false;
  }
}
