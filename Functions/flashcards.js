/*
Changes the mode to Matching
*/
function removeAllChildren(){
    const dynamicDiv = document.getElementById("dynamicDiv");
    while (dynamicDiv.firstChild) {
        dynamicDiv.removeChild(dynamicDiv.firstChild);
    }
    const imageParent = document.getElementById("leftSide");
    while (imageParent.firstChild) {
        imageParent.removeChild(imageParent.firstChild);
    }
    const nameParent = document.getElementById("rightSide");
    while (nameParent.firstChild) {
        nameParent.removeChild(nameParent.firstChild);
    }
}  
function makeFlashcard(){
    const flashcardDiv = document.getElementById("flashcardDiv");
    const flashcardButton = document.createElement('button');
    flashcardDiv.appendChild(flashcardButton);
    flashcardButton.className = "flashcardButtonFlipped";
    flashcardButton.id = "flashcardButton";
    flashcardButton.onclick = function flipCard() {
        isImage = !isImage;
        setFlashcard();
        if(isImage){
            flashcardButton.className = "flashcardButtonFlipped";
        }else{
            flashcardButton.className = "flashcardButton";
        }
    };
    let front = document.createElement('div');
    front.className = "front";
    front.id = "front";
    flashcardButton.appendChild(front);
    let h2 = document.createElement('h2');
    h2.className = "h2Flashcard";
    h2.id = "h2Flashcard";
    front.appendChild(h2);
    let back = document.createElement('div');
    back.className = "back";
    back.id = "back";
    flashcardButton.appendChild(back);
    const image = document.createElement('image');
    back.appendChild(image);
    image.className = "imageFlashcard";
    image.id = "imageFlashcard";
}
function makeArrowButtons(){
    const dynamicDiv = document.getElementById("dynamicDiv");
    const backButton = document.createElement('button');
    backButton.className = "arrowButtons";
    backButton.onclick = function flashcardBackward() {
    nextCard(0, -1);
    };
    const i1 = document.createElement('i');
    i1.className = "arrow left";
    backButton.appendChild(i1);
    const forwardButton = document.createElement('button');
    forwardButton.className = "arrowButtons";
    forwardButton.onclick = function flashcardForward() {
    nextCard(43, 1);
    };
    const i2 = document.createElement('i');
    i2.className = "arrow right";
    forwardButton.appendChild(i2);
    dynamicDiv.appendChild(backButton);
    dynamicDiv.appendChild(forwardButton);
}
function nextCard(border, change){
    if(index != border){
        index += change;
        isImage = true;
        try {
            const image = document.getElementById("imageFlashcard");
            image.remove();
          }catch (e) {
            // catches if there was no image
        }
        const flashcardButton = document.getElementById("flashcardButton");
        flashcardButton.className = "flashcardButtonFlipped";
        setFlashcard();
    }
}
let imageArray = setImages();
let nameArray = setWords();
let index = 0;
let isImage = true;
function setFlashcard(){
    const h2 = document.getElementById("h2Flashcard");
    if(!isImage){
        try {
            const image = document.getElementById("imageFlashcard");
            image.remove();
          }catch (e) {
            // catches if there was no image
          }
        h2.textContent = nameArray[index];
    }else{
        try {
            const image = document.getElementById("imageFlashcard");
            image.remove();
          }catch (e) {
            // catches if there was no image
          }
        const backDiv = document.getElementById("back");
        let image = document.createElement('img');
        image.src = "buttonImages/" + imageArray[index] + ".png";
        image.className = "imageFlashcard";
        image.id = "imageFlashcard";
        backDiv.appendChild(image);
        h2.textContent = "";
    }
    setPercentage();
}
//funcitonality of percentage
function setPercentage(){
    const scoreText = document.getElementById("score");
    scoreText.textContent = index+1 + "/44";
}