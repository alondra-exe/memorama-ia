function instrucciones() {
    document.querySelector("#modalInstrucciones").style.display = "block";
}

function ocultarInstrucciones() {
    document.querySelector("#modalInstrucciones").style.display = "none";
}

function ocultarSeleccion() {
    document.querySelector("#modalSeleccion").style.display = "none";
}

function nuevaPartida() {
    window.location.reload(true);
}

// - - - - - - - - - - - Varibales Globales - - - - - - - - - - - - - -

var turnoUsuario = false; // turno del usuario
var turnoIA = false; // turno de la IA
var puedeJugar = false; // User availability to flip regarding if it's its turn

var puntosUsuario = 0; // Pares entontrados por el usuario
var puntosIA = 0; // Pares entontrados por la IA

var playerFlipsFirst;

var flippedCardsLength = 0; // flippedCards{} length (number of flipped cards)

var numOfFlips = 0; // Numero de cartas que ha elegido el jugador o la IA en un turno
var posicionesTurnoActual = []; // Arreglo con las posiciones de la primer carta que elige el jugador, sirve para que no pueda elegir la misma carta 2 veces
var posicioneElegida = []; // Arreglo con las pocisiones de las 2 cartas que acaba de elegir el usuario
var turnoElegido = []; // Arreglos con las imagenes de las 2 cartas que acaba de elegir el usuario
var posicionesRemovidas = []; // Arreglo con las posiciones de cartas que ya no se pueden voltear
var imagenesRemovidas = []; // Arreglo con las posiciones de imagenes que ya no se pueden voltear

var flippedCards = {}; // Cards that User and AI have flipped (For AI memory)
var flippedPositions = []; // Stores positions as User and AI flips
var flippedImages = []; // Stores images as User and AI flips

var imagenesRandom = []; // Stores shuffled images
var cartasRandom = {}; // Stores shuffled cards

// Imagenes para las 30 cartas
var img1 = "../images/" + theme + "/cards/img1.png";
var img2 = "../images/" + theme + "/cards/img2.png";
var img3 = "../images/" + theme + "/cards/img3.png";
var img4 = "../images/" + theme + "/cards/img4.png";
var img5 = "../images/" + theme + "/cards/img5.png";
var img6 = "../images/" + theme + "/cards/img6.png";
var img7 = "../images/" + theme + "/cards/img7.png";
var img8 = "../images/" + theme + "/cards/img8.png";
var img9 = "../images/" + theme + "/cards/img9.png";
var img10 = "../images/" + theme + "/cards/img10.png";
var img11 = "../images/" + theme + "/cards/img11.png";
var img12 = "../images/" + theme + "/cards/img12.png";
var img13 = "../images/" + theme + "/cards/img13.png";
var img14 = "../images/" + theme + "/cards/img14.png";
var img15 = "../images/" + theme + "/cards/img15.png";

// Image to show unflipped image (original back of card)
var imgBck = "../images/" + theme + "/icons/back.png";

// Images to show that a card was removed (one for AI and one for User)
var imgRmAI = "../images/" + theme + "/icons/empty2.png";
var imgRmUs = "../images/" + theme + "/icons/empty.png";
var imgRm = "../images/" + theme + "/icons/empty.png";

// imagenes: Arrego con todos los pares de imagenes (15 pares o 30 elementos)
var imagenes = [img1, img1, img2, img2, img3, img3, img4, img4, img5, img5,
	img6, img6, img7, img7, img8, img8, img9, img9, img10, img10,
	img11, img11, img12, img12, img13, img13, img14, img14, img15,
	img15];

// posiciones: Arreglo con las posiciones de las cartas
var posiciones = ['pos1', 'pos2', 'pos3', 'pos4', 'pos5', 'pos6', 'pos7',
	'pos8', 'pos9', 'pos10', 'pos11', 'pos12', 'pos13', 'pos14',
	'pos15', 'pos16', 'pos17', 'pos18', 'pos19', 'pos20', 'pos21',
	'pos22', 'pos23', 'pos24', 'pos25', 'pos26', 'pos27', 'pos28',
	'pos29', 'pos30'];

var numOfCards = imagenes.length // number of pairs * 2 (total cards)

// - - - - - - - - - - - Variables IA - - - - - - - - - - - - 

