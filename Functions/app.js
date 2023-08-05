/*
Combine actions to make the game run
*/
function setUp(){
    //localStorage.setItem("setBestTimes", "temp"); //restart game
    if(localStorage.getItem("setBestTimes") != "The times are set"){
        localStorage.setItem("setBestTimes", "The times are set");
        localStorage.setItem("1", "99:99.99");
        localStorage.setItem("5", "99:99.99");
        localStorage.setItem("15", "99:99.99");
        localStorage.setItem("30", "99:99.99");
        localStorage.setItem("44", "99:99.99");
        beginningDisplay = document.getElementById("beginningScore");
        p = makeP(beginningDisplay);
        p.textContent = "Good Luck & I Hope You Enjoy";
        console.log("Rest Local Storage");
    }else{
        let beginningScoreBoard = document.getElementById("beginningScore");
        setPtext(makeP(beginningScoreBoard),"1");
        setPtext(makeP(beginningScoreBoard),"5");
        setPtext(makeP(beginningScoreBoard),"15");
        setPtext(makeP(beginningScoreBoard),"30");
        setPtext(makeP(beginningScoreBoard),"44");
    }
}
function setPtext(p,num){
    let plural = 's: ';
    if(num == 1){
        plural = ': ';
    }
    if(localStorage.getItem(num) == "99:99.99"){
        p.textContent = num + " Button" + plural + "N/A";
    }else{
        p.textContent = num + " Button" + plural + localStorage.getItem(num);
    }
}
function makeP(parent){
    let p = document.createElement('p');
    parent.appendChild(p);
    return p
}
function makeNewGame(){
    removeChildren("image");
    removeChildren("name");
    buttonNum = startValues();
    addButtons("image");
    addButtons("name");
    addWordsAndImages();

    restartTimer();
    setCorrect();
}
function dropdownStart(){
    removeChildren("name");
    removeChildren("image");
    isImageButtonGrey = null;
    isNameButtonGrey = null;
    buttonNum = startValues();
    addButtons("name");
    addButtons("image");
    stopTimer();

    setBestScore();
    restartTimer();
    setCorrect();
}

/*
Button functionality and creation
*/
//chooses how many buttons
let buttonNum = 15;
function startValues(){
    let dropdownList = document.getElementById("dropdown");
    return dropdownList.value
}
// Makes the button
let isNameButtonGrey = null;
let isImageButtonGrey = null;
function makeButton(buttonType, index){
    let buttonId = buttonType + index;
    const button = document.createElement('button');
    button.textContent = '';
    button.onclick = function greyOut(){
        if(timerOn){
            let changeButton = document.getElementById(buttonId);
            if(buttonType == "name"){
                isNameButtonGrey = modifyButton(isNameButtonGrey, changeButton, buttonType + index);
                checkAnswers();
            }else if(buttonType == "image"){
                isImageButtonGrey = modifyButton(isImageButtonGrey, changeButton, buttonType + index);
                checkAnswers();
            }
        }
    }
    button.id = buttonType + index;
    button.style.flexGrow = 1;
    button.style.margin = "10px 10px 10px 10px";
    let div;
    if(buttonType == "name"){
        button.className = "nameButtons";
        div = document.getElementById("rightSide");
    }else if(buttonType == "image"){
        button.className = "imageButtons";
        div = document.getElementById("leftSide");
        const image = new Image();
        image.className = "buttonImage";
        button.appendChild(image);
    }
    div.appendChild(button);
}
// If the button gets clicked
function modifyButton(greyType, buttonName, buttonId){
    if(greyType == null){
        buttonName.style.backgroundColor = "rgb(169,169,169)";
        return buttonId;
    }else if(greyType == buttonId){
        buttonName.style.backgroundColor = "white";
        return null;
    }else if(greyType != null && greyType != buttonId){
        let currentButton = document.getElementById(greyType);
        currentButton.style.backgroundColor = "white";
        buttonName.style.backgroundColor = "rgb(169,169,169)";
        return buttonId;
    }
}
// makes buttons from start
function addButtons(type){
    for (let i = 0; i < buttonNum; i++) {
        makeButton(type, i);
    }
}
//let gameOne = true;
function removeChildren(type){
    const imageParent = document.getElementById("leftSide");
    while (imageParent.firstChild) {
        imageParent.removeChild(imageParent.firstChild);
    }
    const nameParent = document.getElementById("rightSide");
    while (nameParent.firstChild) {
        nameParent.removeChild(nameParent.firstChild);
    }
}

