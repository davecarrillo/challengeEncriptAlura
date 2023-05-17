const botonEncriptar = document.getElementById("boton-encriptar");
const botonDesencriptar = document.getElementById("boton-desencriptar");
const contenedorMensaje = document.getElementById("contenedor-mensaje-procesado");
const contenedorMensajeUsuario = document.getElementById("contenedor-mensaje-usuario");
const mensajeUsuario = document.getElementById("mensaje-usuario");

const letrasEncriptadas = new Map([
    ['a', 'ai'],
    ['e', 'enter'],
    ['i', 'imes'],
    ['o', 'ober'],
    ['u', 'ufat']
]);

botonEncriptar.addEventListener("click", validarMensaje);
botonDesencriptar.addEventListener("click", validarMensaje);

// Funcion que verifica que el mensaje ingresado por el usuario sea válido
function validarMensaje() {
    let mensajeRecibido = mensajeUsuario.value.toLowerCase();
    // Verifica que el texto no tenga numeros y muestra mensaje de error
    if (/\d/.test(mensajeRecibido)) {
        contenedorMensaje.innerHTML = `<img class="muñeco" src="./assets/img/Muñeco.png" alt="imagen-persona-buscando">
        <div id="mensajes-predeterminados">
            <p class="primer-parrafo">El mensaje no debe tener numeros</p>
            <p class="primer-parrafo">Ingresa otro mensaje</p>
        </div>`
        return;
    }
    // Verifica que el texto no tenga caracteres con acento y muestra mensaje de error
    if (mensajeRecibido.normalize("NFD").match(/[\u0300-\u036f]/g)) {
        contenedorMensaje.innerHTML = `<img class="muñeco" src="./assets/img/Muñeco.png" alt="imagen-persona-buscando">
        <div id="mensajes-predeterminados">
            <p class="primer-parrafo">El mensaje no debe tener letras con acentos</p>
            <p class="primer-parrafo">Ingresa otro mensaje</p>
        </div>`
        return;
    }
    // Verifica que no se ingrese un mensaje vacio y muestra mensaje de error
    if(mensajeRecibido.length === 0){
        contenedorMensaje.innerHTML = `<img class="muñeco" src="./assets/img/Muñeco.png" alt="imagen-persona-buscando">
        <div id="mensajes-predeterminados">
            <p class="primer-parrafo">Ningun mensaje fue encontrado</p>
            <p class="segundo-parrafo">Ingresa el texto que deseas encriptar o desencriptar</p>
        </div>`
    }
    // Si el mensaje es correcto se llama la funcion encriptarTexto y se almacena el mensaje encriptado en la variable mensaje y lo muestra en el area de mensaje encriptado
    else {
        let mensaje = encriptarTexto(mensajeRecibido);
        contenedorMensaje.innerHTML = `<p>${mensaje}</p><br> <button id="boton-copiar">Copiar</button>`;
        console.log(mensaje);
        return;
    }
}
// Funcion que encripta el texto, recibe por parametro el texto ingresado por el usuario y retorna el mensaje encriptado.
function encriptarTexto(texto) {
    let mensajeEncriptado = ""; //Se inicializa variable con string vacio
    for(let i = 0; i < texto.length; i++) {
        let caracter = texto[i]; // Declaro la variable caracter que almacenara la letra correspondiente a cada iteracion
        if(esVocal(caracter)) { // Se verifica que el caracter sea una vocal con ayuda de la funcion esVocal
            const encriptado = agregarLetrasEncriptadas(caracter); // Si es una vocal se declara la constante encriptado que toma el valor de lo que retorna la funcion agregarLetrasEncriptadas
            mensajeEncriptado += encriptado //Aqui se concatena el encripado a la variable mensajeEncriptado
        } else {
            mensajeEncriptado += caracter; // Si no es una vocal simplemente concatena la letra correspondiente
        }
    }
    return mensajeEncriptado;
}
// Funcion auxiliar para determinar las vocales en el texto ingresado por el usuario mediante el uso de una expresion regular
function esVocal(caracter) {
    return /^[aeiou]$/.test(caracter);
}
// Funcion que recibe una vocal como parametro y verifica su presencia en el mapa letrasEncriptadas
function agregarLetrasEncriptadas(vocal) {
    if(letrasEncriptadas.has(vocal)) {
        return letrasEncriptadas.get(vocal)
    }
    return vocal;
}


// function actualizarContMensaje() {
//     contenedorMensajeUsuario.innerHTML = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae minima debitis iste vero quis! Voluptatum odio, rem dolore aperiam inventore facere voluptas, nesciunt autem, illum explicabo ut delectus ea animi.`
//     contenedorMensaje.innerHTML = `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae minima debitis iste vero quis! Voluptatum odio, rem dolore aperiam inventore facere voluptas, nesciunt autem, illum explicabo ut delectus ea animi.</p>
//     <button id="boton-copiar">Copiar</button>`
// }