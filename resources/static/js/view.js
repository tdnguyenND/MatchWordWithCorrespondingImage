const IMG_SOURCE = "./resources/static/image/";
const imgContainer = $('#images-container')[0];
const namesContainer = $('#names-container')[0];

function openTheGame(){
	let cards = getAnimalCards();

	let imgs = cards.map(card => card['image']);
	let names = cards.map(card => card['name']);

	renderImages(imgs);
	renderNames(names);
	addMovingEvent();
}

function renderImages(imgs){
	imgs.forEach(img=>{
		let element = createAnimalImageElement(img);
		imgContainer.appendChild(element);
	})
}

function createAnimalImageElement(imgPath){
	let element = document.createElement('div');
	element.classList.add('single-image-container');

	let animalImage = document.createElement('div');
	animalImage.classList.add('animal-image');
	animalImage.style.backgroundImage = "url(" + IMG_SOURCE + imgPath + ")";

	let nameArea = document.createElement('div');
	nameArea.classList.add('animal-name-area');

	let nameContainer = document.createElement('div')
	nameContainer.classList.add('animal-name-container')

	nameArea.appendChild(nameContainer);

	element.appendChild(animalImage);
	element.appendChild(nameArea);

	return element;
}

function renderNames(names){
	while (names.length > 0){
		let name = popRandom(names);
		renderSingleName(name);
	}
}

function popRandom(names){
	let randomIndex = Math.floor(Math.random() * names.length);
	return names.splice(randomIndex, 1);
}

function renderSingleName(name){
	let nameElement = createSingleNameElement(name);
	namesContainer.appendChild(nameElement);
}

function createSingleNameElement(name){
	let element = document.createElement('span');
	element.classList.add('animal-name');
	element.classList.add('draggable');
	element.innerHTML = name;
	return element;
}

function clearTheGame(){
	imgContainer.innerHTML = '';
	namesContainer.innerHTML = '';
}

openTheGame();
document.getElementById('theme-song').volume = 0.05;
document.getElementById('theme-song').play();