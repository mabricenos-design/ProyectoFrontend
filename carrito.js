let botones = document.querySelectorAll(".boton-producto");

botones.forEach(function(boton) {
    boton.addEventListener("click", function() {
        let numeroStock = parseInt(boton.getAttribute("data-stock"));

        if (numeroStock > 0) {
            numeroStock = numeroStock - 1;
            boton.setAttribute("data-stock", numeroStock);

            let stockTexto = boton.parentElement.querySelector(".stock-disponible");
            stockTexto.textContent = "Stock: " + numeroStock;

            let tarjeta = boton.closest(".producto-card");
            let nombre = tarjeta.querySelector("h3").textContent;
            let icono = tarjeta.querySelector(".producto-icono").textContent.trim();
            let precioTexto = tarjeta.querySelector(".producto-info strong").textContent;
            let precio = parseInt(precioTexto.replace("$", "").replace(".", ""));
            let codigo = boton.getAttribute("data-producto");

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            let encontrado = carrito.find(function(item) {
                return item.codigo === codigo;
            });

            if (encontrado) {
                encontrado.cantidad = encontrado.cantidad + 1;
            } else {
                carrito.push({
                    codigo: codigo,
                    nombre: nombre,
                    icono: icono,
                    precio: precio,
                    cantidad: 1
                });
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));
            alert("Producto agregado al carrito");

        } else {
            alert("Producto sin stock disponible");
        }
    });
});

let contenedorCarrito = document.querySelector(".carrito-items");

if (contenedorCarrito) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let subtotalCompra = 0;

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p style='padding: 20px; color: #78716c;'>No has agregado ninguna prenda todavía.</p>";
    } else {
        carrito.forEach(function(item) {
            let totalPrenda = item.precio * item.cantidad;
            subtotalCompra = subtotalCompra + totalPrenda;

            let articulo = document.createElement("article");
            articulo.className = "carrito-card";
            articulo.innerHTML = `
                <div class="carrito-item-icono">${item.icono}</div>
                <div class="carrito-item-detalles">
                    <h3>${item.nombre}</h3>
                    <p class="carrito-sub">Código: ${item.codigo}</p>
                    <span class="carrito-precio-unitario">$${item.precio.toLocaleString("es-CL")}</span>
                </div>
                <div class="carrito-item-cantidad">
                    <span style="font-weight: bold; font-size: 14px;">Cant: ${item.cantidad}</span>
                </div>
                <div class="carrito-item-subtotal">
                    <strong>$${totalPrenda.toLocaleString("es-CL")}</strong>
                </div>
            `;
            contenedorCarrito.appendChild(articulo);
        });

        let envio = 3500;
        let totalFinal = subtotalCompra + envio;

        document.getElementById("resumen-subtotal").textContent = "$" + subtotalCompra.toLocaleString("es-CL");
        document.getElementById("resumen-envio").textContent = "$" + envio.toLocaleString("es-CL");
        document.getElementById("resumen-total").textContent = "$" + totalFinal.toLocaleString("es-CL");
    }
}