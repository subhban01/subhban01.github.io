var c = document.getElementById('c');
c.width = 1000;
c.height = 500;
var ctx = c.getContext('2d'),
cw = c.width,
ch = c.height;



// ctx.fillStyle = 'grey';
// ctx.fillRect(0,0, c.width, c.height);


//feedback gradient creation
var grd = ctx.createLinearGradient(0, 0, 900, 0);
grd.addColorStop(0, "#ef652d");
grd.addColorStop(0.45, "#e7df8e");
grd.addColorStop(0.5, "#dcd182");
grd.addColorStop(0.75, "#bce695");
grd.addColorStop(1, "#36f5b0");


//bottom footer
ctx.fillStyle = '#000';
ctx.fillRect(0,400, c.width, c.height);


	//adding feedback options
	var textSpacing = 920/7;
	var sideBuffer = 50;
	ctx.font = "15px Arial";
  	ctx.fillStyle = 'black';
	ctx.fillText("STRONGLY",sideBuffer,250);
	ctx.fillText("DISAGREE",sideBuffer,272);
	ctx.fillText("DISAGREE",textSpacing+sideBuffer,250);
	ctx.fillText("MILDLY",(textSpacing*2)+sideBuffer,250);
	ctx.fillText("DISAGREE",(textSpacing*2)+sideBuffer,272);
	ctx.fillText("NO OPINION",(textSpacing*3)+sideBuffer,250);
	ctx.fillText("MILDLY",(textSpacing*4)+sideBuffer,250);
	ctx.fillText("AGREE",(textSpacing*4)+sideBuffer,272);
	ctx.fillText("AGREE",(textSpacing*5)+sideBuffer,250);
	ctx.fillText("STRONGLY",(textSpacing*6)+sideBuffer,250);
	ctx.fillText("AGREE",(textSpacing*6)+sideBuffer,272);



	//slider bar
	var sliderY = 310;
	ctx.moveTo(sideBuffer+30, sliderY);
	ctx.lineTo(920-50,sliderY);
	ctx.lineWidth = 2;
	ctx.stroke();

	for(i=0; i<7; i++){
		ctx.beginPath();
		ctx.arc((textSpacing*i)+80, sliderY, 3, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
	}


	//grab on
	ctx.beginPath();
	ctx.arc((textSpacing*3.5)+30, sliderY, 20, 0, 2*Math.PI);
	ctx.fillStyle = '#fff';
	ctx.closePath();
	ctx.fill();


//onclick handler
c.addEventListener('click', function(evt){
	var rect = c.getBoundingClientRect();
	x = evt.clientX - rect.left, y = evt.clientY - rect.top;

	// console.log(x,y);
	ctx.moveTo(x-200, y+420);
	ctx.quadraticCurveTo(x,y-500, x+200, y+420);
	ctx.globalCompositeOperation='destination-over';
	ctx.fillStyle = grd;
  	ctx.fill();

})



window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

var clear = function(){
  ctx.clearRect(0, 0, cw, ch);
  x++; y++;
};













