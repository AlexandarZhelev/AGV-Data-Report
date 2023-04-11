var timerStarted = false;
const agvDisplay = document.querySelector('#rect4710'); //rect4710 -> agv display
//the red buttons on the AGV
const btn1 = document.querySelector('#path13910'); 
const btn2 = document.querySelector('#path16824');
const btn3 = document.querySelector('#path16828');
const btn4 = document.querySelector('#path16826');


const comboAGVMode = document.getElementById("agvMode");
comboAGVMode.selectedIndex = -1;
const modeLight = document.querySelector('#rect2092');

var comboCurrentLocation = document.getElementById("currentLocation");

const currentLocationsCount = comboCurrentLocation.length;

comboCurrentLocation.selectedIndex = currentLocationsCount; //first solution
//document.querySelector("#tspan2260").textContent = "Current location: " + comboCurrentLocation.value; //second solution
var currentLocationIndex = -1;

var readyCbx = document.getElementById("readyCbx");
readyCbx.addEventListener("click", colorChangeReady);

var loadedCbx = document.getElementById("blinkerCheckbox");
loadedCbx.addEventListener("click", colorChangeLoad);

function colorChangeReady(){
  if(document.getElementById("readyCbx").checked){
    agvDisplay.classList.add("blinkingReady");
  }

  else{
    agvDisplay.classList.remove("blinkingReady");
  }
}

function colorChangeLoad(){
  if(document.getElementById("blinkerCheckbox").checked){
    btn1.classList.add("blinkingLightsLoaded");
    btn2.classList.add("blinkingLightsLoaded");
    btn3.classList.add("blinkingLightsLoaded");
    btn4.classList.add("blinkingLightsLoaded");
  }
  else{
    btn1.classList.remove("blinkingLightsLoaded");
    btn2.classList.remove("blinkingLightsLoaded");
    btn3.classList.remove("blinkingLightsLoaded");
    btn4.classList.remove("blinkingLightsLoaded");
  }
}

var batteryLevel = document.getElementById("Battery");
batteryLevel.addEventListener("change", textUpdate);

var speed = document.getElementById("CurrentSpeed");
speed.addEventListener("change", textUpdate);

var currentLocation = document.getElementById("currentLocation");
currentLocation.addEventListener("change", textUpdate);

var mode = document.getElementById("agvMode");
mode.addEventListener("change", textUpdate);

function textUpdate(){
  document.querySelector("#tspan2256").textContent = "Battery: " + document.getElementById("Battery").value + " %";
  document.querySelector("#tspan2250").textContent = "Speed: " + document.getElementById("CurrentSpeed").value + " mm/sec";
  document.querySelector("#tspan2252").textContent = "Mode: " + document.getElementById("agvMode").value;
}

setInterval(changeCurrentLocation, 2000);

function changeCurrentLocation(){
  currentLocationIndex++;

  if(currentLocationIndex >= currentLocationsCount){
    currentLocationIndex = 0;
  }

  comboCurrentLocation.selectedIndex = currentLocationIndex.toString();
  document.querySelector("#tspan2260").textContent = "Current location: " + comboCurrentLocation.value;
}

comboAGVMode.addEventListener("change",  modeColor);

function modeColor(){
  var selectedIndex = document.getElementById("agvMode").selectedIndex;

  switch(selectedIndex.toString()){
    case '0': 
    modeLight.setAttribute("style", "fill:#6fbeff; fill-opacity:1;stroke-width:0.883195");
    break; 

    case "1": 
    modeLight.setAttribute("style", "fill:#fffd7c; fill-opacity:1;stroke-width:0.883195");
    break; 

    case "2": 
    modeLight.setAttribute("style", "fill:#65ff37; fill-opacity:1;stroke-width:0.883195");
    break; 

    case "3": 
    modeLight.setAttribute("style", "fill:#ff8800; fill-opacity:1;stroke-width:0.883195");
    break; 

    case "4": 
    modeLight.setAttribute("style", "fill:#8c00ff; fill-opacity:1;stroke-width:0.883195");
    break; 

    case "4": 
    modeLight.setAttribute("style", "fill:#ff0000; fill-opacity:1;stroke-width:0.883195");
    break; 

    default:
      modeLight.setAttribute("style", "fill:#999999; fill-opacity:1;stroke-width:0.883195");
  }
}