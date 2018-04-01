const max = 6;
const min = 1;
var currentPos = 0;
var prev = -1;
const delay = 2000;
const ladderMap = {
	4: 14,
	9: 31,
	20: 38,
	28: 84,
	40: 59,
	51: 67,
	63: 81,
	71: 91
}
const snakesMap = {
	17: 7,
	54: 34,
	62: 19,
	64: 60,
	87: 24,
	93: 73,
	95: 75,
	99: 78
}

snakeBoxes = Object.keys(snakesMap);
ladderBoxes = Object.keys(ladderMap);



//creating the boxes
var markup = '';
for (var i = 1; i <= 100; i++) {
	markup += '<div class="box">' + i + '</div>';
}
$('.snlContainer').append(markup);




//display Snakes table
var markup = '';
for (var i = 0; i < snakeBoxes.length; i++) {
	markup += '<div class="snake-row"><div>' + snakeBoxes[i] + '</div><div>' + snakesMap[snakeBoxes[i]] + '</div> </div>';
}
$('.snake-table').append(markup);



//display Ladder table
var markup = '';
for (var i = 0; i < ladderBoxes.length; i++) {
	markup += '<div class="ladder-row"><div>' + ladderBoxes[i] + '</div><div>' + ladderMap[ladderBoxes[i]] + '</div> </div>';
}
$('.ladder-table').append(markup);



//initializing snake & ladder boxes
for(var i in snakeBoxes){
	$('.box')[parseInt(snakeBoxes[i])-1].classList.add('danger');
}
for(var i in ladderBoxes){
	$('.box')[parseInt(ladderBoxes[i])-1].classList.add('ladder');
}



function rollDice(){
	return Math.ceil(Math.random()*(max-min+1));
}

function play(){
	$('.box').removeClass('selected');
	// $('.roll').hide();
	$('.roll').attr('onclick','').unbind('click');
	$('.roll').text('please wait...');
	$('.roll').css('opacity', '0.5');

	var currentRoll = rollDice();
	$('.display').text('You rolled ').append('<span>' + currentRoll + '</span>');
	// $('.display').show();
	$(".display").css({ opacity: 1 });
	setTimeout(function(){
		// $('.display').fadeOut(delay);
		$(".display").animate({ opacity: 0 });
		if(currentPos == 100)
			alert('You Won!! Buy a prize for yourself ;)');
	}, delay-300);

	if(currentPos+currentRoll <= 100)
		currentPos+=currentRoll;

	if(ladderMap[currentPos]){
		animate(currentPos, ladderMap[currentPos], 'green');
	}

	if(snakesMap[currentPos]){
		animate(currentPos, snakesMap[currentPos], 'red');
		// currentPos = snakesMap[currentPos];
	}

	$('.stats div:nth-child(1)').text('Previous position: '+ (prev+1));
	$('.stats div:nth-child(2)').text('Current roll: '+ currentRoll);
	$('.stats div:nth-child(3)').text('Current position: '+ currentPos);

	element = document.getElementsByClassName('box')[currentPos-1];
		// console.log('roll', currentRoll, 'currentPos', currentPos);
		element.classList.add("selected");

		prevE = document.getElementsByClassName('box')[prev];
		if(prevE && prev !== currentPos-1)
			prevE.classList.remove("selected");
		prev = currentPos-1;

	setTimeout(function(){
		$('.roll').css('opacity', '1');
		$('.roll').text('ROLL DICE');
		$('.roll').on('click', play);
	},delay);
}


function animate(current, final, type){
	// console.log('rrrr',current,final);
	var diff = Math.abs(final - current);
	if(type == 'green'){
		var intervalID = setInterval(function(){
			diff--;
			if(diff < 0)
				clearInterval(intervalID);
			$('.box')[current-2].classList.remove('selected');
			$('.box')[current-1].classList.add('selected');
			current++;
			currentPos = current-1;
		}, 200);
		
		// currentPos = ladderMap[currentPos];
	}
	else if(type == 'red'){
		var intervalID = setInterval(function(){
			diff--;
			if(diff < 0)
				clearInterval(intervalID);
			$('.box')[current].classList.remove('selected');
			$('.box')[current-1].classList.add('selected');
			current--;
			currentPos = current+1;
		}, 200);
	}
}




