const library = [];
const libraryContainer = document.querySelector("#libraryContainer");
const openDialogBtn = document.querySelector("#openDialogBtn");
const bookDialog = document.querySelector("#bookDialog");
const bookForm = document.querySelector("#bookForm");
const submitBookBtn = document.querySelector("#submitBookBtn");

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  library.push(newBook);
  renderLibrary();
}

function removeBook(id) {
  const index = library.findIndex(book => book.id === id);
  if (index !== -1) {
    library.splice(index, 1);
    renderLibrary();
  }
}

function toggleReadStatus(id) {
  const book = library.find(book => book.id === id);
  if (book) {
    book.read = book.read === "Read" ? "Not Read" : "Read";
    renderLibrary();
  }
}

function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("bookCard");
  card.dataset.id = book.id;

  const title = document.createElement("p");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.innerHTML = `Written by:<br>${book.author}`;

  const pages = document.createElement("p");
  pages.textContent = `${book.pages} pages`;

  const readBadge = document.createElement("p");
  readBadge.classList.add("readStatus");
  readBadge.textContent = book.read;

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("removeBtn");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => removeBook(book.id));

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Toggle Read";
  toggleBtn.addEventListener("click", () => toggleReadStatus(book.id));

  card.append(title, author, pages, readBadge, removeBtn, toggleBtn);
  libraryContainer.appendChild(card);
}

function renderLibrary() {
  libraryContainer.innerHTML = "";
  library.forEach(createBookCard);
}

openDialogBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

submitBookBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const title = bookForm.title.value;
  const author = bookForm.author.value;
  const pages = bookForm.pages.value;
  const read = bookForm.read.checked ? "Read" : "Not Read";

  addBookToLibrary(title, author, pages, read);
  bookDialog.close();
  bookForm.reset();
});
