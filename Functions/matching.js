/*
Changes the mode to Matching
*/
let mode = 0; // 0=Matching 1=Flashcards
function ModeDropdownStart(){
    let dropdownList = document.getElementById("ModeDropdown");
    modeValue = dropdownList.value;
    if(modeValue == "Flashcards"){
        mode = 1;
        stopTimer();
        setCorrect();
        removeAllChildren();
        makeFlashcardSetup();
    }else if(modeValue == "Matching"){
        mode = 0;
        setCorrect();
        stopTimer();
        removeFlashcardSetup();
        makeButtonDropDown();
        makePreSetup();
        setBestScore();
    }
}
function makeButtonDropDown(){
    const dynamicDiv = document.getElementById("dynamicDiv");
    const div = document.createElement('div');
    div.className = "ButtonDropdown";
    dynamicDiv.appendChild(div);

    const p = document.createElement('p');
    p.textContent = "Choose Number of Buttons";
    div.appendChild(p);
    const selectElement = document.createElement('select');
    selectElement.className = "ButtonDropdown";
    selectElement.setAttribute("id", "ButtonDropdown");
    selectElement.onchange = function ButtonDropdownStart(){
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
    makeDropDownOptions("1", selectElement);
    makeDropDownOptions("5", selectElement);
    makeDropDownOptions("15", selectElement);
    makeDropDownOptions("30", selectElement);
    makeDropDownOptions("44", selectElement);
    div.appendChild(selectElement);

    let BestDiv = document.getElementById("BestDiv");
    const p1 = document.createElement('p');
    p1.className = "Best";
    p1.id = "numOfButtonDisplay";
    p1.textContent = "5 Buttons:";
    BestDiv.appendChild(p1);
    const p2 = document.createElement('p');
    p2.className = "Best";
    p2.id = "bestTimeDisplay";
    p2.textContent = "Best Time: " + localStorage.getItem("5");
    BestDiv.appendChild(p2);
}
function makePreSetup(){
    const click = document.getElementById("leftSide");
    const p = makeP(click);
    p.textContent = 'Click "Start" To Begin';
    p.className = "Instructions";
    p.id = "Instructions";
    makeScoreBoard();
}
function makeDropDownOptions(value, selectElement){
    const optionElement = selectElement.appendChild(document.createElement('option'));
    optionElement.value = value;
    optionElement.textContent = value;
    if(value == "5"){
        optionElement.selected = true;
    }
}
function removeFlashcardSetup(){
    removeAllChildren();
    removeChild("flashcardDiv");
    removeChild("termsDiv");
    removeChild("termsDiv");
}
/*
Combine actions to make the game run
*/
function setUp(){
    //localStorage.setItem("setBestTimes", "temp"); //restart all saved data
    if(localStorage.getItem("setBestTimes") != "The times are set"){
        localStorage.setItem("1", "99:99.99");
        localStorage.setItem("5", "99:99.99");
        localStorage.setItem("15", "99:99.99");
        localStorage.setItem("30", "99:99.99");
        localStorage.setItem("44", "99:99.99");
        localStorage.setItem("setBestTimes", "The times are set");
        localStorage.setItem("background", "totalSegmentWhite");
        const rightSide = document.getElementById("rightSide");
        let p = makeP(rightSide);
        p.className = "firstPlay";
        p.id = "firstPlay";
        p.textContent = "Good Luck & I Hope You Enjoy";
        console.log("Rest Local Storage");
    }else{
        makeScoreBoard();
    }
    setBackground();
}
function makeScoreBoard(){
    let rightSide = document.getElementById("rightSide");
    let beginningScoreBoard = document.createElement('div');
    beginningScoreBoard.className = "beginningScore";
    beginningScoreBoard.id = "beginningScore";
    rightSide.appendChild(beginningScoreBoard);
    setPtext(makeP(beginningScoreBoard),"1");
    setPtext(makeP(beginningScoreBoard),"5");
    setPtext(makeP(beginningScoreBoard),"15");
    setPtext(makeP(beginningScoreBoard),"30");
    setPtext(makeP(beginningScoreBoard),"44");
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
function ButtonDropdownStart(){
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
Elements functionality and creation
*/
//chooses how many buttons
let buttonNum = 5;
function startValues(){
    const dropdownList = document.getElementById('ButtonDropdown');
    return dropdownList.value;
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
    button.onmouseover = function greyMouse(){
        const changeButton = document.getElementById(buttonId);
        let backgroundColor = window.getComputedStyle(changeButton).backgroundColor;
        if(timerOn & backgroundColor != "rgb(144, 238, 144)" & backgroundColor != "rgb(135, 135, 135)"){
            changeButton.style.backgroundColor = "rgb(210,210,210)";
        }
    }
    button.onmouseout = function greyMouse(){
        const changeButton = document.getElementById(buttonId);
        let backgroundColor = window.getComputedStyle(changeButton).backgroundColor;
        if(timerOn & backgroundColor != "rgb(144, 238, 144)" & backgroundColor != "rgb(135, 135, 135)"){
            changeButton.style.backgroundColor = "rgb(253,253,254)";
        }
    }
    button.id = buttonType + index;
    button.style.flexGrow = 1;
    button.style.margin = "10px 10px 10px 10px";
    button.style.backgroundColor = "rgb(253,253,254)";
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
        buttonName.style.backgroundColor = "rgb(135,135,135)";
        return buttonId;
    }else if(greyType == buttonId){
        buttonName.style.backgroundColor = "rgb(253,253,254)";
        return null;
    }else if(greyType != null && greyType != buttonId){
        let currentButton = document.getElementById(greyType);
        currentButton.style.backgroundColor = "rgb(253,253,254)";
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
function removeChildren(){
    removeChild("leftSide");
    removeChild("rightSide");
}
function removeChild(element){
    const elementName = document.getElementById(element);
    while (elementName.firstChild) {
        elementName.removeChild(elementName.firstChild);
    }
}
//Give the title , backgound, start button animations
function changeStartSize(time){
    const startText = document.getElementById("startButton");
    if(time == 'on'){
        startText.style.fontSize = "5vw";
    }else if(time == 'off'){
        startText.style.fontSize = "4vw";
    }
}
function changeColor(time){
    if(time == 'on'){
        const title = document.getElementById("imageText");
        title.className = "imageTextAnimate";
        title.id = "imageTextAnimate";
    }else if(time == 'off'){
        const title = document.getElementById("imageTextAnimate");
        title.className = "imageText";
        title.id = "imageText";
    }
}
function changeBackgound(){
    const backgound = document.getElementById("totalSegmant");
    const topPic = document.getElementById("orienteeringPhoto");
    let currentBackgroundColor = localStorage.getItem("background");
    if(currentBackgroundColor == "totalSegmentBlue"){
        backgound.className = "totalSegmentWhite";
        localStorage.setItem("background", "totalSegmentWhite");
        topPic.style.opacity = 0.8;
    }else{
        backgound.className = "totalSegmentBlue";
        localStorage.setItem("background", "totalSegmentBlue");
        topPic.style.opacity = 0.6;
    }
}
function setBackground(){
    const backgound = document.getElementById("totalSegmant");
    const topPic = document.getElementById("orienteeringPhoto");
    let currentBackgroundColor = localStorage.getItem("background");
    if(currentBackgroundColor == "totalSegmentWhite"){
        backgound.className = "totalSegmentWhite";
        localStorage.setItem("background", "totalSegmentWhite");
        topPic.style.opacity = 0.8;
    }else{
        backgound.className = "totalSegmentBlue";
        localStorage.setItem("background", "totalSegmentBlue");
        topPic.style.opacity = 0.6;
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
            nameButton.style.backgroundColor = "rgb(253,253,254)";
            imageButton.style.backgroundColor = "rgb(253,253,254)";
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
        numOfButtonDisplay.textContent = buttonNum + " Buttons: ";
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
    if(!timerOn && mode == 0){
        makeNewGame();
        timerObject = setInterval("timer()", 10);
        startButton.textContent = "Stop";
        timerOn = true;
    }else if(!timerOn && mode == 1){
        restartTimer();
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
    isImageButtonGrey = null;
    isNameButtonGrey = null;
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
