function getAnimalCards() {
	return animalCards;
}

const gameContainer = $('#game-container');

function addMovingEvent(){
	$('.draggable').mousedown(function startMoving(event){
		const self = $(this);

		let previousMargin = self.css('margin');
		self.css({margin: '0 0'});

		document.addEventListener('mousemove', followCursor);
		document.addEventListener('mouseup', dropDown);

		function followCursor(event){
			let relativeX = event.pageX - gameContainer.offset().left - self.width()/2;
			let relativeY = event.pageY - gameContainer.offset().top - self.height()/2;

			let minX = 0;
			let maxX = gameContainer.outerWidth() - self.width();
			let minY = 0;
			let maxY = gameContainer.outerHeight() - self.height();

			let x = Math.min(Math.max(relativeX, minX), maxX);
			let y = Math.min(Math.max(relativeY, minY), maxY);
			self.css({position: 'absolute', left: x + 'px', top: y + 'px'});
		}

		function dropDown(event){
			document.removeEventListener('mousemove', followCursor);
			document.removeEventListener('mouseup', dropDown);

			self.css({margin: previousMargin, position: '', left: '', top: ''});

			try{
				tryToMatch(event, self[0]);
				self.off('mousedown', startMoving);
			}catch(err){
				
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
	} else throw "Name and image not match";
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