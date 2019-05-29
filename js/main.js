'use strict'
console.log('Starting up');

$(document).ready(init);

function init() {
    createProjs();
    renderPortfolioGrid();
}

function renderPortfolioGrid() {
    var projs = getProjs();
    var strHTML = '';
    if (!projs || projs.length === 0) return;
    console.log(projs);
    projs.forEach(function (proj) {
        strHTML += `<div class="col-md-4 col-sm-6 portfolio-item" onclick="renderModal(${proj.id})">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                  <i class="fa fa-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" src= 'img/portfolio/${proj.name}.png' alt="">
            </a>
            <div class="portfolio-caption">
              <h4>${proj.title}</h4>
              <p class="text-muted">${proj.name}</p>
            </div>
          </div>
            `
    })
    $('.test').html(strHTML);
}


function renderModal(projId) {
    var proj = findProj(projId);
    var strHTML = '';
    strHTML += `
        <h2>${proj.title}</h2>
            <p class="item-intro text-muted">${proj.name}.</p>
            <img class="img-fluid d-block mx-auto" src= 'img/portfolio/${proj.name}.png' alt="">
            <p> ${proj.description}</p>
            <ul class="list-inline">
                <li>Published At: ${proj.publishedAt}</li>
                <!-- <li>Client:  ....</li> -->
                <li>Category: ${proj.labels}</li>
                <li> <a href="projs/${proj.name}/index.html" target="_blank">Check it out</a></li>
            </ul>
            <button class="btn btn-primary" data-dismiss="modal" type="button">
                <i class="fa fa-times"></i>
            Close Project</button>`
    $('.modal-body').html(strHTML);
}


function onSubmit() {
  var name = $('#name').val();
  var email = $('#email').val()
  var subject = $('#subject').val()
  var message = $('#message').val()
  createLead(name, email, subject, message);
  return;
}