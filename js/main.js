/*----- constants -----*/
// when it comes time to transfer the app's state to the DOM,
// you can visualize the state anyway you want, e.g., a value of 1 is "rendered" 
// with a certain image, etc.
const cardLookup = {
'0': null,
'1': 1, '2': 2, '3': 3,
'4': 4, '5': 5, '6': 6,
'7': 7, '8': 8, '9': 9,
'10': 10,
}

/*----- app's state (variables) -----*/
let scoreVal, winner, betVal;

/*----- cached element references -----*/

/*----- event listeners -----*/

/*----- functions -----*/
//
// init()
// Transfer (Update) all state in the DOM
// render()
// Update all impacted state, then call render
// handleBag() 
//
