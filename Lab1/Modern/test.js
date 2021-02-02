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

var queryArray = [ ];

function populateInfo(){
    if(location.search){
        var queryData = location.search;
        var hiddenInputs = document.querySelectorAll("input[type=hidden]");
        queryData = queryData.substring(1, queryData.length);
        queryArray = queryData.split("&");
        for (var i = 0; i < queryArray.length; i++){
            hiddenInputs[i].value = queryArray[i].substring(queryArray[i].lastIndexOf("=") + 1);
        }
    }
}

function createCookies(){
    var formFields = document.querySelectorAll("input[type=hidden], intput[type=radio], textarea");
    var expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 7);
    for (var i = 0; i < formFields.length; i ++){
        var currentValue = decodeURIComponent(formfields[i].value);
        currentValue = currentValue.replace(/\+/g," ");
        document.cookie = formFields[i].name + "=" + currentValue + "; expires=" + expiresDate.toUTCString();
    }
}

function handleSubmit(){
    createCookies();
    document.getElementsByTagName("form")[0];
}

function createEventListeners(){
    var form = document.getElementsByTagName("form")[0];
    form.addEventListener("onsubmit", handleSubmit());
}

function setupPage(){
    createEventListeners();
    populateInfo();
}
addEventListener("onload", setupPage());