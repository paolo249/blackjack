/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
// renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));
// renderNewShuffledDeck(shuffledDeck, document.getElementById('shuffle-deck-container'));

/*----- app's state (variables) -----*/
let pDeck, pDeck2, cDeck, cDeck2, pHand, pHand2, cHand, cHand2, betVal;
//let scoreVal, winner, betVal;

/*----- cached element references -----*/
let pHandEl = document.querySelector('#pHand');
let pHandEl2 = document.querySelector('#pHand2');
let cHandEl = document.querySelector('#cHand');
let cHandEl2 = document.querySelector('#cHand2');

//const shuffledContainer = document.getElementById('shuffled-deck-container');

/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', handleDeck);

/*----- functions -----*/
init();
 function init(){
     let shufDeck = getNewShuffledDeck();
     let shufDeck2 = getNewShuffledDeck();
     //grab first two cards from the shuffled deck
      pDeck = shufDeck.splice(0,26);
      pDeck2 = shufDeck;
     cDeck = shufDeck2.splice(0,26);
     cDeck2 = shufDeck2;
     pHand =[];
     cHand =[];    
     pHand2 =[];
     cHand2 =[];   
     render();
 }

function winningHand(){
     if(pHand[0].value === cHand[0].value){
         winner = 't'; 
     } else if(pHand[0].value >cHand[0].value){
          winner = pHand;
     } else{
          winner = cHand;
     }
}


 function handleDeck() {
    // shift() removes first element from an array and returns that removed element.
    // changes length of array
   let pCard = pDeck.shift();
   pHand.unshift(pCard);

   let pCard2 = pDeck2.shift();
   pHand2.unshift(pCard2);

   let cCard = cDeck.shift();
   cHand.unshift(cCard);

   let cCard2 = cDeck2.shift();
   cHand2.unshift(cCard2);
   render();
 }

 function render() {
    if(pHand.length > 0 && cHand.length > 0) {
    let pHandtemp = `<div class = "card ${pHand[0].face}"> </div>`;
     pHandEl.innerHTML = pHandtemp;

    let pHandtemp2 = `<div class = "card ${pHand2[0].face}"> </div>`;
    pHandEl2.innerHTML = pHandtemp2;

    let cHandtemp = `<div class = "card ${cHand[0].face}"> </div>`;
    cHandEl.innerHTML = cHandtemp;

    let cHandtemp2 = `<div class = "card ${cHand2[0].face}"> </div>`;
    cHandEl2.innerHTML = cHandtemp2;
     }

     

 }



function getNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  // access event.listener and then use event listener
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

// function renderNewShuffledDeck() {
//   // Create a copy of the masterDeck (leave masterDeck untouched!)
//   shuffledDeck = getNewShuffledDeck();
//   renderDeckInContainer(shuffledDeck, shuffledContainer);
// }

// function renderDeckInContainer(deck, container) {
//   container.innerHTML = '';
//   // Let's build the cards as a string of HTML
//   let cardsHtml = '';
//   deck.forEach(function(card) {
//     cardsHtml += `<div class="card ${card.face}"></div>`;
//   });
//   // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
//   // const cardsHtml = deck.reduce(function(html, card) {
//   //   return html + `<div class="card ${card.face}"></div>`;
//   // }, '');
//   container.innerHTML = cardsHtml;
// }

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 1) //obj square lookup  q'11 a'14
      });
    });
  });
  return deck;
}

//renderNewShuffledDeck();
//separate 
//string with divs 
//iterating thru state arrays
//rendering if dealer rendering back card. turnaries work great there