var carta1IA; // Image that AI flips 									// Renaming Pointer *
var carta2IA; // Second card that AI flips because it has info of it
var randNum; // Random number for random flip when there is not enough info
var imageOnTurn; // First AI image flipped on turn
var posOnTurn; // First AI position flipped on turn

var autoImgTemp = []; // + new flipped image if isn't yet on auto selection
var autoPosTemp = []; // + new flipped position if isn't yet on auto selection

var autoImgSelection = []; // Ready image pairs for automatic selection 
var autoPosSelection = []; // Ready position pairs for automatic selection

var autoImgSelectionTemp = []; // To remove flipped images from auto selection
var autoPosSelectionTemp = []; // To remove flipped positions from auto selctn

var autoImg1; // Automatic first image selection
var autoImgPos1; // Automatic first position selection
var autoImg2; // Automatic second image selection
var autoImgPos2; // Automatic second position selection

// - - - - - - - - - Shuffle and general init info - - - - - - - - - - - -

// Shuffling images
var temRand = [];
while (temRand.length != numOfCards) {
	var n = Math.floor(Math.random() * numOfCards);
	if (!temRand.includes(n)) {
		temRand.push(n);
		imagenesRandom.push(imagenes[n]);
	}
}

// Creates and initializes shuffledCards with shuffled images
for (var a = 0; a < numOfCards; a++) {
	cartasRandom[posiciones[a]] = imagenesRandom[a];
}

/**
 * Highlights user to show it's its turn
 */
function highlightUser() {
	document.getElementById('turn_user').style.backgroundColor = "#FCFE78";
	document.getElementById('turn_ai').style.backgroundColor = "#42B8C2";
}

/**
 * Highlights AI to show it's its turn
 */
function highlightAI() {
	document.getElementById('turn_ai').style.backgroundColor = "#FCFE78";
	document.getElementById('turn_user').style.backgroundColor = "#42B8C2";
}

// - - - - - - - Functions before the game starts - - - - - - - -

/**
 * Displays startGameModal which shows a message that asks the user who wants
 * to begin flipping first the 'User' or 'AI'. User has to press either button
 * that says 'User' or 'AI'. This button begins the game setting the value of 
 * 'UserFirst' or 'AIFirst' to 'flipsFirst'.
 */
function startingGameModal(playerFlipsFirst) {
	var startGameModal = document.getElementById('start_game_modal');
	if (playerFlipsFirst == "user") {
		highlightUser();
		turnoUsuario = true;
		puedeJugar = true;
		turnoIA = false;
	}
	else {
		highlightAI();
		turnoUsuario = false;
		puedeJugar = false;
		turnoIA = true;
		setTimeout(AIflips, 600);
	}
	startGameModal.style.display = "none";
}

// - - - - - - - - - - User Functions - - - - - - - - - - - -

/**
 * Called when user clicks a card.
 * Checks if it's user's turn and if the user can flip. If so, calls userFlips.
 * @param {string} [posID] position id that user clicked.
 */
function userClicksImage(posID) {
	areThereCards();
	if (turnoUsuario && puedeJugar) {
		userFlips(posID);
	}
}

/**
 * User's chosen cards are flipped.
 * Checks if chosen cards are not removed, and if user is not selecting
 * the same card on the same turn twice. If so, stores flipped cards on
 * flippedCards, and stores flipped positions and images on flippedPositions
 * and flippedImages relatively. Calls AIAutoMemory to store automatic 
 * selection information, and calls checkForPairs to check if chosen cards
 * are a pair.
 * @param {string} [posID] position id that user clicked.
 * posID -> position
 * shuffledCards[posID] -> image
 */
function userFlips(posID) {
	if (!posicionesTurnoActual.includes(posID) && !posicionesRemovidas.includes(posID)) {
		var userImgPos = document.getElementById(posID);
		posicionesTurnoActual.push(posID);
		flippedCards[posID] = userImgPos;
		turnoElegido.push(cartasRandom[posID]);
		flippedPositions.push(posID);
		flippedImages.push(cartasRandom[posID]);
		AIAutoMemory(posID, cartasRandom[posID]);
		userImgPos.src = cartasRandom[posID];
		posicioneElegida[numOfFlips] = userImgPos;
		numOfFlips += 1;
		if (numOfFlips == 2) {
			puedeJugar = false;
			setTimeout(highlightAI, 1000);
			checkForPairs('user');
		}
	}
}

