'use strict'

function renderBoard(board) {
    var countShownCells = 0;
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var value = '';
            var status = '';

            if(board[i][j].isMarked){
                value = FLAG;
            }
            if (board[i][j].isMine && board[i][j].isShown) {
                value = MINE;
                status = 'exsposed';
            }

            if (board[i][j].minesAroundCount > 0 && board[i][j].isShown) {
                value = board[i][j].minesAroundCount + '';
                status = 'exsposed' + ' num' + value;
                countShownCells++;
            }
            if (board[i][j].minesAroundCount === 0 && board[i][j].isShown) {
                status = 'exsposed';
                countShownCells++;
            }
            var className = `cell cell ${i}-${j}`;
            strHTML += `<td> 
            <div class="${className} ${status}" onmousedown="cellClicked(this, event, ${i}, ${j})"> ${value}</div>
            </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var container = document.querySelector('.board-container');
    container.innerHTML = strHTML;
    gGame.shownCount = countShownCells;
}




function setTimer() {
    var seconds = gGame.secsPassed; 
    if (gGame.isOn) {
        seconds++;
    }
    gGame.secsPassed = seconds;
    var displayTimer = document.querySelector('.timer');
    if (seconds < 10) displayTimer.innerHTML = '🕒 00' + seconds;
    else if (seconds < 100) displayTimer.innerHTML = '🕒 0' + seconds;
    else if (seconds < 1000) displayTimer.innerHTML = '🕒' + seconds;
    else return;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function renderMenu(){
    document.querySelector('.life').innerText = HEART + ' ' + gGame.lives;
    document.querySelector('.count').innerText = FLAG + ' ' + gGame.markedCount  + '/' + gLevel.MINES;
    document.querySelector('.emoji').innerText = HAPPY;
}