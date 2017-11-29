var c = document.getElementById('c');
c.width = 800;
c.height = 600;
var ctx = c.getContext('2d'),
cw = c.width,
ch = c.height;


// #4dc4a8

ctx.fillStyle = '#fff';
ctx.fillRect(0,0, c.width, c.height);


function drawCircles(x, y){
ctx.beginPath();
ctx.arc(x, y, 40, 0, 2*Math.PI);
ctx.closePath();
ctx.fillStyle = '#fff';
ctx.fill();
ctx.lineWidth = 1;
ctx.stroke();
}

c.addEventListener('mousemove', function(evt){
	drawCircles(evt.clientX, evt.clientY);
});