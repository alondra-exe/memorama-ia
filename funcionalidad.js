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