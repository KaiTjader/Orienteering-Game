/*
Changes the mode to Matching
*/
function makeFlashcardSetup(){
    makeFlashcard();
    makeArrowButtons();
    setFlashcard();
    makeInstructions();
    makeTerms();
}
function removeAllChildren(){
    removeChild("dynamicDiv");
    removeChildren();
    removeChild("BestDiv");
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
    let BestDiv = document.getElementById("BestDiv");
    while (BestDiv.firstChild) {
        BestDiv.removeChild(BestDiv.firstChild);
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
        notSleep = true;
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
function makeInstructions(){
    let BestDiv = document.getElementById("BestDiv");
    const p = document.createElement('p');
    p.className = "Best";
    p.id = "Instructions";
    p.textContent = 'Press "Start" to time yourself.';
    BestDiv.appendChild(p);
}
function makeTerms(){
    let termsDiv = document.getElementById("termsDiv");
    let wordsList = setWords();
    let imageList = setImages();
    for (let i = 0; i < wordsList.length; i++) {
        makeOneTerm(termsDiv, wordsList[i], imageList[i]);
      }
}
function makeOneTerm(termsDiv, wordName, imageName){
    const div = document.createElement('div');
    div.className = "term";
    div.id = "term";
    termsDiv.appendChild(div);
    const p = document.createElement('p');
    p.className = "termText";
    p.id = "termText";
    p.textContent = wordName + "  ";
    div.appendChild(p);
    const img = document.createElement('img');
    img.className = "termImage";
    img.id = "termImage";
    img.src = "buttonImages/" + imageName + ".png";
    div.appendChild(img);
}
//funciontality
let imageArray = setImages();
let nameArray = setWords();
let index = 0;
let isImage = true;
let notSleep = true;
async function setFlashcard(){
    const h2 = document.getElementById("h2Flashcard");
    if(!notSleep){
        await sleep(250);
    }else{
        notSleep = false;
    }
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

// Make jelly score for terms:
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if(entry.isIntersecting) {
            entry.target.classList.add('scroll');
        }else{
            entry.target.classList.remove('scroll');
        }
    });
});

const hiddenElements = document.querySelectorAll('term');
hiddenElements.forEach((el) => observer.observe(el));