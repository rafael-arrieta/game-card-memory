let displayRandomNumber = document.getElementById("displayRandomNumber");
let buttonGetNumber = document.getElementById("buttonGetNumber");
let cardsContainer = document.getElementById("cardsContainer");
let userLifes = document.getElementById("userLifes");
let winnerFlagDom = document.getElementById("winnerFlagDom");
let userNameInput = document.getElementById("userNameInput");
let gamePanelName = document.getElementById("gamePanelName");
let currentScore = document.getElementById("currentScore");
let lastScore = document.getElementById("lastScore");
let totalScore = document.getElementById("totalScore");
let errorInput = document.getElementById("errorInput");

let firstCardSelected = [-1,-1];
let secondCardSelected = [-1,-1];
let foundCards = [];
let winnerFlag = 0;
let loserFlag = 10;
let userName;
let userCurrentScore = 0;
let userLastScore = 0;
let userTotalScore = 0;

function showCardSelected(element,value){
    element.classList.add("card");
    element.classList.remove("card__reverse");
    element.innerHTML=`
    <img class="visible__none img__card" src="./assets/img${value}.svg" alt="${value}">
    `;
    element.childNodes[1].classList.add("to__visible");
    element.childNodes[1].classList.remove("to__invisible");
}

function hideCards(){
    firstCardSelected[2].classList.add("card");
    firstCardSelected[2].classList.add("card__reverse");
    firstCardSelected[2].childNodes[1].classList.add("to__invisible");
    firstCardSelected[2].childNodes[1].classList.remove("to__visible");
    
    secondCardSelected[2].classList.add("card");
    secondCardSelected[2].classList.add("card__reverse");
    secondCardSelected[2].childNodes[1].classList.add("to__invisible");
    secondCardSelected[2].childNodes[1].classList.remove("to__visible");

    setTimeout(() => {
        firstCardSelected[2].innerHTML=``;
        secondCardSelected[2].innerHTML=``;
    }, 500);
}

function countUserWin() {
    winnerFlag += 1;
    winnerFlagDom.innerText = `${winnerFlag}`;
    userCurrentScore += 200;
    currentScore.innerText = `${userCurrentScore}`
    if(winnerFlag==9){
        userLastScore = userCurrentScore
        userTotalScore += userLastScore
        lastScore.innerText = `${userLastScore}`
        totalScore.innerText = `${userTotalScore}`
        cardsMainFunc()
    }
}

function countUserLifes() {
    if (loserFlag > 0) {
        userLifes.innerText = `${loserFlag}`;
    } else if (loserFlag == 0) {
        userLifes.innerText = `${loserFlag}`;
        cardsMainFunc();
    }
}
function clearCards(){
    setTimeout(() => {
    firstCardSelected = [-1,-1,''];
    secondCardSelected = [-1,-1,''];
    },1000)
}

function evalCardsValues() {
    setTimeout(()=>{
        if(firstCardSelected[0]===secondCardSelected[0]){
            foundCards.push(firstCardSelected[0]);
            countUserWin();
            clearCards();
        }else{
            loserFlag -= 1;
            countUserLifes();
            clearCards();
            hideCards()
        }
    },1500)
}

function cardButtonListener (arr,i,element) {
    // function params: array, index position and HTML element
    if(foundCards.includes(arr[i])!== true) {
        if(firstCardSelected[0]===-1&&secondCardSelected[0]===-1){ //true
            firstCardSelected = [arr[i],i,element]
            showCardSelected(element,arr[i]) // show the card selected

        }else if(firstCardSelected[0]!==-1&&secondCardSelected[0]===-1){
            secondCardSelected = [arr[i],i,element]
            if(firstCardSelected[1]!==secondCardSelected[1]){ //descarta que sea la misma carta
                showCardSelected(element,arr[i])  // show the card selected
                //llamar a la funcion que evalua los dos casos y que ponga en -1 a los array 
                evalCardsValues()
            }else if(firstCardSelected[1]===secondCardSelected[1]){ //si es la misma carta la borra del array
                secondCardSelected = [-1,-1,'']
            }
        }
    }
}

// - 8
function createCardButons(arr) {
    const cardArrayButtons = document.querySelectorAll("[data-card]");
    for(let i = 0; i < cardArrayButtons.length; i++){
        cardArrayButtons[i].addEventListener("click", ()=>{
            cardButtonListener(arr, i,cardArrayButtons[i]);
        });
    }
}

// - 7
function createDomElements(arr) {
    cardsContainer.classList.add("cards__container--grid");
    cardsContainer.innerHTML = ``;
    arr.forEach(el => {
        cardsContainer.innerHTML += `
            <div data-card class="card__reverse"></div>`;
    });
    //<img class="visible__none img__card" src="./assets/img${el}.svg" alt="${el}">
}

// - 6
function changeToEvenNumber(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 != 0) {
            arr[i] -= 1;
        }
    }
    return arr;
}

// - 5
function createRandomArray() {
    let arr = [];
    let number;
    while (arr.length <= 17) {
        number = Math.floor(Math.random() * 100);
        if (number <= 17) {
            if (arr.includes(number) !== true) {
                arr.push(number);
            }
        }
    }
    return arr;
}

// - 4
function resetValues() {
    setTimeout(()=>{
        firstCardSelected = [-1,-1];
        secondCardSelected = [-1,-1];
        winnerFlag = 0;
        loserFlag = 10;
        userCurrentScore=0
        foundCards = [];
        currentScore.innerHTML = userCurrentScore
        userLifes.innerText = `${loserFlag}`;
        winnerFlagDom.innerText = `${winnerFlag}`;
    },1500)
}

// - 3
function cardsMainFunc(){
    resetValues();//4
    buttonGetNumber.innerText = `Reset`;
    let arr = createRandomArray();//5
    arr=changeToEvenNumber(arr);//6
    createDomElements(arr);//7
    createCardButons(arr); //8
}

// - 2
function getUser() {
    userName = userNameInput.value.substring(0,10);
    if ( userName!==''&& userName.includes(String.fromCharCode(32))!==true){
        gamePanelName.innerHTML = `<h1>${userName}</h1>`;
            cardsMainFunc()//3
    } else {
        errorInput.classList.remove('display__none');
    }
}
// - 1
buttonGetNumber.addEventListener("click", () => {
    getUser(); //2
});