// - - - - - - - - - - - - AI Functions - - - - - - - - - - - - - - - - - -

/**
 * Checks if there are any pairs information in automatic selection arrays.
 * If so, it calls autoSelection. Otherwise, it calls randomOrByMemory.
 */
function AIflips() {
	flippedCardsLength = Object.keys(flippedCards).length;
	if (autoPosSelection.length != 0) {
		autoSelection();
	}
	else {
		randomOrByMemory();
	}
}

/**
 * AI flips two cards as automatic selection (from autoPosSelection).
 * Checks if autoPosSelection elements are not being removed to flip them,
 * and calls checkForPairs (although we know it's an auto selected pair).
*/
function autoSelection() {
	if (!posicionesRemovidas.includes(autoPosSelection[0]) &&
		!posicionesRemovidas.includes(autoPosSelection[1])) {
		var n = autoPosSelection.length - 1;
		/*Selecciona su primer carta para jugar*/
		var autoImgPos1 = document.getElementById(autoPosSelection[n]);
		posicionesTurnoActual.push(autoPosSelection[n]);
		flippedCards[autoPosSelection[n]] = autoImgPos1;
		turnoElegido.push(cartasRandom[autoPosSelection[n]]);
		flippedPositions.push(autoPosSelection[n]);
		flippedImages.push(cartasRandom[autoPosSelection[n]]);
		autoImgPos1.src = cartasRandom[autoPosSelection[n]];
		posicioneElegida[0] = autoImgPos1;
		/*Selecciona su segunda carta para jugar*/
		var autoImgPos2 = document.getElementById(autoPosSelection[n - 1]);
		posicionesTurnoActual.push(autoPosSelection[n - 1]);
		flippedCards[autoPosSelection[n - 1]] = autoImgPos2;
		turnoElegido.push(cartasRandom[autoPosSelection[n - 1]]);
		flippedPositions.push(autoPosSelection[n - 1]);
		flippedImages.push(cartasRandom[autoPosSelection[n - 1]]);
		autoImgPos2.src = cartasRandom[autoPosSelection[n - 1]];
		posicioneElegida[1] = autoImgPos2;
		checkForPairs('ai');
	}
}

/**
 * Stores information to arrange pairs for autoPosSelection. autoImgTemp and
 * autoPosTemp store cards that are being flipped, once there is a pair, they
 * will be stored in autoImgSelection, and autoPosSelection. Therefore, 
 * autoPosSelection and autoImgSelection will have the pairs in order.
 * @param {string} [pos] card image position
 * @param {image file path} [img] card image
*/
function AIAutoMemory(pos, img) {
	if (!autoImgTemp.includes(img) && !posicionesRemovidas.includes(pos)) {
		autoImgTemp.push(img);//Guarda imagenes
		autoPosTemp.push(pos);//Guarda pocisiones
	}
	else if (autoImgTemp.includes(img) && !autoPosTemp.includes(pos) && !posicionesRemovidas.includes(pos)) {
		autoImg1 = autoImgTemp.indexOf(img);
		autoImgPos1 = autoPosTemp[autoImg1];
		autoImg2 = img;
		autoImgPos2 = pos;
		autoImgSelection.push(autoImg1);
		autoPosSelection.push(autoImgPos1);
		autoImgSelection.push(img);
		autoPosSelection.push(pos);
		autoImgTemp.push(img);
		autoPosTemp.push(pos);
	}
}

/**
 * Randomly selects the first card to flip, then on flippedCards checks
 * if its pair has been flipped before. If so, it flips its pair as its 
 * second card. Otherwise, (if not in flippedCards) it randomly selects
 * a card as its second card.
 */
