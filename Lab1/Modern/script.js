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

function clearCookies(){
  const theCookies = Cookies.get();
  for(const name in theCookies){
      Cookies.remove(name);
  }
}

addEventListener("load", clearCookies, false);