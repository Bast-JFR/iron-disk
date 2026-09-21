document.addEventListener('DOMContentLoaded', () => {
    //  todos los botones de "Añadir al carrito" (ojo: los busco solo dentro de .acciones-compra
    //  porque el boton "Proceder al Pago" del carrito.html usa la misma clase btn-primario
    //  y no quiero que le agarre el click a ese)
    const botonesAgregar = document.querySelectorAll('.acciones-compra .btn-primario');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            //  contenedor principal del disco donde se hizo clic
            const contenedorDisco = e.target.closest('.detalle-grid');
            
            // 3. Extraemos la información directamente de tu HTML
            const titulo = contenedorDisco.querySelector('h2').innerText;
            const artista = contenedorDisco.querySelector('.artista-detalle').innerText;
            const precioTexto = contenedorDisco.querySelector('.precio-detalle').innerText;
            const imagenSrc = contenedorDisco.querySelector('.detalle-imagen img').src;
            const cantidad = parseInt(contenedorDisco.querySelector('input[type="number"]').value);

            // 
            const precio = parseInt(precioTexto.replace('$', '').replace('.', ''));

            // 4. Armamos el "paquete" con los datos del disco
            const productoNuevo = {
                titulo: titulo,
                artista: artista,
                precio: precio,
                cantidad: cantidad,
                imagen: imagenSrc
            };

            // 5. Lo enviamos a la función que guarda en localStorage
            guardarEnLocalStorage(productoNuevo);
        });
    });

    // Esto corre en cualquier pagina que tenga el script cargado: pinta el numerito
    // del carrito en el header y, si estoy en carrito.html, pinta la lista completa
    actualizarContadorCarrito();
    renderizarCarrito();
});

function guardarEnLocalStorage(producto) {
    // A. Traemos el carrito actual de la memoria (si está vacío, creamos un arreglo [])
    let carrito = JSON.parse(localStorage.getItem('carritoIronDisk')) || [];

    // B. Verificamos si este disco ya estaba en el carrito
    const existe = carrito.findIndex(item => item.titulo === producto.titulo);

    if (existe !== -1) {
        // Si ya está, solo le sumamos la nueva cantidad
        carrito[existe].cantidad += producto.cantidad;
    } else {
        // Si es nuevo, lo agregamos a la lista
        carrito.push(producto);
    }

    // C. Guardamos la lista actualizada de vuelta en el localStorage
    localStorage.setItem('carritoIronDisk', JSON.stringify(carrito));

    // D. Damos un aviso visual para que el usuario sepa que funcionó
    alert(`¡Añadiste ${producto.cantidad} unidad(es) de "${producto.titulo}" al carrito!`);

    // E. Refrescamos el numerito del header por si ya estoy viendo el carrito abierto en otra pestaña
    actualizarContadorCarrito();
}

// Pinta en carrito.html todos los discos guardados en localStorage, con su cantidad y el total
function renderizarCarrito() {
    const contenedor = document.getElementById('contenedor-items-carrito');

    // si el elemento no existe es porque no estoy en carrito.html, asi que no hago nada
    if (!contenedor) return;

    const carrito = JSON.parse(localStorage.getItem('carritoIronDisk')) || [];
    const totalCarritoSpan = document.getElementById('total-carrito');

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="carrito-vacio">Tu carrito esta vacio. <a href="productos.html">Ir a productos</a></p>';
        totalCarritoSpan.innerText = '0';
        return;
    }

    let total = 0;

    // armamos una fila por cada disco guardado
    contenedor.innerHTML = carrito.map((producto, indice) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        return `
            <div class="carrito-item">
                <img src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-item-info">
                    <h3>${producto.titulo}</h3>
                    <p class="artista">${producto.artista}</p>
                    <p class="carrito-item-cantidad">Cantidad: ${producto.cantidad}</p>
                </div>
                <p class="carrito-item-subtotal">$${subtotal.toLocaleString('es-CL')}</p>
                <button class="btn-quitar-item" data-indice="${indice}">Quitar</button>
            </div>
        `;
    }).join('');

    totalCarritoSpan.innerText = total.toLocaleString('es-CL');

    // enganchamos el boton "Quitar" de cada fila que acabamos de crear
    contenedor.querySelectorAll('.btn-quitar-item').forEach(boton => {
        boton.addEventListener('click', (e) => {
            eliminarDelCarrito(e.target.dataset.indice);
        });
    });
}

// Saca un disco del carrito segun su posicion en el arreglo y vuelve a pintar todo
function eliminarDelCarrito(indice) {
    let carrito = JSON.parse(localStorage.getItem('carritoIronDisk')) || [];
    carrito.splice(indice, 1);
    localStorage.setItem('carritoIronDisk', JSON.stringify(carrito));

    renderizarCarrito();
    actualizarContadorCarrito();
}

// Suma la cantidad de todos los discos guardados y la muestra en el iconito del carrito del header
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carritoIronDisk')) || [];
    const totalUnidades = carrito.reduce((acumulado, producto) => acumulado + producto.cantidad, 0);

    document.querySelectorAll('.contador-carrito').forEach(span => {
        span.innerText = totalUnidades;
    });
}