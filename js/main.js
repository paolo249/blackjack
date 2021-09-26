/*----- constants -----*/
// when it comes time to transfer the app's state to the DOM,
// you can visualize the state anyway you want, e.g., a value of 1 is "rendered" 
// with a certain image, etc.
const cardLookup = {
1: {imgPath: 'img/clubs/clubs-A.svg'},
2: {imgPath: 'img/clubs/clubs-J.svg'}
}

/*----- app's state (variables) -----*/
let scoreVal, winner, betVal;

/*----- cached element references -----*/
const pCardEl = document.getElementById('p-card');
const cCardEl = document.getElementById('c-card');

/*----- event listeners -----*/

/*----- functions -----*/
//
init()

function init(){
//Chip bet    
// Cards
cardResults ={
    p: 1,
    c: 2
};
// 
//winner = 't';

render();   
}
// Transfer (Update) all state in the DOM
// render()

function render(){ 
pCardEl.src = cardLookup[cardResults.p].imgPath;
pCardEl.style.borderColor = 'black';
cCardEl.src = cardLookup[cardResults.c].imgPath;
cCardEl.style.borderColor = 'black';
}
// Update all impacted state, then call render
// handleBag() 
// function handleBag(evt){






// }
