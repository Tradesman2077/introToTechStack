let theNoise; //noise object
let playButton, stopButton, chooseNoise, setVolume, toggleOnOff; //dom objects
let fft;

function setup() {
  createCanvas(400, 200);
  theNoise = new p5.Noise();
  theNoise.amp(0);
  fft = new p5.FFT();


  //create buttons
  toggleOnOff = createButton('play').position(10, 10).style('font-family', 'COURIER');
  chooseNoise = createSelect("Noise selecter").position(60, 10).style('font-family', 'COURIER');
  chooseNoise.option("white");
  chooseNoise.option("pink");
  chooseNoise.option("brown");
  chooseNoise.changed(function() {
    theNoise.setType(chooseNoise.value())
    fill(chooseNoise.value());
  });

  toggleOnOff.mousePressed(function() {
    if (theNoise.started == true) {
      theNoise.stop()
      toggleOnOff.html('play');
    } else {
      theNoise.start()
      toggleOnOff.html('stop');
    }
  });

  setVolume = createSlider(-60, 0, -60, 1).position(140, 10);
  setVolume.input(function() {
    if (setVolume.value() > -56){
    //convert to decibels
    theNoise.amp(pow(10, setVolume.value()/20), 0.01)}
    else{theNoise.amp(map(setVolume.value(), -60, -56, 0, 0.0016), 0.1)}
  });

  stroke(255);
}
//draw the spectrum
function draw() {

  background(80);
  let spectrum = fft.analyze();
  beginShape();
  vertex(0, height);
  for (i = 0; i < spectrum.length; i++) {
    vertex(map(log(i), 0, log(spectrum.length),0, width), map(spectrum[i], 0, 255, height, 0));
  }
  vertex(width, height);
  endShape();
}

function touchStarted(){
  
  if(getAudioContext().state !== "running"){
    getAudioContext().resume();
  }
}