const botonEncriptar = document.getElementById("boton-encriptar");
const botonDesencriptar = document.getElementById("boton-desencriptar");
const contenedorMensaje = document.getElementById("contenedor-mensaje-procesado");
const contenedorMensajeUsuario = document.getElementById("contenedor-mensaje-usuario");
const mensajeUsuario = document.getElementById("mensaje-usuario");
botonEncriptar.addEventListener("click", validarMensaje);
botonDesencriptar.addEventListener("click", validarMensaje);

function validarMensaje() {
    let mensajeRecibido = mensajeUsuario.value.toLowerCase();
    if (/\d/.test(mensajeRecibido)) {
        contenedorMensaje.innerHTML = `<img class="muñeco" src="./assets/img/Muñeco.png" alt="imagen-persona-buscando">
        <div id="mensajes-predeterminados">
            <p class="primer-parrafo">El mensaje no debe tener numeros</p>
            <p class="primer-parrafo">Ingresa otro mensaje</p>
        </div>`
        return;
    }
    if (mensajeRecibido.normalize("NFD").match(/[\u0300-\u036f]/g)) {
        contenedorMensaje.innerHTML = `<img class="muñeco" src="./assets/img/Muñeco.png" alt="imagen-persona-buscando">
        <div id="mensajes-predeterminados">
            <p class="primer-parrafo">El mensaje no debe tener letras con acentos</p>
            <p class="primer-parrafo">Ingresa otro mensaje</p>
        </div>`
        return;
    }
    if(mensajeRecibido.length === 0){
        contenedorMensaje.innerHTML = `<img class="muñeco" src="./assets/img/Muñeco.png" alt="imagen-persona-buscando">
        <div id="mensajes-predeterminados">
            <p class="primer-parrafo">Ningun mensaje fue encontrado</p>
            <p class="segundo-parrafo">Ingresa el texto que deseas encriptar o desencriptar</p>
        </div>`
    } else {
        console.log(mensajeRecibido);
        contenedorMensaje.innerHTML = ` `;
        return;
    }
}

// function actualizarContMensaje() {
//     contenedorMensajeUsuario.innerHTML = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae minima debitis iste vero quis! Voluptatum odio, rem dolore aperiam inventore facere voluptas, nesciunt autem, illum explicabo ut delectus ea animi.`
//     contenedorMensaje.innerHTML = `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae minima debitis iste vero quis! Voluptatum odio, rem dolore aperiam inventore facere voluptas, nesciunt autem, illum explicabo ut delectus ea animi.</p>
//     <button id="boton-copiar">Copiar</button>`
// }