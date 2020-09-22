//By: elin kurtsdotter
console.log("Hola, this is from first js-file");

/* Set the width of the sidebar to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("mobMenuButton").style.visibility = "hidden";
  }
  
/* Set the width of the sidebar to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("mobMenuButton").style.visibility = "visible";
}