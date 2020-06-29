const gameContainer = $('#game-container');
const NAME_NOT_MATCH = "Name and image not match";

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
				$('#character').attr('src', './resources/static/image/bravo.gif');
				setTimeout(()=>{
					$('#character').attr('src', './resources/static/image/character.gif');
				}, 3000);
				if (!endOfStage()){
					new Audio('./resources/static/audio/correct.mp3').play();
				}else {
					new Audio('./resources/static/audio/finish-stage.mp3').play();
					setTimeout(() => {
						try{
							clearTheGame();
							openTheGame();
						}catch(err){
							//finish the game
							if (err === OUT_OF_QUEST){
								showFinishScreen();
							}
						}
					}, 300)
				}
			}catch(err){
				if (err === NAME_NOT_MATCH){
					$('#character').attr('src', './resources/static/image/false-ans.gif');
					setTimeout(()=>{
						$('#character').attr('src', './resources/static/image/character.gif');
					}, 3000);
					new Audio('./resources/static/audio/incorrect.mp3').play();
					self.css({margin: previousMargin})
				}
			}
		}
	})
}

function tryToMatch(event, draggedName){
	let card = getTargetImg(event);
	let imgName = extractImageNameFromCard(card);

	let name = getAnimalName(draggedName);

	if (isMatch(name, imgName)) {
		moveNameToCard(draggedName, card);
	} else throw NAME_NOT_MATCH;
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