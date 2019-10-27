//i wanted to create a simple soundboard
//my iterations-

//started with one single button that played a sound
//then added two more
// then styled with css
//added spectrum analyzer using fft object in p5

//declare vars
var bassSound;
var kick;
var hat;
var snare;
let fft;
//load sounds
function preload() {
  bassSound = loadSound('https://cspublic.z13.web.core.windows.net/level-4-resources/audio/synth-bass.mp3');
  hatSound = loadSound('https://cspublic.z13.web.core.windows.net/level-4-resources/audio/triangle.mp3');
  snareSound = loadSound('https://cspublic.z13.web.core.windows.net/level-4-resources/audio/snare.mp3');
}

function setup() {

  //create buttons and assign callback funcs to play sounds

  createCanvas(500, 500);
  kick = createButton('kick').position(10, 200).style('font-family', 'COURIER');
  hat = createButton('hat').position(200, 200).style('font-family', 'COURIER');
  snare = createButton('snare').position(380, 200).style('font-family', 'COURIER');

  kick.mousePressed(function() {
    bassSound.play();
  });


  hat.mousePressed(function() {
    hatSound.play();
  });

  snare.mousePressed(function() {
    snareSound.play();
  });

  fft = new p5.FFT();
}

function draw() {
  background('orange');
  textSize(32);
  
  //create spectrum and make a shape
  let spectrum = fft.analyze();
  beginShape();
  vertex(0, height);
  
  //map fft analyze vales to width of canvas 
  for (i = 0; i < spectrum.length; i++) {
    vertex(map(log(i), 0, log(spectrum.length), 0, width), map(spectrum[i], 0, 255, height, 0));
  }
  vertex(width, height);
  endShape();
  text('Simple sound board', 10, 30);
}