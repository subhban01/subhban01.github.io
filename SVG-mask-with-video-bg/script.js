var hero = document.getElementById('hero');
var textInput = document.getElementById('text');

textInput.addEventListener('input', function(){
	hero.innerHTML = textInput.value;
})

var music = document.getElementById('music');
var bg_vid = document.getElementById('bg_vid');
music.addEventListener('click', function(){
	if(bg_vid.muted){
		bg_vid.muted = false;
		music.setAttribute('class', 'enabled');
	}
	else{
		bg_vid.muted = true;
		music.setAttribute('class', 'disabled');
	}
})
