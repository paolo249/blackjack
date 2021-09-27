/*----- constants -----*/
// when it comes time to transfer the app's state to the DOM,
// you can visualize the state anyway you want, e.g., a value of 1 is "rendered" 
// with a certain image, etc.
const cardLookup = {
1: {imgPath: 'img/clubs/clubs-A.svg', imgPath: 'img/diamonds/diamonds-A.svg'}
}

/*----- app's state (variables) -----*/
let scoreVal, winner, betVal;

/*----- cached element references -----*/
const pCardEl = document.getElementById('p-card');

/*----- event listeners -----*/

/*----- functions -----*/
//
// init()
function init(){

//Chip bet    

// Cards
cardResults ={
    p: 1
};
// 
winner = 'p';


render();   
}
// Transfer (Update) all state in the DOM
// render()
function render(){ 
pCardEl.src = cardLookup[cardResults.p].imgPath;
pCardEl.style.borderColor = 'black';
}
// Update all impacted state, then call render
// handleBag() 
//
