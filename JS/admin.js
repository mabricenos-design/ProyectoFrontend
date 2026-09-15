document.addEventListener("DOMContentLoaded", function () {
    let usuario = JSON.parse(localStorage.getItem("usuario_logueado"));

    
    if (!usuario || usuario.rol !== "administrador") {
        alert("Acceso denegado. Debe iniciar sesión como Administrador.");
        window.location.href = "../login.html";
        return;
    }

    
    let btnCerrarSesion = document.querySelector("a[href='../login.html']");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("usuario_logueado");
            alert("Has cerrado sesión exitosamente.");
            window.location.href = "../login.html";
        });
    }
});