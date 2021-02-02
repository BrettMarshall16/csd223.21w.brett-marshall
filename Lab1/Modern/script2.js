"use strict";
/*
*JavaScript 6th Edition
*Chapter 9
*Chapter case

*Eating Well in Season order page
*Author: Brett Marshall
*Date:   Jan 31rst

*Filename: script2.js
*/

let queryArray = [];

function populateInfo() {
  if (location.search) {
    let counter = 0;
    const queryData = new URLSearchParams(location.search);
    let hiddenInputs = document.querySelectorAll("input[type=hidden]");
    for (const [name, val] of queryData) {
      hiddenInputs[counter].name = name;
      hiddenInputs[counter].value = val;
      counter++;
    }
  }
}

function createCookies() {
  let formFields = document.querySelectorAll(
    "input[type=hidden],input[type=radio], textarea"
  );
  for (const name of formFields) {
    Cookies.set(name.name, name.value);
  }
}

function handleSubmit(evt) {
  if (evt.preventDefault) {
    evt.preventDefault();
  } else {
    evt.returnValue = false;
  }
  createCookies();
  document.getElementsByTagName("form")[0].submit();
}
function createEventListeners() {
  const form = document.getElementsByTagName("form")[0];
  if (form.addEventListener) {
    form.addEventListener("submit", handleSubmit, false);
  } else if (form.attachEvent) {
    form.attachEvent("onsubmit", handleSubmit);
  }
}
function setUpPage() {
  createEventListeners();
  populateInfo();
}

addEventListener("load", setUpPage, false);
