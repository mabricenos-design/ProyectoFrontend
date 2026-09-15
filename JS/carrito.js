document.addEventListener("DOMContentLoaded", function () {
    // 1. Gestión del menú según la sesión del usuario
    let nav = document.getElementById("menu-navegacion");
    let usuario = JSON.parse(localStorage.getItem("usuario_logueado"));

    if (usuario && nav) {
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
    } else if (nav) {
        nav.innerHTML += `
            <a href="registro.html">Registrarse</a>
            <a href="login.html">Iniciar sesión</a>
        `;
    }

    // 2. Cargar los elementos del carrito
    cargarCarrito();
});

function cargarCarrito() {
    let contenedorItems = document.querySelector(".carrito-items");
    let elemSubtotal = document.getElementById("resumen-subtotal");
    let elemEnvio = document.getElementById("resumen-envio");
    let elemTotal = document.getElementById("resumen-total");

    if (!contenedorItems) return;

    let carrito = JSON.parse(localStorage.getItem("carrito_compras")) || [];
    let subtotalGeneral = 0;

    contenedorItems.innerHTML = "";

    if (carrito.length === 0) {
        contenedorItems.innerHTML = "<p style='padding: 20px; text-align: center; color: #666;'>Tu carrito está vacío. ¡Agrega productos desde el catálogo!</p>";
        if (elemSubtotal) elemSubtotal.textContent = "$0";
        if (elemEnvio) elemEnvio.textContent = "$0";
        if (elemTotal) elemTotal.textContent = "$0";
        return;
    }

    const mapaFotos = {
        "PR001": "img/Polera.jpg",
        "PR002": "img/Jeans.png",
        "PR003": "img/Vestido.png",
        "PR004": "img/Blusa.png"
    };

    carrito.forEach((item, index) => {
        subtotalGeneral += item.subtotal;

        let rutaFoto = item.imagen || mapaFotos[item.codigo] || "img/Polera.jpg";

        let articulo = document.createElement("article");
        articulo.className = "carrito-card";
        articulo.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 15px; border-bottom: 1px solid #e8ded4; margin-bottom: 10px; background: #ffffff; border-radius: 8px;";

        articulo.innerHTML = `
            <div style="width: 65px; height: 65px; margin-right: 15px; border-radius: 8px; overflow: hidden; border: 1px solid #e8ded4; flex-shrink: 0;">
                <img src="${rutaFoto}" alt="${item.nombre}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
            </div>
            <div style="flex-grow: 1;">
                <h3 style="margin: 0; font-size: 1.1rem; color: #3c2f28;">${item.nombre}</h3>
                <p style="margin: 4px 0; color: #7b6f66; font-size: 0.9rem;">
                    Código: <strong>${item.codigo}</strong> | Talla: <strong>${item.talla}</strong>
                </p>
                <span style="color: #a26532; font-weight: 600;">$${item.precio.toLocaleString("es-CL")} c/u</span>
            </div>
            <div style="margin: 0 15px; text-align: center;">
                <span style="font-weight: bold; font-size: 0.95rem; background: #faf8f5; border: 1px solid #e8ded4; padding: 4px 10px; border-radius: 4px; color: #3c2f28;">Cant: ${item.cantidad}</span>
            </div>
            <div style="text-align: right;">
                <strong style="display: block; font-size: 1.1rem; margin-bottom: 8px; color: #3c2f28;">$${item.subtotal.toLocaleString("es-CL")}</strong>
                <button class="btn-eliminar" data-index="${index}" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                    Eliminar
                </button>
            </div>
        `;

        contenedorItems.appendChild(articulo);
    });

    document.querySelectorAll(".btn-eliminar").forEach(boton => {
        boton.addEventListener("click", function() {
            let index = parseInt(this.getAttribute("data-index"));
            eliminarProducto(index);
        });
    });

    let costoEnvio = 3500;
    let totalGeneral = subtotalGeneral + costoEnvio;

    if (elemSubtotal) elemSubtotal.textContent = "$" + subtotalGeneral.toLocaleString("es-CL");
    if (elemEnvio) elemEnvio.textContent = "$" + costoEnvio.toLocaleString("es-CL");
    if (elemTotal) elemTotal.textContent = "$" + totalGeneral.toLocaleString("es-CL");
}

function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito_compras")) || [];
    let itemEliminado = carrito[index];

    if (itemEliminado) {
        let stockActual = localStorage.getItem("stock_" + itemEliminado.codigo);
        if (stockActual !== null) {
            let nuevoStock = parseInt(stockActual) + itemEliminado.cantidad;
            localStorage.setItem("stock_" + itemEliminado.codigo, nuevoStock);
        }

        carrito.splice(index, 1);
        localStorage.setItem("carrito_compras", JSON.stringify(carrito));
        cargarCarrito();
    }
}