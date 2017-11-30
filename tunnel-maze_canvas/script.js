var c = document.getElementById('c');
c.width = 800;
c.height = 600;
var ctx = c.getContext('2d'),
cw = c.width,
ch = c.height;

//default values
var color = '#4dc4a8';
var shape = 'circle';
var bgcolor = '#fff';

ctx.fillStyle = bgcolor;
ctx.fillRect(0,0, c.width, c.height);


function drawCircles(x, y){
ctx.beginPath();
ctx.arc(x, y, 40, 0, 2*Math.PI);
ctx.closePath();
ctx.fillStyle = bgcolor;
ctx.fill();
ctx.lineWidth = 1;
ctx.strokeStyle = color;
ctx.stroke();
}

function drawHex(x, y){
	ctx.beginPath();


// var side = 0,
//     size = 40,
//     x = 100,
//     y = 100;

// ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

// for (side; side < 7; side++) {
//   ctx.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
// }

// ctx.strokeStyle = color;
// ctx.stroke();


ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(350,150);
ctx.strokeStyle = color;
ctx.stroke();

}

c.addEventListener('mousemove', function(evt){
	var rect = c.getBoundingClientRect();
	switch(shape){
		case 'circle':
			drawCircles(evt.clientX - rect.left, evt.clientY - rect.top);
			break;
		case 'hexagon':
			drawHex(evt.clientX - rect.left, evt.clientY - rect.top);
			break;
		default:
			drawCircles(evt.clientX - rect.left, evt.clientY - rect.top);
	}
});

var colorpicker = document.getElementById('color');
colorpicker.addEventListener('change', function(){
	color = colorpicker.value;
});

// var shape = document.getElementById('shape');
// shape.addEventListener('click', function(){
// 	shape = 'hexagon';
// });

var bgpicker = document.getElementById('bgcolor');
bgpicker.addEventListener('change', function(){
	bgcolor = bgpicker.value;
	ctx.fillStyle = bgcolor;
	ctx.fillRect(0,0, c.width, c.height);
})









