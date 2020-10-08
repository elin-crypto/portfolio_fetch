//By: elin kurtsdotter
"use strict";


//variables
let coursesEl = document.getElementById("courses");
let addCoursbtn = document.getElementById("addCourse");
let codeInput = document.getElementById("code");
let nameInput = document.getElementById("name");
let progressionInput = document.getElementById("progression");
let syllabusInput = document.getElementById("syllabus");
let updateCourseEl = document.getElementById("updateCourse");
let addCourseFormEl = document.getElementById("addCourseForm");

//eventListener
window.addEventListener('load', getCourses);
addCoursbtn.addEventListener('click', addCourse);
updateCourseEl.addEventListener('click', updateCourse);

//Functions
function getCourses() {
  coursesEl.innerHTML = '';

  fetch('http://studenter.miun.se/~elku1901/dt173g/Moment5/rest/courses.php')
    .then(respones => respones.json())
    .then(data => {
      data.forEach(courses => {
        coursesEl.innerHTML +=
        `<tr>
          <td><a href="${courses.syllabus}"> ${courses.code} </a></td><td> ${courses.name} </td><td> ${courses.progression} </td>
          <td><button id="${courses.id}" onclick="editForm(${courses.id})" class="btn">Edit</button></td>
          <td><button id="${courses.id}" onclick="deleteCourse(${courses.id})" class="btn">X</button></td>
        </tr>`
      })
    })
}

function deleteCourse(id) {
  fetch('http://studenter.miun.se/~elku1901/dt173g/Moment5/rest/courses.php?id=' + id, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      getCourses();
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}


function addCourse() {
  let code = codeInput.value;
  let name = nameInput.value;
  let progression = progressionInput.value;
  let syllabus = syllabusInput.value;

  //make it an object
  let course = {'code': code, 'name': name, 'progression': progression, 'syllabus': syllabus};

  fetch('http://studenter.miun.se/~elku1901/dt173g/Moment5/rest/courses.php', {
    method: 'POST',
    body: JSON.stringify(course),
  })
    .then(response => response.json())
    .then(data => {
      getCourses();
     
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}


function editForm(id) {
  fetch('http://studenter.miun.se/~elku1901/dt173g/Moment5/rest/courses.php?id=' + id)
  .then(respones => respones.json())
  .then(updateCourseEl.style.display = 'block')
  .then(courses => {
    updateCourseEl.innerHTML +=

        `<h3>Uppdatera kurs</h3>
        <form action="post">
          <label for="newCode">Kurskod</label>
          <input type="text" name="code" id="newCode" value=" ${courses.code}">
          <br>
          <label for="newName">Kursnamn</label>
          <input type="text" name="name" id="newName" value=" ${courses.name}">
          <br>
          <label for="newProgression">Progression</label>
          <input type="text" name="progression" id="newProgression" value=" ${courses.progression}">
          <br>
          <label for="newSyllabus">Kursplan</label>
          <input type="text" name="syllabus" id="newSyllabus" value=" ${courses.syllabus}">
          <br>
          <input value="Uppdatera kurs" id="updateCourse" class="btn">
      </form>`
  })

}

//Detta funkar inte, varför fattar jag inte. 
function updateCourse(id) {
  let newCodeInput = document.getElementById("newCode");
  let newNameInput = document.getElementById("newName");
  let newProgressionInput = document.getElementById("newProgression");
  let newSyllabusInput = document.getElementById("newSyllabus");

  let newCode = newCodeInput.value;
  let newName = newNameInput.value;
  let newProgression = newProgressionInput.value;
  let newSyllabus = newSyllabusInput.value;

  //make it an object
  let newCourse = {'code': newCode, 'name': newName, 'progression': newProgression, 'syllabus': newSyllabus};

  fetch('http://studenter.miun.se/~elku1901/dt173g/Moment5/rest/courses.php?id=' + id, {
    method: 'PUT',
    body: JSON.stringify(newCourse),
  })
    .then(response => response.json())
    .then(data => {
      getCourses();
    })
    .catch(error => {
      console.log('Error: ', error);
    })




}