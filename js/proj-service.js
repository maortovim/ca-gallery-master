'use strict'

var gProjs = createProjs();
var gLeads = [];

function createProj(id, name, title, imgUrl, url, publishedAt, description, labels) {
    return {
        id: id,
        name: name,
        title: title,
        imgUrl: imgUrl,
        url: url,
        publishedAt: publishedAt,
        description: description,
        labels: labels
    }
}

function createProjs() {
    var mineSweeperDescription = `Minesweeper is a single-player puzzle video game.
     The objective of the game is to clear a rectangular board containing hidden
      "mines" or bombs without detonating any of them, with help from
       clues about the number of neighboring mines in each field.`;
    var booksShopDescription = 'Manage your own book shop';
    var safeContentDescription = 'We pay careful attention to the protection of our applications and their content so you don’t have to be worried'
    return [
        createProj(1, 'mine-sweeper', 'Mine Sweeper','img/portfolio/mine-sweeper.png','projs/mine-sweeper/index.html', '16/05/2019', mineSweeperDescription, [" Board games ", " Old games"]),
        createProj(2, 'books-shop', 'Books Shop', 'img/portfolio/books-shop.png', 'projs/books-shop/index.html', '27/05/2019',booksShopDescription, [" Shop ", " Books"]),
        createProj(3, 'safe-content', 'Safe Content', 'img/portfolio/safe-content.png', 'projs/safe-content/index.html', '23/05/2019',safeContentDescription, [" Secure information ", " Log"]),
        // createProj(id, name, title, url, publishedAt, labels)
    ]
}



function getProjs() {
    return gProjs;
}

function findProj(projId) {
    var projIdx = projId - 1;
    var proj = gProjs[projIdx];
    return proj;
}

function createLead(name, email, subject, message) {
    var lead = {
        name: name,
        email: email,
        subject: subject,
        message: message
    }
    gLeads.unshift(lead);
    return lead;
}