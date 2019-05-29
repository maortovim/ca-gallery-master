'use strict'
var MINE = '💥';
var FLAG = '🚩';
var SAD = '😔';
var DEAD = '😵';
var HAPPY = '🙂';
var VICTORY = '😎';
var HEART = '❤️';

var gBoard;
var gLevel = {
    SIZE: 12,
    MINES: 30,
    Life: 3
};

var gGame = {
    isOn: false,
    isLocked: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lives: gLevel.Life
};

var gtimerInterval;

function buildBoard(size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board[i] = [i];
        for (var j = 0; j < size; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
            board[i][j] = cell;
        }
    }
    return board;
}

function initGame() {
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard);
    gGame.isOn = false;
    renderMenu();
}


function cellClicked(elCell, event, i, j) {
    if (gGame.isLocked) return;
    if (gBoard[i][j].isShown) return;
    if (!gGame.isOn) {
        gtimerInterval = setInterval(setTimer, 1000);
        SetRandomMines(gLevel.MINES, i, j, gBoard);
        updateMineNegs(gBoard);
        gGame.isOn = true;
    }
    if (event.button === 0) {
        gBoard[i][j].isShown = true;
        exsposeCells(gBoard, i, j);
    }
    else if (event.button === 2) {
        window.oncontextmenu = (e) => {
            e.preventDefault();
        }
        cellMarked(elCell, i,j);
    }
    renderBoard(gBoard);
    checkVictory();
}


function SetRandomMines(mines, i, j, board) {
    var count = 0;
    while (count < mines) {
        var randomRow = getRandomInt(0, board.length);
        var randomCol = getRandomInt(0, board.length);

        if ((!board[randomRow][randomCol].isMine) && board[randomRow][randomCol] !== board[i][j]) {
            board[randomRow][randomCol].isMine = true;
            count++;
        }
    }
}

function updateMineNegs(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var minesCount = setMinesNegsCount(board, i, j);
            board[i][j].minesAroundCount = minesCount;
        }
    }
}

function setMinesNegsCount(board, row, col) {
    var count = 0;
    var x = row;
    var y = col;
    if (board[x][y].isMine === false) {
        for (var i = x - 1; i <= x + 1; i++) {
            for (var j = y - 1; j <= y + 1; j++) {
                if ((i < 0) || (j < 0) || (i >= board.length) || (j >= board.length) || (i === x && j === y)) continue;
                if (board[i][j].isMine) {
                    count++;
                }
            }
        }
    }
    return count;
}



function exsposeCells(board, i, j) {
    if (board[i][j].minesAroundCount === 0 && !board[i][j].isMine) {
        exsposeNegs(board, i, j);
    }

    if (board[i][j].isMine) {
        if (gGame.lives > 1) {
            gGame.lives--;
            document.querySelector('.life').innerText = HEART + ' ' + gGame.lives;
            document.querySelector('.emoji').innerText = SAD;
            setTimeout(function () { document.querySelector('.emoji').innerText = HAPPY; }, 500);
        }
        else {
            exsposeMines(board);
            document.querySelector('.life').innerText = HEART + ' ' + 0;
            gameOver();
        }
    }
}


function exsposeNegs(board, row, col) {
    var x = row;
    var y = col;
    for (var i = x - 2; i <= x + 2; i++) {
        for (var j = y - 2; j <= y + 2; j++) {
            if ((i < 0) || (j < 0) || (i >= board.length) || (j >= board.length) || (i === x && j === y)) continue;
            else if (board[i][j].isMine) continue;
            else {
                board[i][j].isShown = true;
            }
        }
    }
}


function exsposeMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j].isMine) {
                board[i][j].isShown = true;
            }
        }
    }
}


function checkVictory() {
    if (gGame.shownCount === ((gLevel.SIZE ** 2) - gLevel.MINES)) {
        gGame.isOn = false;
        gGame.secsPassed = 0;
        clearInterval(gtimerInterval);
        gGame.isLocked = true;
        document.querySelector('.emoji').innerText = VICTORY;
    }
}


function cellMarked(elCell, i, j) {
    if (elCell.innerText !== FLAG && !gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = true;
        elCell.innerText = FLAG;
        gGame.markedCount++;
        document.querySelector('.count').innerText = FLAG + ' ' + gGame.markedCount + '/' + gLevel.MINES;
    }
    else {
        gBoard[i][j].isMarked = false;
        elCell.innerText = '';
        gGame.markedCount--;
        document.querySelector('.count').innerText = FLAG + ' ' + gGame.markedCount + '/' + gLevel.MINES;
    }
}


function changeLevel(elLevel) {
    var level = elLevel.className.charAt(6);
    if (+level === 1) {
        gLevel.SIZE = 4;
        gLevel.MINES = 2;
        gLevel.Life = 1;
    }
    else if (+level === 2) {
        gLevel.SIZE = 8;
        gLevel.MINES = 12;
        gLevel.Life = 2;
    }
    else {
        gLevel.SIZE = 12;
        gLevel.MINES = 30;
        gLevel.Life = 3;
    }
    gameOver();
    newGame();
}


function gameOver() {
    gGame.isOn = false;
    gGame.secsPassed = 0;
    clearInterval(gtimerInterval);
    gGame.isLocked = true;
    document.querySelector('.emoji').innerText = DEAD;
}


function newGame() {
    gGame.isOn = false;
    clearInterval(gtimerInterval);
    gGame.secsPassed = 0;
    setTimer();
    gGame.isLocked = false;
    gGame.lives = gLevel.Life;
    gGame.markedCount = 0;
    initGame();
    document.querySelector('.emoji').innerText = HAPPY;
}