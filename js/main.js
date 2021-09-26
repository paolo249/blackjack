/*----- constants -----*/
// when it comes time to transfer the app's state to the DOM,
// you can visualize the state anyway you want, e.g., a value of 1 is "rendered" 
// with a certain image, etc.
const cardLookup = {
 1 : {imgPath:  {c: 'img/clubs/clubs-A.svg',
                 d: 'img/diamonds/diamonds-A.svg',
                 h: 'img/hearts/hearts-A.svg'} 
      },
 2 : {imgPath:  {c: 'img/clubs/clubs-r02.svg',
                 d: 'img/diamonds/diamonds-r02.svg',
                 h: 'img/hearts/hearts-r02.svg'} 
      },
 3 : {imgPath:  {c: 'img/clubs/clubs-r03.svg',
                 d: 'img/diamonds/diamonds-r03.svg',
                 h: 'img/hearts/hearts-r03.svg'} 
      },
 4 : {imgPath:  {c: 'img/clubs/clubs-r04.svg',
                 d: 'img/diamonds/diamonds-r04.svg',
                 h: 'img/hearts/hearts-r04.svg'} 
      },
 5 : {imgPath:  {c: 'img/clubs/clubs-r05.svg',
                 d: 'img/diamonds/diamonds-r05.svg',
                 h: 'img/hearts/hearts-r05.svg'} 
      },
 6 : {imgPath:  {c: 'img/clubs/clubs-r06.svg',
                 d: 'img/diamonds/diamonds-r06.svg',
                 h: 'img/hearts/hearts-r06.svg'} 
      },
 7 : {imgPath:  {c: 'img/clubs/clubs-r07.svg',
                 d: 'img/diamonds/diamonds-r07.svg',
                 h: 'img/hearts/hearts-r08.svg'} 
      },
 8 : {imgPath:  {c: 'img/clubs/clubs-r08.svg',
                 d: 'img/diamonds/diamonds-r08.svg',
                 h: 'img/hearts/hearts-r08.svg'} 
      },
 9 : {imgPath:  {c: 'img/clubs/clubs-r09.svg',
                 d: 'img/diamonds/diamonds-r09.svg',
                 h: 'img/hearts/hearts-r09.svg'} 
      },
10 : { k :     {imgPath:   {c: 'img/clubs/clubs-K.svg',
                            d: 'img/diamonds/diamonds-K.svg',
                            h: 'img/hearts/hearts-K.svg'}
                   },                     
       q :     {imgPath:   {c: 'img/clubs/clubs-Q.svg',
                            d: 'img/diamonds/diamonds-Q.svg',
                            h: 'img/hearts/hearts-Q.svg'}      
                   },
       j :     {imgPath:   {c: 'img/clubs/clubs-J.svg',
                            d: 'img/diamonds/diamonds-J.svg',
                            h: 'img/hearts/hearts-J.svg'}      
                   },
       },

    }

              
     
//1: {'img/clubs/clubs-A.svg','',''}

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

cardResults = {
    p:  10,
    c:  1
};
//winner = 't';
render();   
}
// Transfer (Update) all state in the DOM
// render()

function render(){ 
pCardEl.src = cardLookup[cardResults.p].k.imgPath.c;
pCardEl.style.borderColor = 'black';
cCardEl.src = cardLookup[cardResults.c].imgPath.c;
cCardEl.style.borderColor = 'black';
}
// Update all impacted state, then call render
// handleBag() 
// function handleBag(evt){
// }
