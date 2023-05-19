const botonEncriptar = document.getElementById("boton-encriptar");
const botonDesencriptar = document.getElementById("boton-desencriptar");
const contenedorMensaje = document.getElementById("contenedor-mensaje-procesado");
const mensajeUsuario = document.getElementById("mensaje-usuario");

const letrasEncriptadas = new Map([
    ['a', 'ai'],
    ['e', 'enter'],
    ['i', 'imes'],
    ['o', 'ober'],
    ['u', 'ufat']
]);

botonEncriptar.addEventListener("click", () => {
    validarMensaje("encriptar")
});
botonDesencriptar.addEventListener("click", () => {
    validarMensaje("desencriptar")
});

// Funcion que verifica que el mensaje ingresado por el usuario sea válido
function validarMensaje(accion) {
    let mensajeRecibido = mensajeUsuario.value.toLowerCase();
    // Verifica que el texto no tenga numeros y muestra mensaje de error
    if (encontrarNumeros(mensajeRecibido)) {
        mostrarMensajeError("El mensaje no debe tener números", "Ingresa otro mensaje");
        return;
    }
    // Verifica que el texto no tenga caracteres con acento y muestra mensaje de error
    if (encontrarAcentos(mensajeRecibido)) {
        mostrarMensajeError("El mensaje no debe tener letras con acentos", "Ingresa otro mensaje");
        return;
    }
    // Verifica que no se ingrese un mensaje vacio y muestra mensaje de error
    if(rechazarMensajeVacio(mensajeRecibido)) {
        mostrarMensajeError("Ningún mensaje fue encontrado", "Ingresa otro mensaje");
        return;
    }
    // Si el mensaje es correcto y se presiono el boton de encriptar, se valida que el mensaje no este ya encriptado, de ser asi muestra error. Si no esta encriptado se llama a la funcion encriptarTexto.
    if(accion === "encriptar") {
        if(esTextoEncriptado(mensajeRecibido)) {
            mostrarMensajeError("El mensaje ya está encriptado", "Ingresa otro mensaje");
            return;
        } else {
            let mensaje = encriptarTexto(mensajeRecibido);
            contenedorMensaje.innerHTML = `<p>${mensaje}</p><br> <button id="boton-copiar">Copiar</button>`;
            return;
        }   
    } 
    // Si el mensaje es correcto y se presiono el boton de desencriptar, se valida que el mensaje no este ya desencriptado, de ser asi muestra error. Si no esta desencriptado se llama a la funcion desEncriptarTexto.
    if(accion === "desencriptar") {
        if(esTextoDesencriptado(mensajeRecibido)) {
            mostrarMensajeError("El mensaje ya está desencriptado", "Ingresa otro mensaje");
            return;
        } else {
            let mensajeDesencriptado = desEncriptarMensaje(mensajeRecibido);
            contenedorMensaje.innerHTML = `<p>${mensajeDesencriptado}</p><br> <button id="boton-copiar">Copiar</button>`;
            return;
        }
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
// Funcion auxiliar para validar un mensaje sin umeros
function encontrarNumeros(texto) {
    return /\d/.test(texto);
}
// Funcion auxiliar para validar que el mensaje no tenga caracteres con acento
function encontrarAcentos(texto) {
    return texto.normalize("NFD").match(/[\u0300-\u036f]/g);
}
// Funcion auxiliar para validar que no se ingrese un mensaje vacio
function rechazarMensajeVacio(texto) {
    if(texto.length === 0) {
        return true;
    }
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
// Función auxiliar para verificar si el texto ya está encriptado
function esTextoEncriptado(texto) {
    const valoresEncriptados = Array.from(letrasEncriptadas.values());
    return valoresEncriptados.some(valor => texto.includes(valor));
}
// Función auxiliar para verificar si el texto ya está desencriptado
function esTextoDesencriptado(texto) {
    const expresionRegular = /ai|enter|imes|ober|ufat/;
    return !expresionRegular.test(texto);
}
// Funcion para desencriptar mensaje
function desEncriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    letrasEncriptadas.forEach((valor, clave) => {
        mensajeDesencriptado = mensajeDesencriptado.split(valor).join(clave);
    })
    return mensajeDesencriptado;
}
// Funcion auxiliar para mostrar diversos errores al usuario en el area de menajes
function mostrarMensajeError(mensaje, mensajeAdicional = "") {
    contenedorMensaje.innerHTML = `<img class="muñeco" src="./assets/img/Muñeco.png" alt="imagen-persona-buscando">
    <div id="mensajes-predeterminados">
        <p class="primer-parrafo">${mensaje}</p>
        <p class="primer-parrafo">${mensajeAdicional}</p>
    </div>`;
}