var timerStarted = false;

//the red buttons on the AGV
const btn1 = document.querySelector('#path13910'); 
const btn2 = document.querySelector('#path16824');
const btn3 = document.querySelector('#path16828');
const btn4 = document.querySelector('#path16826');

//rect4710 -> agv display
const agvDisplay = document.querySelector('#rect4710'); 

const comboAGVMode = document.getElementById("agvMode");
comboAGVMode.selectedIndex = -1;//when refresh page the "Mode" list-box must be empty

const modeLight = document.querySelector('#rect2092');

var comboCurrentLocation = document.getElementById("currentLocation");
const currentLocationsCount = comboCurrentLocation.length;
comboCurrentLocation.selectedIndex = currentLocationsCount; //solution 1
//document.querySelector("#tspan2260").textContent = "Current location: " + comboCurrentLocation.value; //solution 2
var currentLocationIndex = -1; //start with 1 step prewious to start the index from the begining when page refresh

var readyCbx = document.getElementById("readyCbx");
readyCbx.addEventListener("click", colorChangeReadyAGV);

var loadedCbx = document.getElementById("blinkerCheckbox");
loadedCbx.addEventListener("click", colorChangeLoadAGV);

//Blink lights when the AGV is marked ready
function colorChangeReadyAGV(){
  if(document.getElementById("readyCbx").checked){
    agvDisplay.classList.add("blinkingReady"); //start blinking when button is checked
  }

  else{
    agvDisplay.classList.remove("blinkingReady"); //stop blinking
  }
}

//Blink buttons when the AGV is loaded
function colorChangeLoadAGV(){
  if(document.getElementById("blinkerCheckbox").checked){ //start blinking when button is checked
    btn1.classList.add("blinkingLightsLoaded");
    btn2.classList.add("blinkingLightsLoaded");
    btn3.classList.add("blinkingLightsLoaded");
    btn4.classList.add("blinkingLightsLoaded");
  }

  else{
    btn1.classList.remove("blinkingLightsLoaded");//stop blinking
    btn2.classList.remove("blinkingLightsLoaded");
    btn3.classList.remove("blinkingLightsLoaded");
    btn4.classList.remove("blinkingLightsLoaded");
  }
}

//display information from text fields, next to AGV
var batteryLevel = document.getElementById("Battery");
batteryLevel.addEventListener("change", textUpdate);

var speed = document.getElementById("CurrentSpeed");
speed.addEventListener("change", textUpdate);

var currentLocation = document.getElementById("currentLocation");
currentLocation.addEventListener("change", textUpdate);

var mode = document.getElementById("agvMode");
mode.addEventListener("change", textUpdate);

function textUpdate(){
  document.querySelector("#tspan2256").textContent = "Battery level: " + document.getElementById("Battery").value + " %";
  document.querySelector("#tspan2250").textContent = "Speed: " + document.getElementById("CurrentSpeed").value + " mm/sec";
  document.querySelector("#tspan2252").textContent = "Mode: " + document.getElementById("agvMode").value;
}

setInterval(changeCurrentLocation, 2000);
//set timer of every 2sec change current location
function changeCurrentLocation(){
  currentLocationIndex++; //increment location index

  if(currentLocationIndex >= currentLocationsCount){ //if last index reached, go back to the first one and start again
    currentLocationIndex = 0;
  }

  comboCurrentLocation.selectedIndex = currentLocationIndex.toString();
  document.querySelector("#tspan2260").textContent = "Current location: " + comboCurrentLocation.value;
}

//change color of the rectangle on the top of AGV when different modes has been choosen
comboAGVMode.addEventListener("change",  modeColor);

function modeColor(){
  var selectedIndex = document.getElementById("agvMode").selectedIndex;

  switch(selectedIndex.toString()){
    case '0': //automatic mode BLUE
    modeLight.setAttribute("style", "fill:#6fbeff; fill-opacity:1;stroke-width:0.883195");
    break; 

    case "1": //manual mode YELLOW
    modeLight.setAttribute("style", "fill:#fffd7c; fill-opacity:1;stroke-width:0.883195");
    break; 

    case "2": //charging mode GREEN
    modeLight.setAttribute("style", "fill:#65ff37; fill-opacity:1;stroke-width:0.883195");
    break; 

    case "3": //disable mode ORANGE
    modeLight.setAttribute("style", "fill:#ff8800; fill-opacity:1;stroke-width:0.883195");
    break; 

    case "4": //reserved mode PURPLE
    modeLight.setAttribute("style", "fill:#8c00ff; fill-opacity:1;stroke-width:0.883195");
    break; 

    case "5": //error mode RED
    modeLight.setAttribute("style", "fill:#fa0202; fill-opacity:1;stroke-width:0.883195");
    break; 

    default: //light off
      modeLight.setAttribute("style", "fill:#999999; fill-opacity:1;stroke-width:0.883195");
  }
}