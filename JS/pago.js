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

    let formPago = document.getElementById("pagoForm");
    if (formPago) {
        formPago.addEventListener("submit", function (event) {
            event.preventDefault();
            let carrito = JSON.parse(localStorage.getItem('carrito_compras')) || [];
            let usuarioActual = JSON.parse(localStorage.getItem('usuario_logueado'));
            let nombreTitular = document.getElementById('titular').value;

            let pedido = {
                idPedido: 'PED-' + Math.floor(1000 + Math.random() * 9000),
                fecha: new Date().toLocaleDateString('es-CL'),
                titular: nombreTitular || (usuarioActual ? usuarioActual.nombre : 'Cliente'),
                articulos: carrito,
                estado: 'En preparación'
            };
            
            localStorage.setItem('ultimo_pedido', JSON.stringify(pedido));
            localStorage.removeItem('carrito_compras');
            alert('¡Pago realizado con éxito! Redirigiendo a tu pedido...');
            window.location.href = 'estadoPedido.html';
        });
    }
});