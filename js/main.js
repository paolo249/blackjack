// Notes:
/*
Troubleshoot Notes: 
//** Main Problem - line 139: handleBag fxn, trying to update render
// Mainly testing at this point line 128 to see if it comes out. 
// Problem is all about getting suites from cardLookup function; 
// Need to randomize the suites
// using index in random generator in order to retrieve value in key-value
//line 156: changing string into value ->(key-value) in order to read values in line 16  
//line 112: Not going to use object, not necessary


*/



/*----- constants -----*/
// when it comes time to transfer the app's state to the DOM,
// you can visualize the state anyway you want, e.g., a value of 1 is "rendered" 
// with a certain image, etc.
const cardLookup = {
 0 : {imgPath:  {b: 'img/backs/blue.svg',
                 r: 'img/backs/red.svg'},
      value: 0,          
      },
 1 : {imgPath:  {c: 'img/clubs/clubs-A.svg',
                 d: 'img/diamonds/diamonds-A.svg',
                 h: 'img/hearts/hearts-A.svg'},
      value: 1,  
      },
 2 : {imgPath:  {c: 'img/clubs/clubs-r02.svg',
                 d: 'img/diamonds/diamonds-r02.svg',
                 h: 'img/hearts/hearts-r02.svg'}, 
      value: 2,
      },
 3 : {imgPath:  {c: 'img/clubs/clubs-r03.svg',
                 d: 'img/diamonds/diamonds-r03.svg',
                 h: 'img/hearts/hearts-r03.svg'}, 
      value: 3,
      },
 4 : {imgPath:  {c: 'img/clubs/clubs-r04.svg',
                 d: 'img/diamonds/diamonds-r04.svg',
                 h: 'img/hearts/hearts-r04.svg'}, 
      value: 4,
      },
 5 : {imgPath:  {c: 'img/clubs/clubs-r05.svg',
                 d: 'img/diamonds/diamonds-r05.svg',
                 h: 'img/hearts/hearts-r05.svg'}, 
      value: 5,
      },
 6 : {imgPath:  {c: 'img/clubs/clubs-r06.svg',
                 d: 'img/diamonds/diamonds-r06.svg',
                 h: 'img/hearts/hearts-r06.svg'}, 
      value: 6,
      },
 7 : {imgPath:  {c: 'img/clubs/clubs-r07.svg',
                 d: 'img/diamonds/diamonds-r07.svg',
                 h: 'img/hearts/hearts-r08.svg'},
      value: 7,
      },
 8 : {imgPath:  {c: 'img/clubs/clubs-r08.svg',
                 d: 'img/diamonds/diamonds-r08.svg',
                 h: 'img/hearts/hearts-r08.svg'}, 
      value: 8,
      },
 9 : {imgPath:  {c: 'img/clubs/clubs-r09.svg',
                 d: 'img/diamonds/diamonds-r09.svg',
                 h: 'img/hearts/hearts-r09.svg'}, 
      value: 9,
      },
10 : { k :     {imgPath:   {c: 'img/clubs/clubs-K.svg',
                            d: 'img/diamonds/diamonds-K.svg',
                            h: 'img/hearts/hearts-K.svg'},
                value: 10,
                   },                     
       q :     {imgPath:   {c: 'img/clubs/clubs-Q.svg',
                            d: 'img/diamonds/diamonds-Q.svg',
                            h: 'img/hearts/hearts-Q.svg'},      
                value: 10,
                   },
       j :     {imgPath:   {c: 'img/clubs/clubs-J.svg',
                            d: 'img/diamonds/diamonds-J.svg',
                            h: 'img/hearts/hearts-J.svg'},     
                value: 10, 
                   },
       },
    
    };

// // let sum; 
// // sum = cardLookup[10].k.value + cardLookup[2].value;
// // console.log(sum);
            

/*----- app's state (variables) -----*/
let scoreVal, winner, betVal;

// /*----- cached element references -----*/
// const pCardEl = document.getElementById('p-card');
// const cCardEl = document.getElementById('c-card');
// const cCardEl2 = document.getElementById('c-card2');

/*----- event listeners -----*/
//document.querySelector('main').addEventListener('click', handleBag);
 
/*----- functions -----*/
init();
function init(){
     //Chip bet    
     // Cards
  cardResults = {
        p:  10,
        c:  1,
       c2:  0
       };
   cardSuit = {
         c : 'c',
         d : 'd',
         h : 'h'
       };
   //winner = 't';
      //render();   
      
}

// // Transfer (Update) all state in the DOM
render()
function render() { 
cCardEl.src = cardLookup[cardResults.c].imgPath.c;
//cCardEl.src = getRandomCard().randInd();

cCardEl.style.borderColor =  'black';
cCardEl2.src = cardLookup[cardResults.c2].imgPath.b;
cCardEl2.style.borderColor = 'black';

pCardEl.src = cardLookup[cardResults.p].q.imgPath.c;
pCardEl.style.borderColor =  'black';
}


// // Update all impacted state, then call render
// // handleBag() 
function handleBag(evt){
    cardResults.p = evt.target.textContent.toLowerCase();
    cardResults.c = getRandomCard();
    cardLookup[cardResults.c];
    render();
}

function getRandomCard(){

    const idx = Math.floor(Math.random()*10);
     let randCard = cardLookup[idx].imgPath;
    //let randCard = cardLookup[idx].value;
    //console.log(idx);
   // consols.log(cardLookup[idx].value);
    return randCard;
}

 //Troubleshoot Notes: changing string into value ->(key-value)  
 // Testing lines 162-165 in order to retrieve random suite
//    const randArr = ['c','d','h'];
//    const idx = Math.floor(Math.random()*2); 
//    const randSuit = randArr[idx];
//    console.log(randSuit);
   

