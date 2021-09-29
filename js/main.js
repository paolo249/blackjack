
// betting  (create new buttons and those buttons will have an event listener)
// win logic(separate function) console log add up total and press hit

// 9-29 TROUBLESHOOT UPDATE: 
// buttons -> increase bet by amount  
// render bank roll and bet amount , and add buttons for place (only shows when Bet)


/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const GOAL_COUNT = 21;


const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/
let pHand, cHand, betVal, bankRoll, handStatus, deck;



/*----- cached element references -----*/
const pHandEl = document.querySelector('#pHand');
const cHandEl = document.querySelector('#cHand');
const cValEl = document.getElementById('c-score');
const pValEl = document.getElementById('p-score');
const msgEl = document.getElementById('msg');
const dealBtn = document.getElementById('deal');
const hitBtn = document.getElementById('hit');
const standBtn = document.getElementById('stand');
const oneBtn = document.getElementById('one');
const tenBtn = document.getElementById('ten');
const twentyBtn = document.getElementById('twenty');
const hundredBtn = document.getElementById('hundred');


/*----- event listeners -----*/
dealBtn.addEventListener('click', dealCards);
hitBtn.addEventListener('click', playerHit);
standBtn.addEventListener('click', playerStand);
oneBtn.addEventListener('click', playerBet);
tenBtn.addEventListener('click', playerBet);
twentyBtn.addEventListener('click', playerBet);
hundredBtn.addEventListener('click', playerBet);

/*----- functions -----*/
init();

function init() {
  pHand = [];
  cHand = [];
  bankRoll = 500;
  betVal = 0;
  deck = getNewShuffledDeck();
  render();
}

function render() {
  renderCards();
  pValEl.innerHTML = getHandVal(pHand);
  if (handStatus === null) {
    cValEl.innerHTML = "";
  } else {
    cValEl.innerHTML = getHandVal(cHand);
  }
  renderMsg();
  renderControls();
}

function renderMsg() {
  if (handStatus === 't') {
    msgEl.textContent = "It's a Push!";
  } else if (handStatus === 'pbj') { 
    msgEl.textContent = 'Player Has BlackJack!';
  } else if (handStatus === 'cbj') {
    msgEl.textContent = 'Dealer Has BlackJack!';
  } else if (handStatus === 'p') {
    msgEl.textContent = "Player Wins!";
  } else if (handStatus === 'c') {
    msgEl.textContent = "Dealer Wins!";
  } else if (handStatus === null) {
    msgEl.textContent = "Hit or Stand";
  } else {
    msgEl.textContent = "Welcome, Good Luck!";
  }
}

function renderControls() {
  
  dealBtn.style.visibility = betVal > 0 && handStatus !== null ? "visible" : "hidden";
  standBtn.style.visibility = !handStatus && pHand.length ? "visible" : "hidden";
  hitBtn.style.visibility = !handStatus && pHand.length ? "visible" : "hidden";
}

function renderCards() {
  let html = "";
  cHand.forEach(function (card, idx) {
    if (idx === 0 && handStatus === null) {
      html += `<div class="card back"></div>`;
    } else {
      html = html + `<div class="card ${card.face}"></div>`;
    }
  });
  cHandEl.innerHTML = html;

  html = "";
  pHand.forEach(function (card, idx) {
    html = html + `<div class="card ${card.face}"></div>`;
  })
  pHandEl.innerHTML = html;
}

function playerBet() {
  //if button is clicked add value to betVal
  
  if (oneBtn) {
       betVal += 1;
  } else if (tenBtn) {
       betVal += 10;
  } else if (twentyBtn) {
       betVal += 20;
  } else if (hundredBtn) {
       betVal += 100;
  } 

  render();
}

function playerHit() {
  let card = deck.shift();
  pHand.push(card);
  let pVal = getHandVal(pHand);
  if (pVal > 21) {
    handStatus = 'c';
  }
  render();
}

function playerStand() {
  let pVal = getHandVal(pHand);
  let cVal = getHandVal(cHand);
  while (cVal < 17) {
    let card = deck.shift();
    cHand.push(card);
    cVal = getHandVal(cHand);
  }
  if (cVal > 21) {
    handStatus = 'p';
  } else if (pVal > cVal) {
    handStatus = 'p';
  } else if (pVal < cVal) {
    handStatus = 'c';
  } else {
    handStatus = 't';
  }
  render();
}

function dealCards() {
  pHand = [];
  cHand = [];
  handStatus = null;  //null = hand in progress; 'p' = player wins;
                     // 'c' = comp wins; 'pbj'= player blackjack; 'cbj' = comp blackjack; 't' = tie 
  let card = deck.shift();
  pHand.push(card);
  card = deck.shift();
  pHand.push(card);
  card = deck.shift();
  cHand.push(card);
  card = deck.shift();
  cHand.push(card);
  let pVal = getHandVal(pHand);
  let cVal = getHandVal(cHand);
  if (pVal === 21 && cVal === 21) { 
    handStatus = 't';
  } else if (pVal === 21) {
    handStatus = 'pbj';
  } else if (cVal === 21) {
    handStatus = 'cbj';
  }
  render();
}

function getHandVal(hand) {
  let total = 0; 
  let totalAces = 0;
  hand.forEach(function(card) {
    total += card.value;
    if (card.value === 11) {
      totalAces++;
    }
  });
  while (total > 21 && totalAces > 0) {
    total -= 10; 
    totalAces--;
  }
  return total;
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

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function (suit) {
    ranks.forEach(function (rank) {
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
