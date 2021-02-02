/*
*JavaScript 6th Edition
*Chapter 9
*Chapter case

*Eating Well in Season order page
*Author: Brett Marshall
*Date:   Jan 31rst

*Filename: script3.js
*/
"use strict";
function parseData() {
  var formData = document.cookie;
  var formArray = [];
  var list = document.querySelector("div.results ul");
  formArray = formData.split("; ");
  for (var i = 0; i < formArray.length; i++) {
    var newItem = document.createElement("li");
    newItem.innerHTML = formArray[i];
    list.appendChild(newItem);
  }
}

addEventListener("onload", parseData());
