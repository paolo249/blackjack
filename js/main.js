
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
const fiveBtn = document.getElementById('five');
const twentyfiveBtn = document.getElementById('twentyfive');
const hundredBtn = document.getElementById('hundred');
const betEl = document.getElementById('bet');
const bankEl = document.getElementById('bankRoll');
const betPlayer = new Audio('audio/Blastwave_FX_SlotMachineInsert_SFXB.3999.mp3');
const swipeCard = new Audio('audio/zapsplat_leisure_playing_card_turn_over_on_table_001_10410.mp3');
const winning = new Audio('audio/zapsplat_multimedia_game_tone_bright_sparkle_award_star_003_43982.mp3');
const losing = new Audio('audio/zapsplat_multimedia_game_sound_fantasy_hit_injure_shot_lose_life_negative_73639.mp3');



/*----- event listeners -----*/
dealBtn.addEventListener('click', dealCards);
hitBtn.addEventListener('click', playerHit);
standBtn.addEventListener('click', playerStand);
oneBtn.addEventListener('click', playerBet);
fiveBtn.addEventListener('click', playerBet);
twentyfiveBtn.addEventListener('click', playerBet);
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
  renderBetting();
}

function renderMsg() {
  if (handStatus === 't') {
    losing.play();
    msgEl.textContent = "It's a Push!";
  } else if (handStatus === 'pbj') { 
    winning.play();
    msgEl.textContent = 'Player Has BlackJack!';
  } else if (handStatus === 'cbj') {
    losing.play();
    msgEl.textContent = 'Dealer Has BlackJack!';
  } else if (handStatus === 'p') {
    winning.play();
    msgEl.textContent = "Player Wins!";
  } else if (handStatus === 'c') {
    losing.play();
    msgEl.textContent = "Dealer Wins!";
  } else if (handStatus === null) {
    losing.play();
    msgEl.textContent = "Hit or Stand";
  } 
}

function renderControls() {
  dealBtn.style.display = betVal > 0 && handStatus !== null ? "inline-block" : "none";
  standBtn.style.display = !handStatus && pHand.length ? "inline-block" : "none";
  hitBtn.style.display = !handStatus && pHand.length ? "inline-block" : "none";
  oneBtn.style.display = handStatus !== null ? "inline-block" : "none";
  fiveBtn.style.display = handStatus !== null ? "inline-block" : "none";
  twentyfiveBtn.style.display = handStatus !== null ? "inline-block" : "none";
  hundredBtn.style.display = handStatus !== null ? "inline-block" : "none";
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
  });

  pHandEl.innerHTML = html;
}

function renderBetting() {
  betEl.innerHTML = `Bet: $${betVal}`; 
  bankEl.innerHTML = `Bankroll: $${bankRoll}`;
}

function playerBet(evt) {
  const bet = parseInt(evt.target.textContent);
  if (bankRoll < bet) return;
  betPlayer.play();
  bankRoll -= bet;
  betVal += bet;
  render();
}

function playerHit() {
  let card = deck.shift();
  pHand.push(card);
  swipeCard.play();
  let pVal = getHandVal(pHand);
  if (pVal > 21) {
    handStatus = 'c';
    betVal = 0;
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
    bankRoll += betVal * 2;
    betVal = 0;
  } else if (pVal > cVal) {
    handStatus = 'p';
    bankRoll += betVal * 2;
    betVal = 0;
  } else if (pVal < cVal) {
    handStatus = 'c';
    betVal = 0;
  } else {
    handStatus = 't';
    bankRoll += betVal;
    betVal = 0;
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
    bankRoll += betVal;
    betVal = 0;
  } else if (pVal === 21) {
    handStatus = 'pbj';
    bankRoll += betVal + betVal * 1.5;
    betVal = 0;
  } else if (cVal === 21) {
    handStatus = 'cbj';
    betVal = 0;
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
