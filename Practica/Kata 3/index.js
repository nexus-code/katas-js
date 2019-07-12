const config = require('./config.js');
const Deck   = require('./deck.js');
const Poker  = require('./poker.js');

function main (play){

	// 'Shuffle', get hands and start the game
	
	if (play.players > play.maxPlayers)
		return console.log(` Máximo ${play.maxPlayers} jugadores!!`);

	let deck  = new Deck();	
	
	let hands = [];
	for (let i = 0; i < play.players; i++) {
		hands.push(deck.hand(play.numberOfCards));
	}


	// testing 
	//1. IMPORTANT NOTE: For "auto-testing" mode comment any values and suits of cards: on deck.js. Ej lines 8 to 14 & 24 (less odss more games).
	// let testHands  = require('./test.js'); // 2. Edit here for manual testing
	// hands = testHands.array;
	/// testing

	// console.log(JSON.stringify(hands));

	let poker = new Poker(hands);
}

main (config);