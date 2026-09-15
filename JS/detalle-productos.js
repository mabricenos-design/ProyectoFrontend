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

    const productos = {
        "PR001": {
            nombre: "Polera básica de algodón",
            categoria: "HOMBRE",
            imagen: "img/Polera.jpg",
            precio: 12000,
            stockInicial: 45,
            descripcion: "Polera confeccionada en 100% algodón suave y transpirable. Corte regular clásico, ideal para combinar con cualquier prenda y para uso diario."
        },
        "PR002": {
            nombre: "Jeans Slim Fit",
            categoria: "HOMBRE",
            imagen: "img/Jeans.png",
            precio: 25000,
            stockInicial: 30,
            descripcion: "Jeans de corte Slim Fit con mezclilla elástica de alta durabilidad. Perfectos para un estilo casual y moderno."
        },
        "PR003": {
            nombre: "Vestido floral",
            categoria: "MUJER",
            imagen: "img/Vestido.png",
            precio: 35000,
            stockInicial: 20,
            descripcion: "Vestido corto con estampado floral, tela ligera y corte fresco ideal para temporadas cálidas."
        },
        "PR004": {
            nombre: "Blusa de seda",
            categoria: "MUJER",
            imagen: "img/Blusa.png",
            precio: 28000,
            stockInicial: 15,
            descripcion: "Blusa elegante de acabado satinado tipo seda. Suave al tacto y perfecta para ocasiones formales o de oficina."
        }
    };

    let params = new URLSearchParams(window.location.search);
    let codigo = params.get("id") || "PR001";
    let producto = productos[codigo] || productos["PR001"];

    let stock = localStorage.getItem("stock_" + codigo);
    if (stock === null) {
        stock = producto.stockInicial;
    } else {
        stock = parseInt(stock);
    }

    document.querySelector(".detalle-imagen").innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: 380px; object-fit: cover; border-radius: 12px; display: block;">
    `;
    document.querySelector(".categoria-badge").textContent = producto.categoria;
    document.querySelector(".detalle-info h2").textContent = producto.nombre;
    document.querySelector(".detalle-codigo strong").textContent = codigo;
    document.querySelector(".detalle-precio strong").textContent = "$" + producto.precio.toLocaleString("es-CL");
    document.querySelector(".detalle-descripcion").textContent = producto.descripcion;

    let spanStock = document.querySelector(".stock-disponible");
    spanStock.textContent = "Stock disponible: " + stock + " unidades";

    let inputCantidad = document.getElementById("cantidad");
    inputCantidad.max = stock;

    document.getElementById("btnAgregar").addEventListener("click", function(e) {
        e.preventDefault();

        let usuarioActual = JSON.parse(localStorage.getItem("usuario_logueado"));

        if (!usuarioActual) {
            alert("Debes iniciar sesión o registrarte para poder agregar productos al carrito.");
            window.location.href = "registro.html";
            return;
        }

        let cantidad = parseInt(inputCantidad.value);
        let talla = document.getElementById("talla").value;

        if (cantidad <= stock && cantidad > 0) {
            stock = stock - cantidad;
            localStorage.setItem("stock_" + codigo, stock);

            let carrito = JSON.parse(localStorage.getItem("carrito_compras")) || [];
            let itemExistente = carrito.find(item => item.codigo === codigo && item.talla === talla);

            if (itemExistente) {
                itemExistente.cantidad += cantidad;
                itemExistente.subtotal = itemExistente.cantidad * itemExistente.precio;
            } else {
                carrito.push({
                    codigo: codigo,
                    nombre: producto.nombre,
                    imagen: producto.imagen,
                    precio: producto.precio,
                    talla: talla,
                    cantidad: cantidad,
                    subtotal: producto.precio * cantidad
                });
            }

            localStorage.setItem("carrito_compras", JSON.stringify(carrito));
            alert("¡Producto agregado al carrito exitosamente!");
            window.location.href = "carrito.html";
        } else {
            alert("La cantidad seleccionada supera el stock disponible o es inválida.");
        }
    });
});