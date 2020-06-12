animalCards = [ {
  "name" : "ngựa vằn",
  "image" : "zebra.png"
}, {
  "name" : "hươu cao cổ",
  "image" : "giraffe.png"
}, {
  "name" : "voi",
  "image" : "elephant.png"
}, {
  "name" : "hổ",
  "image" : "tiger.png"
}, {
  "name" : "sư tử",
  "image" : "lion.png"
} ]

function isMatch(name, image) {
  let result = false;
  for (card of animalCards){
    if (card['name'] === name && card['image'] === image) {
      result = true;
      break;
    }
  }
  return result;
}