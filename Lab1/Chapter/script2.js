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
        console.log(hiddenInputs.value);
        queryData = queryData.substring(1, queryData.length);
        queryArray = queryData.split("&");
        for (var i = 0; i < queryArray.length; i++){
            hiddenInputs[i].value = queryArray[i].substring(queryArray[i].lastIndexOf("=") + 1);
        }
    }
}

document.addEventListener("load", populateInfo());