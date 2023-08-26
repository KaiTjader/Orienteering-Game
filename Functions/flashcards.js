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
    flashcardButton.className = "flashcardButton";
    flashcardButton.id = "flashcardButton";
    flashcardButton.onclick = function flipCard() {
        isName = !isName;
        setFlashcard();
    };
    let h2 = document.createElement('h2');
    h2.className = "h2Flashcard";
    h2.id = "h2Flashcard";
    flashcardButton.appendChild(h2);
    const image = document.createElement('image');
    flashcardButton.appendChild(image);
    image.className = "imageFlashcard";
    image.id = "imageFlashcard";
}
function makeArrowButtons(){
    const dynamicDiv = document.getElementById("dynamicDiv");
    const backButton = document.createElement('button');
    backButton.className = "arrowButtons";
    backButton.onclick = function flashcardBackward() {
        if(index != 0){
            index -= 1;
            isName = true;
            setFlashcard();
        }
    };
    const i1 = document.createElement('i');
    i1.className = "arrow left";
    backButton.appendChild(i1);
    const forwardButton = document.createElement('button');
    forwardButton.className = "arrowButtons";
    forwardButton.onclick = function flashcardForward() {
        if(index != 43){
            index += 1;
            isName = true;
            setFlashcard();
        }
    };
    const i2 = document.createElement('i');
    i2.className = "arrow right";
    forwardButton.appendChild(i2);
    dynamicDiv.appendChild(backButton);
    dynamicDiv.appendChild(forwardButton);
}
let imageArray = setImages();
let nameArray = setWords();
let index = 0;
let isName = true;
function setFlashcard(){
    const h2 = document.getElementById("h2Flashcard");
    if(isName){
        //remove image here
        try {
            const image = document.getElementById("imageFlashcard");
            image.remove();
          }catch (e) {
            // catches if there was no image
          }
        h2.textContent = nameArray[index];
    }else{
        //make image here
        const flashcardButton = document.getElementById("flashcardButton");
        let image = document.createElement('img');
        image.src = "buttonImages/" + imageArray[index] + ".png";
        image.className = "imageFlashcard";
        image.id = "imageFlashcard";
        flashcardButton.appendChild(image);
        h2.textContent = "";
    }
}