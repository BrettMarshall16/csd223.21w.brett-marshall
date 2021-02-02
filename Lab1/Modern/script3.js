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
  let formData = Cookies.get();
  let list = document.querySelector("div.results ul");
  for (const [name, value] of Object.entries(formData)) {
    let newItem = document.createElement("li");
    newItem.innerHTML = name + ": " + value;
    list.appendChild(newItem);
  }
}

addEventListener("load", parseData, false);