function randomOrByMemory() {
	var findRandomCard1 = true;
	var findingCard2 = true;
	var findRandomCard2 = true;

	flippedCardsLength = Object.keys(flippedCards).length;
	/*Aqui usamos un while para que en el caso de que la IA seleccionara una carta que ya eligio anteriormente en este turno o que no esta disponible, se repita hasta que no lo haga*/
	while (findRandomCard1 == true) {
		randNum = Math.floor(Math.random() * numOfCards);
		if (!posicionesTurnoActual.includes(posiciones[randNum]) && !posicionesRemovidas.includes(posiciones[randNum])) {
			if (flippedPositions.includes(posiciones[randNum])) {
				if (flippedCardsLength >= numOfCards) {
					findRandomCard1 = false;
					getImage();
					flippedCardsLength = Object.keys(flippedCards).length;
					imageOnTurn = cartasRandom[posiciones[randNum]];
					posOnTurn = posiciones[randNum];
				}
				else {
					findRandomCard1 == true;
				}
			}
			else {
				findRandomCard1 = false;
				getImage();
				flippedCardsLength = Object.keys(flippedCards).length;
				imageOnTurn = cartasRandom[posiciones[randNum]];
				posOnTurn = posiciones[randNum];
			}
		}
	}

	// finds if the pair of this image was flipped before, and flips it.
	if (findingCard2 == true) {
		for (var i = 0; i < flippedCardsLength; i++) {
			if (imageOnTurn == flippedImages[i] && posOnTurn != flippedPositions[i]) {
				carta2IA = flippedPositions[i];
				carta1IA = flippedImages[i];
				carta1IA = document.getElementById(carta2IA);
				posicionesTurnoActual.push(carta2IA);
				flippedCards[carta2IA] = carta1IA;
				turnoElegido.push(cartasRandom[carta2IA]);
				AIAutoMemory(carta2IA, cartasRandom[carta2IA]);
				carta1IA.src = cartasRandom[carta2IA];
				posicioneElegida[numOfFlips] = carta1IA;
				numOfFlips += 1;
				findingCard2 = false;
				break;
			}
		}
	}

	// randomly selects second card if its pair was not found on flippedCards
	if (findingCard2 == true) {
		while (findRandomCard2) {
			randNum = Math.floor(Math.random() * numOfCards);
			if (!posicionesTurnoActual.includes(posiciones[randNum]) &&
				!posicionesRemovidas.includes(posiciones[randNum])) {
				if (flippedPositions.includes(posiciones[randNum])) {
					if (flippedCardsLength >= numOfCards) {
						findRandomCard2 = false;
						getImage();
					}
					else {
						findRandomCard2 == true;
					}
				}
				else {
					findRandomCard2 = false;
					getImage();
				}
			}
		}
	}
	setTimeout(highlightUser, 1000);
	checkForPairs('ai');
}

/**
 * Randomly selects a card. Used in randomOrByMemory multiple times.
 */
function getImage() {
	carta1IA = document.getElementById(posiciones[randNum]);
	posicionesTurnoActual.push(posiciones[randNum]);
	flippedCards[posiciones[randNum]] = carta1IA;
	flippedPositions.push(posiciones[randNum]);
	flippedImages.push(cartasRandom[posiciones[randNum]]);
	AIAutoMemory(posiciones[randNum], cartasRandom[posiciones[randNum]]);
	turnoElegido.push(cartasRandom[posiciones[randNum]]);
	carta1IA.src = cartasRandom[posiciones[randNum]];
	posicioneElegida[numOfFlips] = carta1IA;
	numOfFlips += 1;
}

/**
 * "Removes" flipped cards from autoPosSelection and autoImgSelection this way:
 * autoPosSelection, and autoImageSelection are copied to autoPosSelectionTemp,
 * and autoPosSelectionTemp respectively. Then, cards of autoSelection that are
 * not being flipped are pushed to autoPosSelection and autoImgSelection, thus
 * leaving only non flipped cards to auto select.
 * @param {String} [card1] index of first card to be removed
 * @param {String} [card2] index of second card to be removed
 */
function updateAutoSelection(card1, card2) {
	autoPosSelectionTemp = autoPosSelection;
	autoImgSelectionTemp = autoImgSelection;
	autoPosSelection = [];
	autoImgSelection = [];
	for (var i = 0; i < autoPosSelectionTemp.length; i++) {
		if (autoPosSelectionTemp[i] != card1
			&& autoPosSelectionTemp[i] != card2) {
			autoPosSelection.push(autoPosSelectionTemp[i]);
			autoImgSelection.push(autoImgSelectionTemp[i]);
		}
	}
}

