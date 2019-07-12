class Deck {

	// create, shuffle and return hand

	constructor (){
		
		this.cards = [];	//the deck 

		const values = [
						{name: '2', score: 2},
						{name: '3', score: 3},
						{name: '4', score: 4},
						{name: '5', score: 5},
						{name: '6', score: 6},
						{name: '7', score: 7},
						{name: '8', score: 8},
						{name: '9', score: 9},
						{name: 'T', score: 10},
						{name: 'J', score: 11},
						{name: 'Q', score: 12},
						{name: 'K', score: 13},
						{name: 'A', score: 14},
					];

		const suits = [
						{name: 'spades', letter: 'S'},
						{name: 'hearts', letter: 'H'},
						{name: 'clubs',  letter: 'C'},
						{name: 'diamons',letter: 'D'},
					];

		// create deck
		suits.forEach(suit=> {
			 values.forEach(value => { 
					this.cards.push({name: value.name+suit.letter, score: value.score, suit: suit.letter});
				});
		});

		// shuffle deck
		this.cards.sort(function() { return 0.5 - Math.random() });	// very widespread snippet (not very orthodox, but effective)
	}

	hand(numberOfCards) {
		// stract a hand (this.numberOfCards cards ordered min to max score)
		return this.cards.splice(0, numberOfCards).sort(function (a, b) { return a.score > b.score});
	}
}

module.exports = Deck;