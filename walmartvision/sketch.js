let video;
let classifier;

let lastResult;
let timer;

let queries = [];


var wait = ms => new Promise((r, j)=>setTimeout(r, ms)) //quick and dirty "synchronous" delay functrion  https://hackernoon.com/lets-make-a-javascript-wait-function-fa3a2eb88f11

function setup(){
	// noCanvas();
	createCanvas(windowWidth, windowHeight-100);
	background('blue');
	
	video = createCapture(VIDEO, {
    audio: false,
    video: {
      facingMode: {
        ideal: "environment"
      }
    }
  });
	video.elt.setAttribute('playsinline', '');
	video.hide();
	classifier = ml5.imageClassifier('MobileNet', video, modelReady);

	setInterval(function(){
		getProducts();
	}, 5000)
}

function modelReady(){
	console.log("our model is ready!");

	classifier.predict(gotResult);
	getProducts();
}

function gotResult(err,results){
	if(results){

		
		
			if(results[0].className != lastResult){
			//console.log(results);
			//select('#result').html(results[0].className);
			
			//select('#probability').html(results[0].probability);

			if(!queries.includes(results[0].className)){
				queries.push(results[0].className);
				
			}

			

				
			
			
			lastResult = results[0].className;

			

		}

		
		
		


	}

	classifier.predict(gotResult);
	
}

function getProducts(query){
	console.log(queries);
		query = queries[Math.floor(Math.random()*queries.length)]
		console.log(query);
		let url = "/api.php?query="+encodeURIComponent(query);
				console.log('requesting');

				httpGet(url, 'json', false, function(response) {
			    	let item = response.items[0];
			    	
			    	//select('#advertLink').setAttribute('href', item.productUrl)
			    	select('#itemName').html(item.name);
			    	select('#itemPrice').html('$'+item.salePrice);
			    	//select('#itemDesc').html(item.shortDescription)

			    	select('#adpic').html("<img src='"+item.thumbnailImage+"' height='85'>");

			    	select('#buynow').html("<a href='"+item.productUrl+"'><button class='pulse-button'>Buy Now!</button></a>");

			  });
}

const encodeGetParams = p => 
  Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
  //https://stackoverflow.com/questions/8135132/how-to-encode-url-parameters

 function draw() {

 image(video, 0, -100, width, width * video.height / video.width);
 tint('lightskyblue');
 fill('blue');
 rect(0,height-40, width, 40);

 fill(0,0,0,100);
 rect(50, 100, 300, 400);

 let s = 'Consumer Profile \n';
 for(var i=0;i<queries.length;i++){
 	s += queries[i]+"\n";
 }
fill('lightgreen');
textSize(20);
text(s, 110, 110, 250, 350);



  //filter(INVERT);
}