// - - - - - - - - - - - User and AI Functions - - - - - - - - - - - - - - -

/**
 * Checks if the two cards chosen by player per turn are a pair. If they are
 * a pair, updateAutoSelection is called, player's score is increased by one,
 * score is updated on html file, and pair is removed (by calling removeImage)
 * Otherwise, if not a pair, they are unflipped (by calling unflipImage).
*/
function checkForPairs(player) {
	if (turnoElegido[0] == turnoElegido[1]) {
		updateAutoSelection(posicionesTurnoActual[0], posicionesTurnoActual[1]);
		if (player == 'ai') {
			puntosIA += 1;
			document.getElementById('score_ai').innerHTML = puntosIA;
			turnoIA = true;
			setTimeout(highlightAI, 1000);
			imgRm = imgRmAI;
		}
		if (player == 'user') {
			puntosUsuario += 1;
			document.getElementById('score_user').innerHTML = puntosUsuario;
			turnoUsuario = true;
			puedeJugar = false;
			setTimeout(highlightUser, 1000);
			turnoIA = false;
			imgRm = imgRmUs;
		}
		posicionesRemovidas.push(posicionesTurnoActual[0]);
		posicionesRemovidas.push(posicionesTurnoActual[1]);
		setTimeout(removeImage, 1000);
	}
	else {
		turnoUsuario = !turnoUsuario;
		turnoIA = !turnoIA;
		setTimeout(unflipImage, 1000);
	}
	turnoElegido = [];
}

/**
 * Sets a picture to the two positions where the pair was found to show that
 * that positions are "removed" (no longer available to flip). The image
 * shows what player found that pair ('AI' or 'User').
 */
function removeImage() {
	posicionesTurnoActual = [];
	posicioneElegida[0].src = imgRm;
	posicioneElegida[1].src = imgRm;
	numOfFlips = 0;
	posicioneElegida = [];
	areThereCards();
	if (turnoIA) {
		AIflips();
	}
	else {
		setTimeout(highlightUser, 1000);
		puedeJugar = true;
	}
}

/**
 * Sets a picture to the two positions that were flipped to show that the 
 * cards were not found, and are again available to flip in future turns.
 * The image shows the back of the card (original unflipped card).
 */
function unflipImage() {
	posicionesTurnoActual = [];
	posicioneElegida[0].src = imgBck;
	posicioneElegida[1].src = imgBck;
	numOfFlips = 0;
	posicioneElegida = [];
	areThereCards();
	if (turnoIA) {
		AIflips();
	}
	else {
		setTimeout(highlightUser, 1000);
		puedeJugar = true;
	}
}

/**
 * Checks if there are no more cards to flip (if the number of removed cards
 * is the same as the number of total cards, then all cards have been removed,
 * and there are not any more available cards to flip. If so, calls gameOver).
 */
function areThereCards() {
	if (posicionesRemovidas.length == numOfCards) {
		gameOver();
	}
}

// - - - - - - - Functions for What to do when game is over? - - - - - - - -

/**
 * Sets turnUser and turnAI to false. Dispays gameOverModal in html file to
 * show final score and a message saying if user won or lost.
 */
function gameOver() {
	turnoUsuario = false;
	turnoIA = false;
	document.getElementById('turn_ai').style.backgroundColor = "#42B8C2";
	document.getElementById('turn_user').style.backgroundColor = "#42B8C2";
	updateGameOverModal();
}

/**
 * Displays gameOverModal which shows a message that says either "You Lost"
 * or "You Won", the final score, an image of the theme, and two buttons
 * for either "Play Again", or "Home". User has to press one of those 
 * buttons or quit the page.
 */
function updateGameOverModal() {
	var winnerMsg;
	var gameOverModal = document.getElementById('end_game_modal');
	gameOverModal.style.display = "block";
	document.getElementById('final_score_ai').innerHTML = puntosIA;
	document.getElementById('final_score_user').innerHTML = puntosUsuario;
	if (puntosIA > puntosUsuario) {
		winnerMsg = "You Lost!";
	}
	else {
		winnerMsg = "You Won!";
	}
	document.getElementById('end_lettering_txt').innerHTML = winnerMsg;
}