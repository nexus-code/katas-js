class Poker {

	// Play Poker game

	constructor (hands){

		let i = 0;
		this.players = hands.map(element => {
				return {name: ++i, hand: element, game: '', gameScore: 0}
			});

		this.maxCardScore = 14; // to config?
		this.game = this.play();
	}

	gamesRanking(){

		return ['highCard', 'onePair', 'twoPair', 'threeOfaKind', 'straight', 'flush', 'fullHouse', 'fourOfaKind', 'straightFlush', 'royalFlush'];
	}

	highCard(player){
		// High card game 
		
		player.game = 'highCard';
		player.gameScore = player.hand[player.hand.length-1].score;
	}

	flush(player){
		//All cards with same suit
		
		let hasColor = player.hand.every(card => card.suit == player.hand[0].suit);

		if (hasColor) {
			
			player.game = 'flush';
			player.gameScore = player.hand[player.hand.length-1].score;
		}
	}

	straight(player){
		// evaluates whether the player has a straight and its type
		
		let handScoreArray = player.hand.map(card => card.score);

		// Five high straight?
		if (handScoreArray[handScoreArray.length-1] == 14 && handScoreArray[0] == 2)
			handScoreArray.pop();

		let hasStraight = true;
		for (let i = 0; i < handScoreArray.length-1; i++) {

			hasStraight = (handScoreArray[i]+1)==handScoreArray[i+1];
			
			if (!hasStraight)
				break;
		}

		if (hasStraight) {
			
			// decide type:
			if(player.game == 'flush'){
				
				if(player.hand[player.hand.length-1].score == this.maxCardScore) 
					player.game = 'royalFlush';
				else
					player.game = 'straightFlush';

			} else {

				player.game = 'straight';
			}

			player.gameScore = player.hand[player.hand.length-1].score;
		}
	} // straight

	pairsThreeFullPoker(player){
		// 1. Count duplicate cards and eval which one of these game is. Accumulate on duplicate.index = card.score		
		// 2. Save game if it doesn't have a superior one. 

		let duplicates = new Array(++this.maxCardScore);
		duplicates.fill(0,0,++this.maxCardScore);

		for	(let i = 0; i < player.hand.length; i++){
			duplicates[player.hand[i].score]++;
		}	

		let result = [];

		for	(let i = 0; i < duplicates.length; i++){
			switch (duplicates[i]){
				case 4:
					result.push({game:'fourOfaKind', gameScore: i});
					break;
				case 3:
					result.push({game:'threeOfaKind', gameScore: i});
					break;
				case 2:
					result.push({game:'onePair', gameScore: i});
					break;
				default:
					break;
			}
		}

		if (result.length == 0)
			return

		//fourOfaKind && fullHouse over the rest of games
		if (result[0].game == 'fourOfaKind') {
			player.game = result[0].game;
			player.gameScore = result[0].gameScore;
			return;
		}

		if (result.length == 2 && (result[0].game != result[1].game)){
			player.game = 'fullHouse';
			player.gameScore = result[0].gameScore > result[1].gameScore ? result[0].gameScore : result[1].gameScore;
			return
		}

		//the next posible games (onePair, twoPair or threeOfaKind) NO overwrite flush (if stright, they can't appear)
		if(player.gameScore == 0){

			if (result.length == 1) {

				player.game = result[0].game;
				player.gameScore = result[0].gameScore;

			} else if (result.length == 2) {
				
				player.game = 'twoPair';
				player.gameScore = result[0].gameScore > result[1].gameScore ? result[0].gameScore : result[1].gameScore;
			}
		}
	} // pairsThreeFullPoker

	orderPlayers(){

		let gameR = this.gamesRanking();
		this.players.sort(function(a, b){
							return gameR.indexOf(b.game) - gameR.indexOf(a.game) || b.gameScore - a.gameScore;
						});
	}	

	showRanking(){
		// ties?
		let ranking = this.players.filter(element => {
				return element.game == this.players[0].game && element.gameScore == this.players[0].gameScore ;
			});

		return ranking.length == 1 ? `AND THE WINNER IS... Player ${this.players[0].name} with ${this.players[0].game}` :`TIE! of ${ranking.length} players with ${this.players[0].game} `;
	}

	showCards(){
		// Show all hands
		this.players.forEach(element=>this.showHand(element));
	}

	showHand(player){
		//Show player hand		
		console.log(`Player ${player.name} --> ${player.hand.map(card => card.name).join(',')} | Game: ${player.game} (game score: ${player.gameScore})`);
	}

	play(){

		console.log('\r\n*** LET THE GAME BEGIN!!!\r\n');

		this.players.forEach(player=>{
						
				this.flush(player);
				this.straight(player);

				// if stright, they can't appear
				if(player.game != 'royalFlush' && player.game != 'straightFlush'){

					this.pairsThreeFullPoker(player);
					
					if(player.gameScore == 0)
						this.highCard(player);
				}
			});

		this.orderPlayers();

		console.log(`*** ${this.showRanking()}`);

		this.showCards();
	}

}

module.exports = Poker;