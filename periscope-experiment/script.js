var container;
var RADIUS = 120;

document.addEventListener('mousemove', function (event) {
  var x = event.clientX;
  var y = event.clientY;
  container = document.querySelector('.frame');
  var circle = 'circle('+ RADIUS + 'px at ' + x + 'px ' + y + 'px)';
  
  container.style['-webkit-clip-path'] = circle;
  container.style['clip-path'] = circle;
});