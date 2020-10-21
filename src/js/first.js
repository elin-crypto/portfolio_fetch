//By: elin kurtsdotter
"use strict";



/* Toggle between *** and show password */
function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }






//VARIABLES
//education
let educationEl = document.getElementById("education");
//work
let workEl = document.getElementById("work");
//websites
let websitesEl = document.getElementById("websites");


//eventListener
window.addEventListener('load', getCourses);
window.addEventListener('load', getWork);
window.addEventListener('load', getWebsite);


//Functions
/********************************
 * EDUCATION
*********************************/
//GET education/courses
function getCourses() {
  educationEl.innerHTML = '';

  fetch('http://localhost:8080/Webbutv_III_PROJEKT/API/education.php')
    .then(respones => respones.json())
    .then(data => {
      data.forEach(education => {
        educationEl.innerHTML +=
        `<article class="cvArticle ${education.id}">
          <h3>${education.edu_name}</h3>
          <p class="when">${education.edu_start} - ${education.edu_stop}</p>
          <p class="where">${education.edu_school}</p>
        </article>`        
      })
    })
}

/********************************
 *  WORK
*********************************/
// GET work


function getWork() {
  workEl.innerHTML = '';

  fetch('http://localhost:8080/Webbutv_III_PROJEKT/API/work.php')
  .then(respones => respones.json())
  .then(data => {
    data.forEach(work => {
      workEl.innerHTML +=
      `<article class="cvArticle ${work.id}">
        <h3>${work.work_place}</h3>
        <p class="when">${work.work_start} - ${work.work_stop}</p>
        <p class="what">${work.work_title}</p>
        <p class="where">Malmö</p>          
      </article>`        
    })
  })
}



 

/********************************
 *  WEBSITE
*********************************/
// * GET website
function getWebsite() {
  websitesEl.innerHTML = '';
  let counter = 1; //start counter
  let grids = 3; // grids per row


  fetch('http://localhost:8080/Webbutv_III_PROJEKT/API/websites.php')
    .then(respones => respones.json())
    .then(data => {
      data.forEach(websites => {
        if(counter % grids == 1) {
        websitesEl.innerHTML +=
        `<div class="first column" id="${websites.id}" onClick="reply_click(${websites.id})">
          <img src="images/${websites.ws_image}" alt="${websites.ws_image}">
          <h4> ${websites.ws_title}</h4>
          <p class="kursiv">${websites.ws_url}</p>
          <p > ${websites.ws_description} </p>
        </div>`     
          counter++;
        } else if(counter % grids == 2) {
          websitesEl.innerHTML +=
          `<div class="second column" id="${websites.id}" onClick="reply_click(${websites.id})">
              <img src="images/${websites.ws_image}" alt="${websites.ws_image}">
                <h4> ${websites.ws_title}</h4>
                <p class="kursiv">${websites.ws_url}</p>
                <p class="hidden""> ${websites.ws_description} </p>
          </div>`  
          counter++;
        } else {
          websitesEl.innerHTML +=
          `<div class="third column" id="${websites.id}" onClick="reply_click(${websites.id})">
            <img src="images/${websites.ws_image}" alt="${websites.ws_image}">
            <h4> ${websites.ws_title}</h4>
            <p class="kursiv">${websites.ws_url}</p>
            <p class="hidden""> ${websites.ws_description} </p>
          </div>`  
          counter++;
        }
            
      })
    })
}

function reply_click(clicked_id){
      // Show/Hide description
    $(document).ready(function(){
      $("#clicked_id").click(function(){
        $(".hidden").slideDown();
      });
    });
    $(document).ready(function(){
      $("#clicked_id").click(function(){
        $(".hidden").slideUp();
      });
    });
  }




