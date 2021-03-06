function instrucciones() {
	document.querySelector("#modalInstrucciones").style.display = "block";
}

function ocultarInstrucciones() {
	document.querySelector("#modalInstrucciones").style.display = "none";
}

function finJuego() {
	document.querySelector("#modalFin").style.display = "block";
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
var puedeJugar = false; // permite al usuario para dar vuelta a las cartas si es su turno

var puntosUsuario = 0; // Pares entontrados por el usuario
var puntosIA = 0; // Pares entontrados por la IA

var CantidadCartasVolteadas = 0; // número de cartas que han sido volteadas

var VolteoPorTurnos = 0; // Numero de cartas que ha elegido el jugador o la IA en un turno
var posicionesTurnoActual = []; // Arreglo con las posiciones de la primer carta que elige el jugador, sirve para que no pueda elegir la misma carta 2 veces
var posicioneElegida = []; // Arreglo con las pocisiones de las 2 cartas que acaba de elegir el usuario
var turnoElegido = []; // Arreglos con las imagenes de las 2 cartas que acaba de elegir el usuario
var posicionesRemovidas = []; // Arreglo con las posiciones de cartas que ya no se pueden voltear
var imagenesRemovidas = []; // Arreglo con las posiciones de imagenes que ya no se pueden voltear

var CartasVolteadas = {}; // Arreglo que contiene las cartas que el usuario y la IA han volteado
var PosicionesVolteadas = []; // Arreglo que almacena las posiciones a medida que las cartas son volteadas por el usuario y por la IA
var ImagenesVolteadas = []; // Arreglo que almacena las imagenes que han sido volteadas a medida que son volteadas por el usuario y la IA

var imagenesRandom = []; // Arreglo que almacena las imagenes barajeadas
var cartasRandom = {}; // Arreglo que almacena las cartas barajeadas

// Imagenes para las 22 cartas
var img1 = "https://upload.wikimedia.org/wikipedia/commons/5/57/Playing_card_heart_A.svg";
var img2 = "https://upload.wikimedia.org/wikipedia/commons/f/f2/Playing_card_spade_2.svg";
var img3 = "https://upload.wikimedia.org/wikipedia/commons/8/82/Playing_card_diamond_3.svg";
var img4 = "https://upload.wikimedia.org/wikipedia/commons/3/3d/Playing_card_club_4.svg";
var img5 = "https://upload.wikimedia.org/wikipedia/commons/5/52/Playing_card_heart_5.svg";
var img6 = "https://upload.wikimedia.org/wikipedia/commons/d/d2/Playing_card_spade_6.svg";
var img7 = "https://upload.wikimedia.org/wikipedia/commons/e/e6/Playing_card_diamond_7.svg";
var img8 = "https://upload.wikimedia.org/wikipedia/commons/e/eb/Playing_card_club_8.svg";
var img9 = "https://upload.wikimedia.org/wikipedia/commons/5/50/Playing_card_heart_9.svg";
var img10 = "https://upload.wikimedia.org/wikipedia/commons/8/87/Playing_card_spade_10.svg";
var img11 = "https://upload.wikimedia.org/wikipedia/commons/b/be/Playing_card_diamond_11.svg";

// reverso de las cartas
var ReversoImg = "images/back.png";

// Imagenes para indicar que un par de cartas fue encontrado (uno para el usuario y otra para la IA)

// imagenes: Arrego con todos los pares de imagenes (11 pares o 22 elementos)
var imagenes = [img1, img1, img2, img2, img3, img3, img4, img4, img5, img5,
	img6, img6, img7, img7, img8, img8, img9, img9, img10, img10,
	img11, img11];

// posiciones: Arreglo con las posiciones de las cartas
var posiciones = ['pos1', 'pos2', 'pos3', 'pos4', 'pos5', 'pos6', 'pos7',
	'pos8', 'pos9', 'pos10', 'pos11', 'pos12', 'pos13', 'pos14',
	'pos15', 'pos16', 'pos17', 'pos18', 'pos19', 'pos20', 'pos21',
	'pos22'];

var numeroCartas = imagenes.length // numero de pares multiplicado por 2 (total de cartas)

// - - - - - - - - - - - Variables IA - - - - - - - - - - - - 

var carta1IA; // Imagen que la IA a volteado 									// Puntero de cambio de nombre *
var carta2IA; // Segunda carta que la IA a volteado si contiene información de ella 
var NumeroAleatorio; // Número aleatorio para voltear una carta al azar si no hay suficiente información
var PrimerImgIA; // Primera imagen que la IA a volteado en un turno
var PrimerPosIA; // Primera posición que la IA a volteado en un turno

var ImagenAutomatica = []; // + Nueva imagen volteada si no se encuentra en la selección automática
var posicionAutomatica = []; // + Nueva posición volteada si no se encuentra en la selección automática

var SeleccionarImagenAutomatica = []; // Pares de imagenes que se encuentran en la selección automática
var SeleccionarPosicionAutomatica = []; // Pares de posición que se encuentran en la selección automática

var EliminarImagenVolteada = []; // Arreglo que elimina las imagenes que ya estan volteadas de la selección automática
var EliminarPosicionVolteada = []; // Arreglo que elimina las posiciones que ya estan volteadas de la selección automática

var autoImg1; // Selección automática de la primera imagen
var autoImgPos1; // Selección automática de la primera posición
var autoImg2; // Selección automática de la segunda imagen
var autoImgPos2; // Selección automática de la segunda posiciónn

// - - - - - - - - - barajeado e información general - - - - - - - - - - - -

// Barajeado de imagenes
var temRand = [];
while (temRand.length != numeroCartas) {
	var n = Math.floor(Math.random() * numeroCartas);
	if (!temRand.includes(n)) {
		temRand.push(n);
		imagenesRandom.push(imagenes[n]);
	}
}

// Crea e inicializa el barajeado de las posiciones
for (var a = 0; a < numeroCartas; a++) {
	cartasRandom[posiciones[a]] = imagenesRandom[a];
}

// - - - - - - - FFunciones para antes de que inicie el juego - - - - - - - -

/**
 * Muestra un modal para iniciar el juego preguntando quien sera el que inicie
 * para iniciar el juego el usuario tendra que oprimir cualquier botón
 * uno que indica que empezara el usuario y otro que indica que será la IA, esto iniciara el juego y modificara las variables
 * turnoUsuario o turnoIA y cambiara el valor de puedeJugar a true.
 */
function IniciarJuego(JugadorInicial) {
	var modalSeleccion = document.getElementById('modalSeleccion');
	if (JugadorInicial == "usuario") {
		turnoUsuario = true;
		puedeJugar = true;
		turnoIA = false;
	}
	else {
		turnoUsuario = false;
		puedeJugar = false;
		turnoIA = true;
		setTimeout(JugarIA, 600);
	}
	modalSeleccion.style.display = "none";
}

// - - - - - - - - - - Funciones del usuario - - - - - - - - - - - -

/**
 * Este metodo es llamado cuando el usuario oprime una carta
 * revisa si es turno del usuario y si lo es llama el metodo para voltear la carta seleccionada
 * @param {string} [PosicionID] Identificación de posición en la que la usuario hizo clic.
 */
function ClickImagenUsuario(PosicionID) {
	ExistenCartas();
	if (turnoUsuario && puedeJugar) {
		JugarUsuario(PosicionID);
	}
}

/**
 * Las cartas que el usuario escogio se voltean revisa si a las cartas elegidas
 * no se les a encontrado su par y si el usuario no esta seleccionando
 * la misma carta dos veces en su turno. Sí es así entonces se almacenarán las cartas volteadas en
 * cartasVolteadas y almacena su posición y su imagen invertida en posiciónVolteada
 * así como en imagenesVolteadas. Llama despues a la memoriaAutomaticaIA para almacenar automáticamente
 * la información seleccionada y llama a revisarPares para comprobar si las cartas elegidas
 * son pares.
 * @param {string} [PosicionID] posición del id que el usuario a clickeado.
 * PosicionID -> posición de la carta
 * cartasRepartidas[PosicionID] -> imagen
 */
function JugarUsuario(PosicionID) {
	if (!posicionesTurnoActual.includes(PosicionID) && !posicionesRemovidas.includes(PosicionID)) {
		var PosicionImagenUsuario = document.getElementById(PosicionID);
		posicionesTurnoActual.push(PosicionID);
		CartasVolteadas[PosicionID] = PosicionImagenUsuario;
		turnoElegido.push(cartasRandom[PosicionID]);
		PosicionesVolteadas.push(PosicionID);
		ImagenesVolteadas.push(cartasRandom[PosicionID]);
		memoriaAutomaticaIA(PosicionID, cartasRandom[PosicionID]);
		PosicionImagenUsuario.src = cartasRandom[PosicionID];
		posicioneElegida[VolteoPorTurnos] = PosicionImagenUsuario;
		VolteoPorTurnos += 1;
		if (VolteoPorTurnos == 2) {
			puedeJugar = false;
			revisarPares('user');
		}
	}
}

// - - - - - - - - - - - - Funciones de la IA - - - - - - - - - - - - - - - - - -

/**
 * Revisa si existen pares en los arreglos de la selección automática
 * si es así, llamará a la seleccionAutomatica. De lo contrario, llama a RandomOenMemoria
 */
function JugarIA() {
	CantidadCartasVolteadas = Object.keys(CartasVolteadas).length;
	if (SeleccionarPosicionAutomatica.length != 0) {
		eleccionAutomatica();
	}
	else {
		eleccionSemiAleatoria();
	}
}

/**
 * La IA selecciona dos cartas	aleatoriamente de SeleccionarPosicionAutomatica
 * revisa si los elementos de seleccionarPosicionAutomatica no han sido encontados para voltearlos
 * y llama el metodo de RevisarPares
*/
function eleccionAutomatica() {
	if (!posicionesRemovidas.includes(SeleccionarPosicionAutomatica[0]) &&
		!posicionesRemovidas.includes(SeleccionarPosicionAutomatica[1])) {
		var n = SeleccionarPosicionAutomatica.length - 1;
		/*Selecciona su primer carta para jugar*/
		var autoImgPos1 = document.getElementById(SeleccionarPosicionAutomatica[n]);
		posicionesTurnoActual.push(SeleccionarPosicionAutomatica[n]);
		CartasVolteadas[SeleccionarPosicionAutomatica[n]] = autoImgPos1;
		turnoElegido.push(cartasRandom[SeleccionarPosicionAutomatica[n]]);
		PosicionesVolteadas.push(SeleccionarPosicionAutomatica[n]);
		ImagenesVolteadas.push(cartasRandom[SeleccionarPosicionAutomatica[n]]);
		autoImgPos1.src = cartasRandom[SeleccionarPosicionAutomatica[n]];
		posicioneElegida[0] = autoImgPos1;
		/*Selecciona su segunda carta para jugar*/
		var autoImgPos2 = document.getElementById(SeleccionarPosicionAutomatica[n - 1]);
		posicionesTurnoActual.push(SeleccionarPosicionAutomatica[n - 1]);
		CartasVolteadas[SeleccionarPosicionAutomatica[n - 1]] = autoImgPos2;
		turnoElegido.push(cartasRandom[SeleccionarPosicionAutomatica[n - 1]]);
		PosicionesVolteadas.push(SeleccionarPosicionAutomatica[n - 1]);
		ImagenesVolteadas.push(cartasRandom[SeleccionarPosicionAutomatica[n - 1]]);
		autoImgPos2.src = cartasRandom[SeleccionarPosicionAutomatica[n - 1]];
		posicioneElegida[1] = autoImgPos2;
		revisarPares('ai');
	}
}

/**
 * Almacena la información para organizar los pares de SeleccionarPosicionAutomatica, AlmacenarImagenAutomatica
 * las cartas que son volteadas son almacenadas en AlmacenarPosicionAutomatica, una vez haya un par, 
 * se almacenará en SeleccionarImagenAutomatica y SeleccionarPosicionAutomatica por lo tanto,
 * SeleccionarImagenAutomatica y SeleccionarPosicionAutomatica tendán los pares en orden
 * @param {string} [pos] posición de la imagen de la carta
 * @param {image file path} [img] imagen de la carta
*/
function memoriaAutomaticaIA(pos, img) {
	if (!ImagenAutomatica.includes(img) && !posicionesRemovidas.includes(pos)) {
		ImagenAutomatica.push(img);//Guarda imagenes
		posicionAutomatica.push(pos);//Guarda pocisiones
	}
	else if (ImagenAutomatica.includes(img) && !posicionAutomatica.includes(pos) && !posicionesRemovidas.includes(pos)) {
		autoImg1 = ImagenAutomatica.indexOf(img);
		autoImgPos1 = posicionAutomatica[autoImg1];
		autoImg2 = img;
		autoImgPos2 = pos;
		SeleccionarImagenAutomatica.push(autoImg1);
		SeleccionarPosicionAutomatica.push(autoImgPos1);
		SeleccionarImagenAutomatica.push(autoImg2);
		SeleccionarPosicionAutomatica.push(autoImgPos2);
		ImagenAutomatica.push(img);
		posicionAutomatica.push(pos);
	}
}

/**
 * Selecciona aleatoriamente la primera carta a voltear, luego comprueba en las cartasVolteadas
 * si su par se ha volteado anteriormente. Sí es así, voltea su par así como su
 * segunda carta. De otra manera, (si no se encuentra en las cartasVolteadas) selecciona al azar
 * una carta como su segunda carta
 */
function eleccionSemiAleatoria() {
	var EncontrarCartaAleatoria1 = true;
	var EncontrarCarta2 = true;
	var EncontrarCartaAleatoria2 = true;

	CantidadCartasVolteadas = Object.keys(CartasVolteadas).length;
	/*Aqui usamos un while para que en el caso de que la IA seleccionara una carta que ya eligio anteriormente en este turno o que no esta disponible, se repita hasta que no lo haga*/
	while (EncontrarCartaAleatoria1 == true) {
		NumeroAleatorio = Math.floor(Math.random() * numeroCartas);
		if (!posicionesTurnoActual.includes(posiciones[NumeroAleatorio]) && !posicionesRemovidas.includes(posiciones[NumeroAleatorio])) {
			if (PosicionesVolteadas.includes(posiciones[NumeroAleatorio])) {
				if (CantidadCartasVolteadas >= numeroCartas) {
					EncontrarCartaAleatoria1 = false;
					getImagen();
					CantidadCartasVolteadas = Object.keys(CartasVolteadas).length;
					PrimerImgIA = cartasRandom[posiciones[NumeroAleatorio]];
					PrimerPosIA = posiciones[NumeroAleatorio];
				}
				else {
					EncontrarCartaAleatoria1 == true;
				}
			}
			else {
				EncontrarCartaAleatoria1 = false;
				getImagen();
				CantidadCartasVolteadas = Object.keys(CartasVolteadas).length;
				PrimerImgIA = cartasRandom[posiciones[NumeroAleatorio]];
				PrimerPosIA = posiciones[NumeroAleatorio];
			}
		}
	}

	// Encuentra el par de la imagen que se volteó anteriormente y la voltea
	if (EncontrarCarta2 == true) {
		for (var i = 0; i < CantidadCartasVolteadas; i++) {
			if (PrimerImgIA == ImagenesVolteadas[i] && PrimerPosIA != PosicionesVolteadas[i]) {
				carta2IA = PosicionesVolteadas[i];
				carta1IA = ImagenesVolteadas[i];
				carta1IA = document.getElementById(carta2IA);
				posicionesTurnoActual.push(carta2IA);
				CartasVolteadas[carta2IA] = carta1IA;
				turnoElegido.push(cartasRandom[carta2IA]);
				memoriaAutomaticaIA(carta2IA, cartasRandom[carta2IA]);
				carta1IA.src = cartasRandom[carta2IA];
				posicioneElegida[VolteoPorTurnos] = carta1IA;
				VolteoPorTurnos += 1;
				EncontrarCarta2 = false;
				break;
			}
		}
	}

	// selecciona al azar la segunda carta si su par no se encuentra cartasVolteadas
	if (EncontrarCarta2 == true) {
		while (EncontrarCartaAleatoria2) {
			NumeroAleatorio = Math.floor(Math.random() * numeroCartas);
			if (!posicionesTurnoActual.includes(posiciones[NumeroAleatorio]) &&
				!posicionesRemovidas.includes(posiciones[NumeroAleatorio])) {
				if (PosicionesVolteadas.includes(posiciones[NumeroAleatorio])) {
					if (CantidadCartasVolteadas >= numeroCartas) {
						EncontrarCartaAleatoria2 = false;
						getImagen();
					}
					else {
						EncontrarCartaAleatoria2 == true;
					}
				}
				else {
					EncontrarCartaAleatoria2 = false;
					getImagen();
				}
			}
		}
	}
	revisarPares('ai');
}

/**
 * Selecciona aleatoriamente una carta. Usado varias veces en la funcion AleatorioOMemoria.
 */
function getImagen() {
	carta1IA = document.getElementById(posiciones[NumeroAleatorio]);
	posicionesTurnoActual.push(posiciones[NumeroAleatorio]);
	CartasVolteadas[posiciones[NumeroAleatorio]] = carta1IA;
	PosicionesVolteadas.push(posiciones[NumeroAleatorio]);
	ImagenesVolteadas.push(cartasRandom[posiciones[NumeroAleatorio]]);
	memoriaAutomaticaIA(posiciones[NumeroAleatorio], cartasRandom[posiciones[NumeroAleatorio]]);
	turnoElegido.push(cartasRandom[posiciones[NumeroAleatorio]]);
	carta1IA.src = cartasRandom[posiciones[NumeroAleatorio]];
	posicioneElegida[VolteoPorTurnos] = carta1IA;
	VolteoPorTurnos += 1;
}

/**
 * Remueve lascartas volteadas de SeleccionarPosicionAutomatica y SeleccionarImagenAutomatica, de esta manera:
 * SeleccionarPosicionAutomatica, y SeleccionarImagenAutomaticade se copían en EliminarPosicionVolteadaoral,
 * y EliminarPosicionVolteadaoral respectivamente. entonces, cartas de SeleccionAutomatica que
 * no han sido volteadas son introducidas a SeleccionarPosicionAutomatica and SeleccionarImagenAutomaticade, por lo tanto
 * se dejan solamente las cartas que no han sido volteadas al selector automático.
 * @param {String} [card1] index de la primer carta que sera removida
 * @param {String} [card2] index de la segúnda carta que sera removida
 */
function updateSeleccionAutomatica(card1, card2) {
	EliminarPosicionVolteada = SeleccionarPosicionAutomatica;
	EliminarImagenVolteada = SeleccionarImagenAutomatica;
	SeleccionarPosicionAutomatica = [];
	SeleccionarImagenAutomatica = [];
	for (var i = 0; i < EliminarPosicionVolteada.length; i++) {
		if (EliminarPosicionVolteada[i] != card1
			&& EliminarPosicionVolteada[i] != card2) {
			SeleccionarPosicionAutomatica.push(EliminarPosicionVolteada[i]);
			SeleccionarImagenAutomatica.push(EliminarImagenVolteada[i]);
		}
	}
}

// - - - - - - - - - - - Funciones del usuario y de la IA - - - - - - - - - - - - - - -

/**
 * Comprueba si las dos cartas elegidas por el jugador en turno son un par. Si son
 * un par, se llama a ActualizarSeleccionAutomatica, entonces la puntuación del jugador aumenta en uno,
 * la puntuación se actualíza en el archivo del HTML, y la pareja es removida (por RemoverImagen)
 * de lo contrario, si no son un par, las cartas vuelven a su estado inicial (por ReversoCarta).
*/
function revisarPares(Jugador) {
	if (turnoElegido[0] == turnoElegido[1]) {
		updateSeleccionAutomatica(posicionesTurnoActual[0], posicionesTurnoActual[1]);
		if (Jugador == 'ai') {
			puntosIA += 1;
			document.getElementById('puntajeIA').innerHTML = puntosIA;
			turnoIA = true;
		}
		if (Jugador == 'user') {
			puntosUsuario += 1;
			document.getElementById('puntajeUsuario').innerHTML = puntosUsuario;
			turnoUsuario = true;
			puedeJugar = false;
			turnoIA = false;
		}
		posicionesRemovidas.push(posicionesTurnoActual[0]);
		posicionesRemovidas.push(posicionesTurnoActual[1]);
		setTimeout(RemoverImagen, 1000);
	}
	else {
		turnoUsuario = !turnoUsuario;
		turnoIA = !turnoIA;
		setTimeout(ImagenesNoVolteadas, 1000);
	}
	turnoElegido = [];
}

/**
 * Establece una imagen en las dos posiciones donde se encontró el par para mostrar que
 * esa posición a sido removida (no puede ser volteada de nuevo). la imagen
 * muestra que jugador encontro el par, si el usuario o la IA.
 */
function RemoverImagen() {
	posicionesTurnoActual = [];
	VolteoPorTurnos = 0;
	posicioneElegida = [];
	ExistenCartas();
	if (turnoIA) {
		JugarIA();
	}
	else {
		puedeJugar = true;
	}
}

/**
 * Establece una imagen en las dos posiciones donde se encontró el par para mostrar que
 * no se encontrarón las cartas y estan disponibles para darles vuelta en los siguientes turnos
 * la imagen muestra el reverso de la carta (estado inicial de las cartas).
 */
function ImagenesNoVolteadas() {
	posicionesTurnoActual = [];
	posicioneElegida[0].src = ReversoImg;
	posicioneElegida[1].src = ReversoImg;
	VolteoPorTurnos = 0;
	posicioneElegida = [];
	ExistenCartas();
	if (turnoIA) {
		JugarIA();
	}
	else {
		puedeJugar = true;
	}
}

/**
 * revisa si ya no se encuentran cartas disponibles para dar vuelta (si el número de cartas removidas
 * es el mismo que el número total de cartas, por lo que todas las cartas han sido removidas,
 * y no hay mas cartas disponibles para voltear. si es así, se llama a juegoterminado).
 */
function ExistenCartas() {
	if (posicionesRemovidas.length == numeroCartas) {
		JuegoFinalizado();
	}
}

// - - - - - - - Funciones para cuando se ha finalizado el juego - - - - - - - -

/**
 * Establece el turnousuario y el turnoIA en falso y muestra el juegoFinalizadoModal
 * muestra el marcador final y muestra un mensaje que indica el ganador y el perdedor del juego.
 */
function JuegoFinalizado() {
	turnoUsuario = false;
	turnoIA = false;
	if (puntosIA > puntosUsuario) {
		document.getElementById('Ganador').innerHTML = "IA";
	}
	else {
		document.getElementById('Ganador').innerHTML = "Usuario";
    }
	finJuego()
}