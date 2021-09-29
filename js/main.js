
// betting  (create new buttons and those buttons will have an event listener)
// win logic(separate function) console log add up total and press hit


// 9-29 TROUBLESHOOT UPDATE: How to access pHandTemp value and turn into integer 

// forEach - adding up all the values (coding challenge)



/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const GOAL_COUNT = 21;


// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
// renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));
// renderNewShuffledDeck(shuffledDeck, document.getElementById('shuffle-deck-container'));

/*----- app's state (variables) -----*/
let pHand, cHand, betVal, bankRoll, winner, deck, goalMet;
let pVal = 0;
let cVal = 0;


/*----- cached element references -----*/
 const pHandEl = document.querySelector('#pHand');
 const cHandEl = document.querySelector('#cHand');
 const msgEl = document.querySelector('h2');

//const shuffledContainer = document.getElementById('shuffled-deck-container');

/*----- event listeners -----*/
document.querySelector('#deal').addEventListener('click', dealCards);
document.querySelector('#hit').addEventListener('click', playerHit);

/*----- functions -----*/
  init();

 function init(){
     
     goalMet = '';
     pHand =[];
     cHand =[]; 
     winner = null;
     
     bankRoll = 500;
     betVal = 0;

     deck = getNewShuffledDeck();
     render();


 }

 
 function render() {
          let tempVal = 0;
          let cHandTemp = "";
       


          cHand.forEach(function(card,idx){ 
           if(idx === 0){
                cHandTemp += `<div class = "card back" ${card.value} > </div>`;
               
               }
               else {
                    //cHandTemp += `<div class = "card ${card.face}"> </div>`;
                    cHandTemp = cHandTemp + `<div class = "card ${card.face} "> </div>`;
               
               } 
               
           })
          cHandEl.innerHTML = cHandTemp;
          
          
          
          let pHandTemp = "";
          pHand.forEach(function(card,idx){
               // pHandTemp += `<div class = "card ${card.face}"> </div>`;
               
               pHandTemp = pHandTemp + `<div class = "card ${card.face} ${card.value}"> </div>`;
               
              //ask chris or jim if this is how to access the value of the card
               tempVal = tempVal + pHand[idx].value;
          })
          pHandEl.innerHTML = pHandTemp;

         
          
          //msgEl.textContent = goalMet ? `Winner!` : '';
          // if(winner = true){
          //   msgEl.textContent = 'Winner!';
          // }
          // else if(winner = false){
          //      msgEl.textContent = 'Loser';
          // }
          // if(msgEl.textContent = goalMet){
          //      return 'Winner';
          // }
          // else return 'Loser';
          
          
          
 } 
     
     
     
// Deal Cards Functions //
function playerHit(){
          let pCard = deck.shift();  // take card from top of pile
          pHand.push(pCard);  // adds into player's hand
          //call check for winner fxn
          render(); 
          
          
 }
     
function dealCards() {
          //assign two cards to dealer and to player
          
          let pCard = deck.shift();  // take card from top of pile
          pHand.push(pCard);  // adds into player's hand
          
          let pCard2 = deck.shift();
          pHand.push(pCard2);
          
          let cCard = deck.shift();
          cHand.push(cCard);
          
          let cCard2 = deck.shift();
          cHand.push(cCard2);
          //call check for Winner fxn
          render();
 }
     
     

// Winning Function //
     
function winningHand(){
          
     
     if(pVal === GOAL_COUNT){    
          return winner = true;
         }
     else
         return winner = false;
 
     
          // pHand.forEach(function(card){
          //      //access card's value and sum
          //      winner = winner + card.value;

             
          // })
          
          // cHand.forEach(function(card){
          //      //access card's value and sum
          //      winner = winner + card.value;
          // })
               
           
          
         
           
           //goalMet = winner === 21 ? winner : '';
           render();
       
              
          
          
          
          
          //      if(pHand[0].value === 21){
               //          winner = pHand; 
               //       } 
               //      else if(pHand[0].value < 21 || cHand[0].value < 21){
                    //           pHand = pHand.push();
                    //      } 
                    //      else{
                         //           winner = cHand;
                         //         }
                         
                         //       return winner;
 }
                    
                    
                    
// Build Deck Functions //
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
                
  
function buildMasterDeck() {
                         const deck = [];
                         // Use nested forEach to generate card objects
                         suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10) //
      });
    });
  });
  return deck;
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


//renderNewShuffledDeck();
//separate 
//string with divs 
//iterating thru state arrays
//rendering if dealer rendering back card. turnaries work great there