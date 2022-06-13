gameRunning = false;
prizeWon = false;
gamesPlayed = 0;
gamesLost = 0;
gamesWon = 0;

// sleep function for controlling how fast different parts of the code run,
// can be adjusted in case of glitches due to slow internet or pc speed. Pass time in ms when calling, e.g. await sleep(10);
const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// start a new game while prize isn't won
async function newGame() {
	if (!prizeWon) {
		await sleep(1000);
		//there are multiple new game buttons on page, so query and loop over all of them (only one works)
		const newGameButtons = document.querySelectorAll(".new-game-button");
		for (const button of newGameButtons) {
			button.click();
		}
		await sleep(1000);
		playGame();
	}
}

//check if and which game modal has popped up - game won, game lost or prize won.
//Detect end of game if a modal has popped. Stop the script entirely if prize is won.
function gameStatus() {
	let winModal = document.getElementById("popup-win").style.display;
	let loseModal = document.getElementById("popup-loose").style.display;
	let prizeModal = document.getElementById("popup-win-prize").style.display;
	let prizeModal2 = document.getElementById("popup-win-before-registration").style.display;
	if (winModal != "none") {
		gameRunning = false;
		gamesWon++;
	} else if (loseModal != "none") {
		gameRunning = false;
		gamesLost++;
	} else if (prizeModal != "none" || prizeModal2 != "none") {
		gameRunning = false;
		prizeWon = true;
		window.alert("prize won!!!!!!!!!");
	}
}

async function playGame() {
	gameRunning = true;
	//load all game tiles in an array
	const gameTiles = document.querySelectorAll('#board > tile');
	//get the first tiles classname
	let lastMove = gameTiles[0].className.charAt();
	//loop over each game tile
	for (const tile of gameTiles) {
		if (!gameRunning) {
			break;		
		} else if (tile.className.charAt() === lastMove) {
			//skip if tile is the same as last turn
			continue;
		}
		lastMove = tile.className.charAt();
		//click the button corresponding to our tile this move
		document.querySelector('#colors > .' + lastMove.charAt()).click();
		await sleep(200);
		//check if game the game hasn't ended
		gameStatus();
	}
	gamesPlayed++;
	console.log("Games played: " + gamesPlayed + " , Lost: " + gamesLost + " , Won: " + gamesWon);
	newGame();
}

playGame();

// h g a d c 