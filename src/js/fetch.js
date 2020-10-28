//By: elin kurtsdotter
"use strict";










//VARIABLES
let presentationEl = document.getElementById("presentation");
//education
let educationEl = document.getElementById("education");
//work
let workEl = document.getElementById("work");
//websites
let websitesEl = document.getElementById("websites");
let caseDivEl = document.getElementById("caseDiv"); 

//eventListener
window.addEventListener('load', getCourses);
window.addEventListener('load', getWork);
window.addEventListener('load', getWebsite);
window.addEventListener('load', shortenStart);
//window.addEventListener('load', getSingleWebsite);

//Functions
/********************************
 * EDUCATION
*********************************/
//GET education/courses
function getCourses() {
  educationEl.innerHTML = '';

  fetch('http://studenter.miun.se/~elku1901/writeable/projektAdmin/API/education.php')
    .then(respones => respones.json())
    .then(data => {
      data.forEach(education => {
        // get year in format YY from date YYYY-MM-DD
        let start = education.edu_start; 
        let startDate = start.slice(0, 4);
        let stop = education.edu_stop;
        let stopDate = stop.slice(0, 4);

        // get month number from date YYYY-MM-DD
        let monthNumberStart= education.edu_start;
        let startMonth = monthNumberStart.slice(6, 7);
        let monthNumberStop= education.edu_stop;
        let endMonth = monthNumberStop.slice(6, 7);

        let month = [ "jan", "feb", "mars", "april", "may", "juni",
            "juli", "aug", "sep", "okt", "nov", "dec" ];

        // use moment() to get name of month from format MM
        let monthIndex = moment().month(startMonth-1).format("MM");
        let Start = month[monthIndex-1];
        let monthIndexStop = moment().month(endMonth-1).format("MM");
        let Stop = month[monthIndexStop-1];

        educationEl.innerHTML +=
        `<article class="cvArticle ${education.id}">
          <h3>${education.edu_name}</h3>
          <span class="when">${startDate} ${Start} - </span> <span class="when">${stopDate} ${Stop}</span>
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

  fetch('http://studenter.miun.se/~elku1901/writeable/projektAdmin/API/work.php')
  .then(respones => respones.json())
  .then(data => {
    data.forEach(work => {
      // get year in format YY from date YYYY-MM-DD
      let start = work.work_start; 
      let startDate = start.slice(0, 4);
      let stop = work.work_stop;
      let stopDate = stop.slice(0, 4);

      // get month number from date YYYY-MM-DD
      let monthNumberStart= work.work_start;
      let startMonth = monthNumberStart.slice(6, 7);
      let monthNumberStop= work.work_stop;
      let endMonth = monthNumberStop.slice(6, 7);

      let month = [ "jan", "feb", "mars", "april", "may", "juni",
          "juli", "aug", "sep", "okt", "nov", "dec" ];

      // use moment() to get name of month from format MM
      let monthIndex = moment().month(startMonth-1).format("MM");
      let Start = month[monthIndex-1];
      let monthIndexStop = moment().month(endMonth-1).format("MM");
      let Stop = month[monthIndexStop-1];

      workEl.innerHTML +=
      `<article class="cvArticle ${work.id}">
        <h3>${work.work_place}</h3>
        <span class="when">${startDate} ${Start} - </span> <span class="when">${stopDate} ${Stop}</span>
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


  fetch('http://studenter.miun.se/~elku1901/writeable/projektAdmin/API/websites.php')
    .then(respones => respones.json())
    .then(data => {
      data.forEach(websites => {
      
        websitesEl.innerHTML +=
        `<div class="flex-item column" id="${websites.id}">
              <!--<img src="images/${websites.ws_image}" alt="${websites.ws_image}">-->
              <h4 onClick="getSingleWebsite(${websites.id})"> ${websites.ws_title} </h4>
              <p> ${websites.ws_description} </p>
          </div>`     
        counter++;
      })   
    
    })
}




function getSingleWebsite(id) {
  presentationEl.innerHTML = '';
  websitesEl.innerHTML = '';
  caseDivEl.innerHTML = '';
  
  fetch('http://studenter.miun.se/~elku1901/writeable/projektAdmin/API/websites.php?id=' + id)
  .then(respones => respones.json())
  .then(data => {
      caseDivEl.innerHTML =
      `<h2>${data.ws_title}</h2>
      <p>${data.ws_description}</p>
      <p class="visitLink"><a href="${data.ws_url}" target="_blank">Besök webbplatsen >> </a></p>
      <div class="softLink">
        <a href="index.html"><< Tillbaka till portfolio</a>
      </div>`     
            
    })   
}


/*
if(counter % grids == 1) {
  websitesEl.innerHTML +=
  `
  <div class="first column" id="${websites.id}">
    <!--<img src="images/${websites.ws_image}" alt="${websites.ws_image}">-->
    <h4 onClick="getSingleWebsite(${websites.id})"> ${websites.ws_title} </h4>
    <p> ${websites.ws_description} </p>
  </div>`     
    counter++;
  } else if(counter % grids == 2) {
    websitesEl.innerHTML +=
    `<div class="second column" id="${websites.id}">
        <!--<img src="images/${websites.ws_image}" alt="${websites.ws_image}">-->
          <h4 onClick="getSingleWebsite(${websites.id})"> ${websites.ws_title}</h4>
          <p> ${websites.ws_description} </p>
    </div>`  
    counter++;
  } else {
    websitesEl.innerHTML +=
    `<div class="third column" id="${websites.id}">
          <!--<img src="images/${websites.ws_image}" alt="${websites.ws_image}">-->
          <h4 onClick="getSingleWebsite(${websites.id})"> ${websites.ws_title} </h4>
          <p> ${websites.ws_description} </p>
    </div>`  
    counter++;
  }

})*/