/*
Check if choosen are correct
*/
async function checkAnswers() {
    if(isImageButtonGrey != null && isNameButtonGrey != null){
        let nameButton = document.getElementById(isNameButtonGrey);
        let nameText = nameButton.textContent;
        setWords();
        wordIndex = words.indexOf(nameText);
        let imageButton = document.getElementById(isImageButtonGrey);
        let image = imageButton.children[0];
        let imageText = image.src.split('/').pop();
        
        setImages();
        for(let i=0;i<imageText.length;i++){
            let findImage = imageText.charAt(i);
            if(findImage == 'i'){
                imageText = imageText.substring(i, imageText.length-4);
                break;
            }
          }
        imageIndex = images.indexOf(imageText);

        if(wordIndex == imageIndex){
            correctChange();
            nameButton.style.backgroundColor = "lightgreen";
            imageButton.style.backgroundColor = "lightgreen";
            await sleep(100);
            nameButton.disabled = true;
            imageButton.disabled = true;
        }else{
            nameButton.style.backgroundColor = "red";
            imageButton.style.backgroundColor = "red";
            await sleep(100);
            nameButton.style.backgroundColor = "white";
            imageButton.style.backgroundColor = "white";
        }
        isNameButtonGrey = null;
        isImageButtonGrey = null;
    }
}

/*
Randomize where the choices will be
*/
let words = [];
let images = [];

function changeWord(place, newArray){
    button = document.getElementById("name" + place);
    button.textContent = newArray[place];
}
function changeImage(place, newArray){
    button = document.getElementById("image" + place);
    image = button.children[0];
    image.src = "buttonImages/" + newArray[place] + ".png";
}
function setImages(){
    images = ["image0", "image1","image2", "image3","image4", "image5","image6", "image7","image8", "image9","image10", "image11","image12", "image13","image14", "image15",
    "image16", "image17","image18", "image19","image20", "image21","image22", "image23","image24", "image25","image26", "image27","image28","image29", "image30", "image31", 
    "image32", "image33", "image34","image35", "image36", "image37", "image38","image39", "image40","image41", "image42", "image43"];
    return images;
}
function setWords(){
    words = ["Contour line", "Special man-made feature", "Fodder rack", "Cairn", "Erosion gully", "Open land and scattered trees", "Ruin", "Building", "Earth bank",
    "Earth Wall", "Knoll", "Small depression", "Pit", "Cliff", "Rock face", "Rocky pit", "Boulder", "Boulder field", "Boulder cluster", "Open sandy ground", "Lake",
    "Waterhole", "Watercourse", "Marsh", "Well", "Spring", "Special water feature", "Open land", "Forest: difficult to run", "Undergrowth: difficult to run", "Orchard",
    "Vineyard", "Cultivated land", "Distinct vegetation boundary", "Special vegetation features", "Paved road", "Road", "Path", "Crossable stone wall",
    "Uncrossable stone wall", "Crossable fence", "Uncrossable fence", "Isolated tree", "Small tower"];
    return words;
}
function shuffle(array) {
    let array2 = [];
    let arrayLength = array.length;
    for(let i=0; i< arrayLength; i++){
        let j = Math.floor(Math.random() * (array.length - 1));
        array2.push(array[j]);
        array.splice(j,1);
    }
    array2 = array2.slice(0, buttonNum);
    return array2;
}
function addWordsAndImages(){
    words = setWords();
    let newArrayName = shuffle(words);
    for (let i = 0; i < newArrayName.length; i++) {
        changeWord(i, newArrayName);
    }
    images = setImages();
    words = setWords();
    let cutImages = [];
    for (let i=0;i<newArrayName.length;i++) {
        index = words.indexOf(newArrayName[i]);
        cutImages.push(images[index]);
    }
    images = cutImages;
    let newArrayImages = shuffle(images);
    for (let i = 0; i < newArrayImages.length; i++) {
        changeImage(i, newArrayImages);
    }
}

