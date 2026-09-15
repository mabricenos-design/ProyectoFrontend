document.getElementById("form-registro").addEventListener("submit", function (e) {
    e.preventDefault();

    let pass = document.getElementById("password").value;
    let passConfirm = document.getElementById("confirm-password").value;

    if (pass !== passConfirm) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    let usuario = {
        nombre: document.getElementById("nombre").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        password: pass
    };

    localStorage.setItem("cuenta_registrada", JSON.stringify(usuario));
    localStorage.setItem("usuario_logueado", JSON.stringify(usuario));

    alert("¡Cuenta creada con éxito! Sesión iniciada.");
    window.location.href = "productos.html";
});