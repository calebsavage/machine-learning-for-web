const checkpoint = 'https://storage.googleapis.com/tm-pro-a6966.appspot.com/caleb2/model.json';
const maxPredictions = 2;

let model;
let video;
let framesSinceOwnerLastSeen=0;
let maxFramesSinceOwnerLastSeen = 100;

// A function that loads the model
async function load() {
  model = await tm.mobilenet.load(checkpoint);
}

async function setup() {
  // Call the load function, wait util it finishes loading
  await load();

  // Get videos from webcam
  video = createCapture(VIDEO);
  video.size(200, 150);
  

  createCanvas(displayWidth, 10);
  


  fill("white");
  //this will be our progress bar-- a visual countdown of the time left until the screen locks
  
  

  // Make a prediction on video
  predictVideo(video.elt);
}


async function predictVideo(image) {

  const prediction = await model.predict(image, maxPredictions);
  //console.log('prediction: ', prediction)

  // Show the result
  const res = select('#res'); // select <span id="res">
  res.html(prediction[0].className);

  // Show the probability
  const prob = select('#prob'); // select <span id="prob">
  prob.html(prediction[0].probability);

  const accessGrantedClass = 0;


  let diff = maxFramesSinceOwnerLastSeen - framesSinceOwnerLastSeen;
  let progressWidth = map(diff,0,maxFramesSinceOwnerLastSeen,0,displayWidth)
  background("white");

  if(prediction[0].probability > 0.9 && prediction[0].className == accessGrantedClass){
    select("#blocker").hide();
    select("body").removeClass('blur');
    framesSinceOwnerLastSeen = 0;

    const res = select('#res'); // select <span id="res">
      res.html("Caleb Detected!");

    fill("white");
  }else{
    res.html("Caleb Not Detected-- Counting down to locking the screen!");
	 if(framesSinceOwnerLastSeen > maxFramesSinceOwnerLastSeen){
    select("#blocker").show();
    select("body").addClass('blur');
  
   }
    
    framesSinceOwnerLastSeen += 1;
    
  
    fill("red");
    rect(0,0,progressWidth,10);
  }

  



  

  
  // Continue to predict the video
  predictVideo(video.elt);
}