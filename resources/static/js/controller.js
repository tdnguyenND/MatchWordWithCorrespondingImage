const gameContainer = $('#game-container');
const NAME_NOT_MATCH = "Name and image not match";
const AUDIO_SOURCE = './resources/static/audio/';

function addMovingEvent(){
	$('.draggable').mousedown(function startMoving(event){
		const self = $(this);

		let previousMargin = self.css('margin');
		self.css({margin: '0 0'});

		document.addEventListener('mousemove', followCursor);
		document.addEventListener('mouseup', dropDown);

		function followCursor(event){
			let x = event.pageX - self.width()/2;
			let y = event.pageY - self.height()/2;
			self.css({position: 'absolute', left: x + 'px', top: y + 'px'});
		}

		function dropDown(event){
			document.removeEventListener('mousemove', followCursor);
			document.removeEventListener('mouseup', dropDown);

			self.css({position: '', left: '', top: ''});

			try{
				tryToMatch(event, self[0]);
				self.off('mousedown', startMoving);
				characterAnimate(true);
				if (!endOfStage()){
					playAudio('correct');
				}else {
					showFinishStageEffect();
					setTimeout(() => {
						try{
							loadNextStage();
						}catch(err){
							//finish the game
							if (err === OUT_OF_QUEST){
								showFinishGameEffect();
							}
						}
					}, 2000)
				}
			}catch(err){
				if (err === NAME_NOT_MATCH){
					characterAnimate(false);
					playAudio('incorrect');
					self.css({margin: previousMargin})
				}
			}
		}
	})
}

function loadNextStage() {
	clearTheGame();
	openTheGame();
}

function tryToMatch(event, draggedName){
	let card = getTargetImg(event);
	let imgName = extractImageNameFromCard(card);

	let name = getAnimalName(draggedName);

	if (isMatch(name, imgName)) {
		moveNameToCard(draggedName, card);
	} else throw NAME_NOT_MATCH;
}

function showFinishStageEffect(){
	playAudio('finish-stage');
}

function showFinishGameEffect(){
	showFinishScreen();
	playAudio('finish-game');
}

function getTargetImg(event){
	let imgs = Array.from($('.single-image-container'));
	let x = event.x;
	let y = event.y;
	for (let card of imgs){
		let img = card.getElementsByClassName('animal-image')[0];
		let rect = img.getBoundingClientRect();
		if (x > rect.left && x < rect.right && y > rect.y && y < rect.bottom){
			return card;
		}
	}
}

function extractImageNameFromCard(card){
	let image = card.getElementsByClassName('animal-image')[0];
	return getImageNameFromLink(image.style.backgroundImage);
}

function getImageNameFromLink(link){
	return link.slice(link.lastIndexOf('/') - link.length + 1, -2);
}

function getAnimalName(dragElement){
	return dragElement.innerHTML;
}

function moveNameToCard(name, card){
	name.style.margin = '0 0';
	card.getElementsByClassName('animal-name-container')[0].appendChild(name);
}

function endOfStage(){
	return !$('.names-drag .animal-name').length;
}

function playAudio(name){
	new Audio(AUDIO_SOURCE + name + '.mp3').play();
}