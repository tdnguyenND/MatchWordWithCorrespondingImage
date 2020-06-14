animalCards = [ [{
  "name" : "con trâu",
  "image" : "buffalo.png"
}, {
  "name" : "con cừu",
  "image" : "sheep.png"
}, {
  "name" : "con mèo",
  "image" : "cat.png"
}, {
  "name" : "con cá sấu",
  "image" : "crocodile.png"
}, {
  "name" : "con bò sữa",
  "image" : "dairy-cow.png"
}],[{
  "name" : "con rùa",
  "image" : "turtle.png"
}, {
  "name" : "con lạc đà",
  "image" : "camel.png"
}, {
  "name" : "con chuột",
  "image" : "mouse.png"
}, {
  "name" : "con thỏ",
  "image" : "rabbit.png"
}, {
  "name" : "con tê giác",
  "image" : "rhino.png"
}],[{
  "name" : "con chó",
  "image" : "dog.png"
}, {
  "name" : "con lừa",
  "image" : "donkey.png"
}, {
  "name" : "con hà mã",
  "image" : "hippo.png"
}, {
  "name" : "con sư tử",
  "image" : "lion.png"
}, {
  "name" : "con khỉ",
  "image" : "monkey.png"
}] ]

let count = 0;
let currentCardSet;

const OUT_OF_QUEST = "Out of pictures";

function getAnimalCards() {
  if (count >= animalCards.length) throw OUT_OF_QUEST;
  currentCardSet = animalCards[count];
  count++;
  return currentCardSet;
}


function isMatch(name, image) {
  let result = false;
  for (card of currentCardSet){
    if (card['name'] === name && card['image'] === image) {
      result = true;
      break;
    }
  }
  return result;
}