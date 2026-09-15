document.getElementById("form-login").addEventListener("submit", function(e) {
    e.preventDefault();

    let correoIngresado = document.getElementById("correo").value.trim().toLowerCase();
    let passIngresada = document.getElementById("password").value.trim();

    if (correoIngresado === "admin@modaexpress.cl" && passIngresada === "admin123") {
        let adminUser = {
            nombre: "Administrador",
            correo: correoIngresado,
            rol: "administrador"
        };
        localStorage.setItem("usuario_logueado", JSON.stringify(adminUser));
        alert("¡Bienvenido al Panel de Administración!");
        window.location.href = "Administrador/Administrador.html";
        return;
    }

    
    let cuentaGuardada = JSON.parse(localStorage.getItem("cuenta_registrada"));

    if (cuentaGuardada && cuentaGuardada.correo.toLowerCase() === correoIngresado && cuentaGuardada.password === passIngresada) {
        localStorage.setItem("usuario_logueado", JSON.stringify(cuentaGuardada));
        alert("Bienvenido de nuevo, " + cuentaGuardada.nombre);
        window.location.href = "productos.html";
    } else if (correoIngresado.length > 0 && passIngresada.length > 0) {
        
        let usuarioGenerico = {
            nombre: correoIngresado.split("@")[0],
            correo: correoIngresado,
            rol: "cliente"
        };
        localStorage.setItem("usuario_logueado", JSON.stringify(usuarioGenerico));
        alert("Inicio de sesión exitoso.");
        window.location.href = "productos.html";
    } else {
        alert("Por favor completa los campos.");
    }
});