const myLibrary = [];

function Book(title, author, pages, read) {
    if(!new.target) {
        throw Error("Need new keyword.");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        if(read) {
            return `${title} by ${author}, ${pages} pages, already read.`;
        }else {
            return `${title} by ${author}, ${pages} pages, not read yet.`;
        }
    }
}

function addBookToLibrary (title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}