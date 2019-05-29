'use strict'

function init() {
    renderUsersTable();
}


function renderUsersTable() {
    var users = getUsers();
    var strHTML = '<table border="2"><tbody>';
    strHTML += `<tr>
    <th>User Name</th>
    <th>Password</th>
    <th>last Log</th>
    <th>Is Admin</th>
    </tr>`;
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        strHTML += `<tr>
        <td>${user.name}</td>
        <td>${user.password}</td>
        <td>${user.lastLogTime.toUTCString()}</td>
        <td>${user.isAdmin}</td>
        </tr>`;
    }
    strHTML += '</tbody></table>';
    document.querySelector('.users-table').innerHTML = strHTML;
}