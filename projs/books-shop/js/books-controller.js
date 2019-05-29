'use strict'

$(document).ready(init);

function init() {
    createBooks();
    renderBooks();
    doTrans();
}

function renderBooks() {
    var books = getBooks();
    var strHTML = '';
    ///////////////
    var currency = '$';
    /////////////
    if (!books || books.length === 0) return;
    books.forEach(function (book, idx) {
        console.log(books);
        
        strHTML += `<tr>
            <th scope="row">${++idx}</th>
                <td>${book.title}</td>
                <td><img onclick="onBookDetails('${book.id}')" class="book-img" src = ${book.imgUrl} /></td>
                <td>${book.price}${currency}</td>
                <td>${renderActions(book.id)}</td>
            </tr>`
    })
    $('tbody').html(strHTML);
}

function onDeleteBook(bookId) {
    console.log('Delete');
    deleteBook(bookId);
    renderBooks();
    doTrans();
}

function onReadAndUpdateBook(bookId) {
    console.log('Update');
    onUpdateImg(bookId);
    var newPrice = +prompt(getTrans('inputQuests_newPrice'));
    if (!newPrice) return;
    updateBook(bookId, newPrice);
    renderBooks();
}

function readAndAddNewBook() {
    var title = prompt(getTrans('inputQuests_title'));
    if (!title) return;
    var price = +prompt(getTrans('inputQuests_price'));
    if (!price) {
        alert('Price is required!');
        return;
    }
    addBook(title, price);
    renderBooks();
    doTrans();
}

function renderActions(id) {
    var strHTML = `
        <button class="btn-success" onclick="onBookDetails('${id}')"><span data-trans="table_read">Read</span></button>
        <button class="btn-warning update" onclick="onReadAndUpdateBook('${id}')"><span data-trans="table_update">Update</span></button>
        <button class="btn-danger delete" onclick="onDeleteBook('${id}')"><span data-trans="table_delete">Delete</span></button>
    `
    return strHTML;
}

function renderPortfolioGrid(bookId) {
    var book = findBook(bookId);
    var strImg = `<img class="modal-img" src = ${book.imgUrl} />`;
    var strTitle = `<span data-trans="modal_bookTitle">${getTrans('modal_bookTitle')} ${book.title}</span>`
    $('.modal-title').html(strTitle);
    $('.modal-body').html(strImg);
}

function openModal() {
    $('.modal').show();
}

function onBookDetails(bookId) {
    renderPortfolioGrid(bookId);
    openModal();
}

function onCloseModal() {
    $('.modal').hide();
}

function onUpdateImg(bookId) {
    var imgUrl = prompt(getTrans('inputQuests_newImg'));
    if (!imgUrl) return;
    updateImgUrl(bookId, imgUrl);
    renderBooks();
    doTrans();
}

function onSetLang(lang) {

    setLang(lang);
    doTrans();
    changeDirection(lang);
}

function changeDirection(lang) {
    if (lang === 'he') {
        $('select').addClass('float-right');
        $('.table-container').addClass('rtl');
        $('.btn-lg').addClass('float-right');
        $('.modal').addClass('rtl');
        $('.close').addClass('float-left');
    }
    else {
        $('select').removeClass('float-right');
        $('.table-container').removeClass('rtl');
        $('.btn-lg').removeClass('float-right');
        $('.modal').removeClass('rtl');
        $('.close').removeClass('float-left');
    }
}