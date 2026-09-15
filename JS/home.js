document.addEventListener("DOMContentLoaded", function () {
    let nav = document.getElementById("menu-navegacion");
    let usuario = JSON.parse(localStorage.getItem("usuario_logueado"));

    if (usuario) {
        let botonCerrar = document.createElement("a");
        botonCerrar.href = "#";
        botonCerrar.textContent = `Cerrar sesión (${usuario.nombre})`;
        botonCerrar.style.color = "#c48b56";
        botonCerrar.addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("usuario_logueado");
            alert("Has cerrado sesión exitosamente.");
            window.location.href = "login.html";
        });
        nav.appendChild(botonCerrar);
    } else {
        nav.innerHTML += `
            <a href="registro.html">Registrarse</a>
            <a href="login.html">Iniciar sesión</a>
        `;
    }
});