//author: Subhadeep Banerjee
//https://github.com/subhban01



var c = document.getElementById('c');
c.width = 1000;
c.height = 500;
var ctx = c.getContext('2d'),
cw = c.width,
ch = c.height;
//feedback gradient creation
var grd = ctx.createLinearGradient(0, 0, 900, 0);
grd.addColorStop(0, "#ef652d");
grd.addColorStop(0.45, "#e7df8e");
grd.addColorStop(0.5, "#dcd182");
grd.addColorStop(0.75, "#bce695");
grd.addColorStop(1, "#36f5b0");

var textSpacing = 130;
var sliderY = 310;
var sliderStartX = 95, sliderEndX = 893;
var sliderWidth = 798, dotPosition = sliderWidth/6;

var res = document.getElementById('result');
var span = document.getElementById('selection');
res.style.display = 'none';

function init(){
ctx.globalCompositeOperation='source-over';
//bottom footer
ctx.fillStyle = '#000';
ctx.fillRect(0,400, c.width, c.height);
ctx.globalCompositeOperation='destination-over';
ctx.fillStyle = grd;
ctx.fillRect(0,380, c.width, c.height);
	
	//question & background
	ctx.beginPath();
	ctx.fillStyle = '#60696b';
	ctx.fillRect(15,15, 970, 100);

	ctx.globalCompositeOperation='source-over';
    ctx.font = "35px Arial";
	ctx.fillStyle = '#fff';
	ctx.fillText('Are you happy with our customer service?', 180, 75);
	ctx.font = "15px Arial";
	ctx.fillText('Click to rate your experience'.toUpperCase(), 370, 150);
	ctx.closePath();

	//adding feedback options
	var sideBuffer = 65;
	ctx.font = "15px Arial";
	ctx.fillStyle = 'black';
	ctx.fillText("STRONGLY",sideBuffer,250);
	ctx.fillText("DISAGREE",sideBuffer,272);
	ctx.fillText("DISAGREE",textSpacing+sideBuffer,272);
	ctx.fillText("MILDLY",(textSpacing*2)+sideBuffer,250);
	ctx.fillText("DISAGREE",(textSpacing*2)+sideBuffer,272);
	ctx.fillText("NO OPINION",(textSpacing*3)+sideBuffer,272);
	ctx.fillText("MILDLY",(textSpacing*4)+sideBuffer,250);
	ctx.fillText("AGREE",(textSpacing*4)+sideBuffer,272);
	ctx.fillText("AGREE",(textSpacing*5)+sideBuffer,272);
	ctx.fillText("STRONGLY",(textSpacing*6)+sideBuffer,250);
	ctx.fillText("AGREE",(textSpacing*6)+sideBuffer,272);
	//slider bar
	ctx.beginPath();
	ctx.moveTo(sliderStartX, sliderY);
	ctx.lineTo(sliderEndX,sliderY);
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.closePath();

	for(i=0; i<7; i++){
		ctx.beginPath();
		ctx.arc(sliderStartX+dotPosition*i, sliderY, 3, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
	}

	//other waves
function smallerWaves(x,y,x1,y1,x2,y2){
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.globalCompositeOperation='destination-over';
	ctx.quadraticCurveTo(x1, y1, x2, y2);
	ctx.fillStyle = grd;
	ctx.fill();
	ctx.closePath();
}

smallerWaves(0, 400, 0, 320, 500, 400);
smallerWaves(250, 400, 250, 320, 500, 400);
smallerWaves(300, 400, 850, 320, 850, 400);
smallerWaves(500, 400, 950, 300, 1020, 400);


}

init();
//default bezier {x: 490, y: 300}
	ctx.beginPath();
	ctx.moveTo(295, 720);
	ctx.globalCompositeOperation='destination-over';
	ctx.quadraticCurveTo(495,-165, 680, 720);
	ctx.fillStyle = grd;
	ctx.fill();
	ctx.closePath();
//default grabber
	ctx.globalCompositeOperation='source-over';
	ctx.beginPath();
	ctx.arc(sliderStartX+dotPosition*3, sliderY, 20, 0, 2*Math.PI);
	ctx.fillStyle = '#fff';
	ctx.closePath();
	ctx.fill();
//default triangle
	ctx.beginPath();
	var triangleX = sliderStartX+(dotPosition*3)-10;
	var triangleY = sliderY+5;
	ctx.moveTo(triangleX,triangleY);
    ctx.lineTo(triangleX+10,triangleY-15);
    ctx.lineTo(triangleX+20,triangleY);
	ctx.fillStyle = '#000';
	ctx.closePath();
	ctx.fill();


var pitStops = [];
for(i=0; i<7; i++){
	pitStops.push(sliderStartX+dotPosition*i);
	}

//onclick handler
var x, y, startTime;
var matrix = {
	95: {
		text: 'STRONGLY DISAGREE',
		color: '#ee6e35',
		y: 220
	},
	228: {
		text: 'DISAGREE',
		color: '#eba963',
		y: 260
	},
	361: {
		text: 'MILDLY DISAGREE',
		color: '#e7c67b',
		y: 290
	},
	494: {
		text: 'NO OPINION',
		color: '#d6d584',
		y: 320
	},
	627: {
		text: 'MILDLY AGREE',
		color: '#c4e190',
		y: 290
	},
	760: {
		text: 'AGREE',
		color: '#8cec9e',
		y: 260
	},
	893: {
		text: 'STRONGLY AGREE',
		color: '#36f6b0',
		y: 220
	}
}
c.addEventListener('click', function(evt){
	var rect = c.getBoundingClientRect();
	x = evt.clientX - rect.left, y = evt.clientY - rect.top;
	// console.log(x,y);
	var tempX;
	for(i=0; i<7; i++){
		if(i == 0 && x < pitStops[i]+(dotPosition/2) && x >= 0){
			tempX = pitStops[i];
		}
		else if(i == 6 && x <= 1000 && x > pitStops[i]-(dotPosition/2)){
			tempX = pitStops[i];
		}
		else if(x < pitStops[i]+(dotPosition/2) && x > pitStops[i]-(dotPosition/2)){
			tempX = pitStops[i];
		}
	}
	x = tempX;

	window.setTimeout(function(){
	startTime = (new Date()).getTime();
	if(x < grabberPos){
		animate(startTime, true);
	}
	else{
		animate(startTime, false);
	}
	res.style.display = 'flex';
	span.style.backgroundColor = matrix[x].color;
	span.innerText = matrix[x].text;
},500);
})
function drawBeziers(x1){
	if(x1 >= sliderStartX+dotPosition*6){
		x1 = sliderStartX+dotPosition*6;
	}
	else if(x1 <= 80){
		x1 = 80;
	}
	if(y > 317){
		y = 317;
	}

	for(p in matrix){
		if( p <= Math.floor(x1)+70 && p >= Math.ceil(x1)-70){
			y = matrix[p].y;
		}
	}
	ctx.beginPath();
	ctx.moveTo(x1-200, y+420);
	ctx.globalCompositeOperation='destination-over';
	ctx.quadraticCurveTo(x1,y-500, x1+200, y+420);
	ctx.fillStyle = grd;
	ctx.fill();
	ctx.closePath();
}
var grabberPos = (sliderWidth/2) + sliderStartX;
function drawGrabber(x){
	if(x >= sliderStartX+dotPosition*6){
		x = sliderStartX+dotPosition*6;
	}
	else if(x <= 80){
		x = 80;
	}
	//place grubber on selected points. [0-147] interval is 130
	ctx.globalCompositeOperation='source-over';
	ctx.beginPath();
	ctx.arc(x, sliderY, 20, 0, 2*Math.PI);
	ctx.fillStyle = '#fff';
	ctx.closePath();
	ctx.fill();
	//triangle
	ctx.beginPath();
	var triangleX = x-10;
	var triangleY = sliderY+5;
	ctx.moveTo(triangleX,triangleY);
    ctx.lineTo(triangleX+10,triangleY-15);
    ctx.lineTo(triangleX+20,triangleY);
	ctx.fillStyle = '#000';
	ctx.closePath();
	ctx.fill();

	grabberPos = x;
}

var clear = function(){
	ctx.clearRect(0, 0, cw, ch);
	init();
};






window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();

var pitStops = [];
for(i=0; i<7; i++){
	pitStops.push(sliderStartX+dotPosition*i);
	}



var oldX = 475;
var duration = 600;

function animate(t, reverse) {
	var dist = Math.abs(grabberPos - x);
	var time = (new Date()).getTime() - t;
	var linearSpeed = 100;
        var newX = dist*linearSpeed/ duration;
        // console.log(newX);
        var x2 = grabberPos;
        		if(reverse){
        			x2 -= newX;
        		}
        		else{
        			x2 += newX;
        		}
        	if(time >= duration){
					oldX = x2;
			}
        	clear();
        	drawBeziers(x2);
        	drawGrabber(x2);  
        // request new frame
        if(time < duration){
        	requestAnimFrame(function() {
        		animate(startTime, reverse);
        	});
        }
    }





