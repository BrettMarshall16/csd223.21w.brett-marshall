"use strict";

setInterval(function () {
  if (document.getElementById("emojis").hasChildNodes()) {
    let parent = document.getElementById("emojis");
    let child = document.getElementsByTagName("span")[0];
    parent.removeChild(child);
  }
}, 2000);

function add() {
  var thediv = document.getElementById("emojis");
  var emoji = document.getElementById("text").value;
  if (emoji == ":)") {
    let newSpan = document.createElement("span");
    thediv.appendChild(newSpan);
    newSpan.innerHTML = "&#128512";
  }
  if (emoji == ":(") {
    let newSpan = document.createElement("span");
    thediv.appendChild(newSpan);
    newSpan.innerHTML = "&#128543";
  }
  if (emoji == ":D") {
    let newSpan = document.createElement("span");
    thediv.appendChild(newSpan);
    newSpan.innerHTML = "&#128513";
  }
  if (emoji == ":P") {
    let newSpan = document.createElement("span");
    thediv.appendChild(newSpan);
    newSpan.innerHTML = "&#128523";
  }
  if (emoji == ";)") {
    let newSpan = document.createElement("span");
    thediv.appendChild(newSpan);
    newSpan.innerHTML = "&#128521";
  }
  if (emoji == "B)") {
    let newSpan = document.createElement("span");
    thediv.appendChild(newSpan);
    newSpan.innerHTML = "&#128526";
  }
  if (emoji == "8)") {
    let newSpan = document.createElement("span");
    thediv.appendChild(newSpan);
    newSpan.innerHTML = "&#129299";
  }
}

function test() {
  let value = document.getElementById("size").value;
  document.getElementById("emojis").style.fontSize = value + "px";
}

const re = /^[:B;8][P)()]$/;

function disableBtn() {
  let btn = document.getElementById("emote");
  let input = document.getElementById("text");
  if (re.test(input.value)) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}
