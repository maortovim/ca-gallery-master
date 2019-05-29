'use strict'


var gTrans = {
    mainTitle: {
        en: 'Books Shop',
        he: 'חנות ספרים'
    },
    createBookBtn: {
        en: 'Create new book',
        he: 'צור ספר חדש'
    },
    table_title: {
        en: 'Title',
        he: 'כותרת'
    },
    table_img: {
        en: 'Image',
        he: 'תמונה'
    },
    table_price: {
        en: 'Price',
        he: 'מחיר'
    },
    table_actions: {
        en: 'Actions',
        he: 'פעולות'
    },
    table_read: {
        en: 'Read',
        he: 'קרא'
    },
    table_update: {
        en: 'Update',
        he: 'עדכן'
    },
    table_delete: {
        en: 'Delete',
        he: 'מחק'
    },
    inputQuests_title: {
        en: 'What is the title of the book?',
        he: 'מה שם הספר?'
    },
    inputQuests_price: {
        en: 'What is the price of the book?',
        he: 'מה המחיר של הספר?'
    },
    inputQuests_newPrice: {
        en: 'What is the new Price of the book?',
        he: 'מה המחיר החדש של הספר?'
    },
    inputQuests_newImg: {
        en: 'Please copy image address here',
        he: 'נא העתק לכאן את כתובת התמונה'
    },
    modal_close: {
        en: 'close',
        he: 'סגור'
    },
    modal_bookTitle: {
        en: 'Book Title:',
        he: 'שם הספר:'
    }
}

var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.dataset.trans;
        var txt = getTrans(transKey);
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';
    var txt = keyTrans[gCurrLang];
    if (!txt) txt = keyTrans['en'];
    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}


function kmToMiles(km) {
    return km / 1.609;
}