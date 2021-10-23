/* 
August 2019 - Doug Whitton--Start
play 3 analog sensors that output sound and circle graphic
The Arduino file that's running is "threeSensorExample"
*/

//Modified by Christian Gomes- October 22 2021--Start

let serial;
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas
let splitter;
//diameter=0 is the parameters of the shape the value number 
//The value number of the x,y,z is lower than 1 so it wont draw if the parmeter is lower then 1 also the value reset to the parameters original number after its updated.
//+100 *100 is the size of the shape multipled or added try different equations for different results.
let diameter0 = 1, diameter1 = 2, diameter2 = 3;

//Modified by Christian Gomes- October 22 2021--End

function setup() {
  
  createCanvas(windowWidth, windowHeight);

///////////////////////////////////////////////////////////////////
    //Begin serialport library methods, this is using callbacks
///////////////////////////////////////////////////////////////////    
    

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();
  console.log("serial.list()   ", serial.list());

  //////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("COM3");
 /////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////
  // Here are the callbacks that you can register

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);

  
    
//Sourced from:https://p5js.org/reference/#/p5/rectMode--Start
//Modified By: Christian Gomes Oct 20th,2021--Strat

rectMode(RADIUS);    
  fill(255,0,0);
    noStroke();
    
    //Modified By: Christian Gomes Oct 20th,2021--End
//Sourced from:https://p5js.org/reference/#/p5/rectMode--End
  
}
////////////////////////////////////////////////////////////////////////////
// End serialport callbacks
///////////////////////////////////////////////////////////////////////////


osc1 = new p5.TriOsc(); // set frequency and type
osc2 = new p5.TriOsc(); // set frequency and type
osc3 = new p5.TriOsc(); // set frequency and type


fft = new p5.FFT();
osc1.start();
osc2.start(); 
osc3.start();

// We are connected and ready to go
function serverConnected() {
  console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  console.log("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  console.log("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  console.log(theerror);
}



// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log("currentString  ", currentString);             // println the string
  latestData = currentString;            // save it for the draw method
  console.log("latestData" + latestData);   //check to see if data is coming in
  splitter = split(latestData, ',');       // split each number using the comma as a delimiter
  //console.log("splitter[0]" + splitter[0]); 
  diameter0 = splitter[0];                 //put the first sensor's data into a variable
  diameter1 = splitter[1];
  diameter2 = splitter[2]; 



}

// We got raw data from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}



function draw() {

 background(255,255,255);
  text(latestData,10,10);
    
//Sourced from:https://p5js.org/reference/#/p5/rectMode--Start
//Modified By: Christian Gomes Oct 20th,2021--Start
 
rectMode(RADIUS);    
  fill(255,0,0);
    noStroke();
  
  
//console.log("diameter0  "  + diameter0);
 
rect(100, 100, diameter0+20, diameter0+20);
rectMode(RADIUS);    
 fill(0,255,255);
    
 rect(100, 100, diameter1*40, diameter1*40);   
 rectMode(RADIUS);
 fill(0,255,255);
 
rect(100, 100, diameter2+60, diameter2+60);
rectMode(RADIUS);    
 fill(0,255,255);
}
 
//Modified By: Christian Gomes Oct 20th,2021--End
//Sourced from:https://p5js.org/reference/#/p5/rectMode--End

function mouseClicked(){
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    console.log("getAudioContext().state" + getAudioContext().state);
  }
  };
/* 
August 2019 - Doug Whitton--End
play 3 analog sensors that output sound and circle graphic
The Arduino file that's running is "threeSensorExample"
*/
 