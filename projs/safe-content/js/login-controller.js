'use strict'

function onInit() {
    getUsers();
}

function onLogin(event) {
    if (!checkIfInput()) return;
    var currUser = onUserLog();
    if (currUser) {
        event.preventDefault();
        updateLastLog(currUser);
        renderSecretContent(currUser);
    }
    else {
        alert('Please check your user name and password.');
    }
}

function onUserLog() {
    var name = document.querySelector('.name').value;
    var password = document.querySelector('.password').value;
    return findUser(name, password);
}

function renderSecretContent(user) {
    document.querySelector('.form-container').style.display = 'none';
    document.querySelector('.welcome').innerText = `Welcome ${user.name}`;
    document.querySelector('.secret-content').style.display = 'block';
    var strHtml = `<button class="btn-link-admin" 
    onclick="onCheckAdmin(${user})"> Page For Admin Only </button>`;
    document.querySelector('.admin-link').innerHTML = strHtml;
    
}


function onCheckAdmin(user) {
    console.log(user);
    if (user.isAdmin) {
        renderAdminPage();
    }
    else alert('You are not an admin');
}


function renderAdminPage() {
    window.location.href = 'admin.html';
}


function checkIfInput() {
    var name = document.querySelector('.name');
    var password = document.querySelector('.password');
    if (name.value === '' || password.value === '') return false;
    else return true;
}

