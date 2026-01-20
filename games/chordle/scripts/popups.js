// info popup
document.getElementById("open-help").addEventListener("click", openHelp);
function openHelp(){
  var popup = document.getElementById("info");
  popup.style.visibility = "visible";
}
document.getElementById("close-help").addEventListener("click", closeHelp);
function closeHelp(){
  var popup = document.getElementById("info");
  popup.style.visibility = "hidden";
}

// win popup
document.getElementById("close-win").addEventListener("click", closeWin);
function closeWin(){
  var popup = document.getElementById("alert-win");
  popup.style.visibility = "hidden";
}


// lose popup
document.getElementById("close-lose").addEventListener("click", closeLose);
function closeLose(){
  var popup = document.getElementById("alert-lose");
  popup.style.visibility = "hidden";
}