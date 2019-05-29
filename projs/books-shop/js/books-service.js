'use strict'

var gBooks;
var KEY = 'books';

function createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || books.length === 0) {
        books = [
            createBook('This is Going to Hurt', 34),
            createBook('Educated', 45),
            createBook('An American Marriage', 38),
        ]
    }
    gBooks = books;
    saveBooks();
}

function createBook(title, price) {
    return {
        id: makeId(),
        title: title,
        price: price,
        imgUrl: "http://www.manoharbooks.com/img/145.jpg",
    }
}

function deleteBook(bookId) {
    var bookIdx = getBookIdxById(bookId);
    gBooks.splice(bookIdx, 1);
    saveBooks();
}

function getBookIdxById(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    return bookIdx;
}

function addBook(title, price) {
    gBooks.unshift(createBook(title, price));
    saveBooks();
}

function updateBook(bookId, newPrice) {
    var book = findBook(bookId);
    book.price = newPrice;
    saveBooks();
}

function saveBooks() {
    saveToStorage(KEY, gBooks);
}

function getBooks() {
    return loadFromStorage(KEY);
}



function findBook(bookId) {
    var bookIdx = getBookIdxById(bookId);
    var book = gBooks[bookIdx];
    return book;
}


function updateImgUrl(bookId, imgUrl) {
    var bookIdx = getBookIdxById(bookId);
    gBooks[bookIdx].imgUrl = imgUrl;
    saveBooks();
}

