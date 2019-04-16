let video;
let classifier;

let lastResult;
let timer;

const iframeBaseUrl = "https://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&CatId=&SearchText=";


var wait = ms => new Promise((r, j)=>setTimeout(r, ms)) //quick and dirty "synchronous" delay functrion  https://hackernoon.com/lets-make-a-javascript-wait-function-fa3a2eb88f11

function setup(){
	noCanvas();

	video = createCapture(VIDEO);
	classifier = ml5.imageClassifier('MobileNet', video, modelReady);
}

function modelReady(){
	console.log("our model is ready!");

	classifier.predict(gotResult);
}

function gotResult(err,results){
	if(results){

		

		

		let delayMs = random(1500,4000);
		timer = setTimeout(function(){
			if(results[0].className != lastResult){
			console.log(results);
			select('#result').html(results[0].className);
			
			select('#probability').html(results[0].probability);
			
			document.getElementById("search").src= iframeBaseUrl + results[0].className;
			lastResult = results[0].className;

		}}, delayMs)


		
		
		


	}

	classifier.predict(gotResult);
	
}
