const botonEncriptar = document.getElementById("boton-encriptar");
const contenedorMensaje = document.getElementById("contenedor-mensaje-procesado");
const contenedorMensajeUsuario = document.getElementById("mensaje-usuario");
botonEncriptar.addEventListener("click", actualizarContMensaje);

function actualizarContMensaje() {
    contenedorMensajeUsuario.innerHTML = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae minima debitis iste vero quis! Voluptatum odio, rem dolore aperiam inventore facere voluptas, nesciunt autem, illum explicabo ut delectus ea animi.`
    contenedorMensaje.innerHTML = `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae minima debitis iste vero quis! Voluptatum odio, rem dolore aperiam inventore facere voluptas, nesciunt autem, illum explicabo ut delectus ea animi.</p>
    <button id="boton-copiar">Copiar</button>`
}