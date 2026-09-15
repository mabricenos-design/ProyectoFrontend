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

    const mapaImagenes = {
        "PR001": "img/Polera.jpg",
        "PR002": "img/Jeans.png",
        "PR003": "img/Vestido.png",
        "PR004": "img/Blusa.png"
    };

    let pedido = JSON.parse(localStorage.getItem("ultimo_pedido"));
    let contenedor = document.getElementById("contenedor-estado");

    if (!pedido || !pedido.articulos || pedido.articulos.length === 0) {
        contenedor.innerHTML = `
            <div class="vacio-box">
                <p>No tienes ningún pedido activo en este momento.</p>
                <a href="productos.html" class="boton-accion" style="display: inline-block; width: auto; padding: 10px 25px;">Ir al catálogo</a>
            </div>
        `;
    } else {
        let subtotal = 0;
        let itemsHTML = "";

        pedido.articulos.forEach(function(item) {
            let sub = item.precio * item.cantidad;
            subtotal += sub;

            let rutaImagen = item.imagen || mapaImagenes[item.codigo] || (item.nombre && item.nombre.includes("Jeans") ? "img/Jeans.png" : (item.nombre && item.nombre.includes("Vestido") ? "img/Vestido.png" : (item.nombre && item.nombre.includes("Blusa") ? "img/Blusa.png" : "img/Polera.jpg")));

            itemsHTML += `
                <div class="item-fila">
                    <div class="item-detalle">
                        <div class="item-icono">
                            <img src="${rutaImagen}" alt="${item.nombre}">
                        </div>
                        <div>
                            <strong>${item.nombre}</strong>
                            <p class="item-subtexto">Talla: ${item.talla || 'M'} | Cantidad: ${item.cantidad}</p>
                        </div>
                    </div>
                    <strong>$${sub.toLocaleString("es-CL")}</strong>
                </div>
            `;
        });

        let envio = 3000;
        let total = subtotal + envio;

        contenedor.innerHTML = `
            <div class="caja-blanca">
                <div class="pedido-info-box">
                    <p><strong>N° Pedido:</strong> ${pedido.idPedido}</p>
                    <p><strong>Fecha de compra:</strong> ${pedido.fecha}</p>
                    <p><strong>Cliente:</strong> ${pedido.titular}</p>
                    <p><strong>Estado:</strong> <span class="badge-estado">${pedido.estado}</span></p>
                </div>

                <h3 style="margin-bottom: 15px;">Prendas compradas</h3>
                ${itemsHTML}
            </div>

            <aside class="carrito-resumen">
                <h3>Total pagado</h3>
                <div class="resumen-fila">
                    <span>Subtotal</span>
                    <span>$${subtotal.toLocaleString("es-CL")}</span>
                </div>
                <div class="resumen-fila">
                    <span>Envío</span>
                    <span>$${envio.toLocaleString("es-CL")}</span>
                </div>
                <div class="resumen-total">
                    <span>Total final</span>
                    <strong>$${total.toLocaleString("es-CL")}</strong>
                </div>
                <a href="productos.html" class="boton-accion">
                    Seguir comprando
                </a>
            </aside>
        `;
    }
});