/*
Functions at the end of game
*/
let correct = 0;
function setCorrect(){
    const scoreText = document.getElementById("score");
    correct = 0;
    scoreText.textContent = "0%";
}
function correctChange(){
    const scoreText = document.getElementById("score");
    correct++;
    scoreText.textContent = Math.round((correct / buttonNum)*100) + "%";
    if (correct == buttonNum){
        startTimer();
        resetBestScore();
        scoreText.textContent = "100%";
    }
}
let newTime;
let oldTime;
function setBestScore(){
    const numOfButtonDisplay = document.getElementById("numOfButtonDisplay");
    if(buttonNum != 1){
        numOfButtonDisplay.textContent = buttonNum + " Buttons:";
    }else{
        numOfButtonDisplay.textContent = "1 Button:";
    }
    var bestTimeDisplay= document.getElementById("bestTimeDisplay");
    if(localStorage.getItem(buttonNum + "") == "99:99.99"){
        bestTimeDisplay.textContent = "Best Time: 0:00.00";
    }else{
        bestTimeDisplay.textContent = "Best Time: " + localStorage.getItem(buttonNum + "");
    }
}
function resetBestScore(){
    oldTime = findBestTime(localStorage.getItem(buttonNum + ""));
    const clockText = document.getElementById("clock").textContent;
    newTime = findBestTime(clockText);
    if(newTime < oldTime){
        localStorage.setItem(buttonNum + "", clockText);
    }
    var bestTimeDisplay= document.getElementById("bestTimeDisplay"); 
    bestTimeDisplay.textContent = "Best Time: " + localStorage.getItem(buttonNum + "");
}
function findBestTime(time){
    let newString = ""
    for (let i = 0; i < time.length; i++) {
        let char = time.charAt(i);
        if(char != ':' && char != '.'){
            newString += char;
        }
    }
    return parseInt(newString);
}

/*
Makes the clock run
*/
let timerOn = false;
let timerObject;
let time = [];
let min = 0;
let sec = 0;
let milSec = 0;
function startTimer(){
    const startButton = document.querySelector('.startButton');
    if(!timerOn){
        makeNewGame();
        gameOne = false;
        timerObject = setInterval("timer()", 10);
        startButton.textContent = "Stop";
        timerOn = true;
    }else{
        stopTimer();
    }
}
function stopTimer(){
    const startButton = document.querySelector('.startButton');
    startButton.textContent = "Start";
    clearInterval(timerObject);
    timerOn = false;
}
function timer(){
    time = add();
    const clock = document.querySelector('.clock');
    clock.textContent = time[0] + ":" + time[1] + "." + time[2];
}
function add(){
    milSec++;
    if(milSec >= 100){
        milSec = 0;
        sec++;
        if(sec >= 60){
            sec = 0;
            min++;
            if(min >= 60){
                makeNewGame();
            }
        }
    }
    milSec = addZero(milSec);
    sec = addZero(sec);
    return [min, sec.substring(sec.length-2, sec.length + 1), milSec];
}
function addZero(time){
    if(time < 10){
        return "0" + time;
    }else{
        return "" + time;
    }
}
function restartTimer(){
    min = 0;
    sec = 0;
    milSec = 0;
    const clock = document.querySelector('.clock');
    clock.textContent = "0:00.00";
}

/*
Helpful Functions
*/
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
