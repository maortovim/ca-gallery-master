'use strict'

var gUsers;

function getUsers() {
    var users = loadFromStorage(users);
    if (!users || users.length === 0) {
        gUsers = createUsers();
        saveToStorage('users', gUsers);
    }
    else gUsers = users;
    return gUsers;
}

function createUsers() {
    var users = [
        createUser('Michael', 'n12345', new Date(), true),
        createUser('Marina', 'g12345', new Date(), false),
        createUser('Nitzan', 'b12345', new Date(), false)
    ]
    return users;
}

function createUser(name, password, lastLogTime, isAdmin) {
    var user = {
        name: name,
        password: password,
        lastLogTime: lastLogTime,
        isAdmin: isAdmin
    };
    return user;
}

function findUser(name, password) {
    var user = gUsers.find(function(user) {
        return user.name === name && user.password === password;
    });
    if (!user) return null;
    return user;
}

function updateLastLog(user) {
    user.lastLogTime = new Date();
}