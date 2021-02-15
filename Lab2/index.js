"use strict";

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 46.534039, lng: -84.313061 },
    zoom: 15,
  });

  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
          const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
          };
          map.setCenter(pos);
      })
    }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
window.addEventListener("load", resizeCanvas, false);
window.addEventListener("resize", resizeCanvas,false);

function startStroke(event){
    document.addEventListener("pointermove", dragStroke, false);
    document.addEventListener("pointerup", endStroke,false);
    let mx = event.clientX;
    let my = event.clientY;
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000000";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(mx, my);
}

function dragStroke(event){
    let mx = event.clientX;
    let my = event.clientY;
    ctx.lineTo(mx,my);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mx,my);
}

function endStroke(){
    document.removeEventListener("pointermove", dragStroke, false);
    document.removeEventListener("pointerup", endStroke,false);
}

function resizeCanvas(){
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.putImageData(imageData,0,0);
}