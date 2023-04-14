// Seleccionamos los botones "Agregar al carrito"
var botonesAgregarCarrito = document.querySelectorAll('.producto button');

// Recorremos los botones y les asignamos un evento "click"
botonesAgregarCarrito.forEach(function(boton) {
    boton.addEventListener('click', function() {
        // Seleccionamos el div padre del botón
        var producto = boton.parentElement;
        // Creamos un objeto con la información del producto
        var infoProducto = {
            nombre: producto.querySelector('h3').textContent,
            precio: producto.querySelector('p:last-of-type').textContent,
            cantidad: 1 // Por defecto, agregamos una unidad al carrito
        };
        // Llamamos a la función para agregar el producto al carrito
        agregarAlCarrito(infoProducto);
    });
});

// Esta función recibe un objeto con la información del producto a agregar al carrito
function agregarAlCarrito(producto) {
    // Seleccionamos la lista del carrito
    var listaCarrito = document.querySelector('.carrito ul');
    // Buscamos si ya existe el producto en el carrito
    var itemCarrito = listaCarrito.querySelector('li[data-nombre="' + producto.nombre + '"]');
    // Si el producto ya existe en el carrito, le aumentamos la cantidad
    if(itemCarrito) {
        itemCarrito.querySelector('span.cantidad').textContent++;
    } else {
        // Si es un producto nuevo, lo agregamos al carrito
        var nuevoItem = document.createElement('li');
        nuevoItem.dataset.nombre = producto.nombre;
        nuevoItem.innerHTML = `
            ${producto.nombre} | Precio: ${producto.precio} | Cantidad: <span class="cantidad">1</span>
            <button class="borrar-item">X</button>
        `;
        listaCarrito.appendChild(nuevoItem);
        // Le asignamos un evento "click" al botón para borrar item
        nuevoItem.querySelector('.borrar-item').addEventListener('click', function() {
            nuevoItem.remove();
            // Recalculamos el total
            calcularTotal();
        });
    }
    // Recalculamos el total
    calcularTotal();
}

// Esta función calcula el total de la compra y lo muestra en pantalla
function calcularTotal() {
    // Seleccionamos todos los items del carrito
    var itemsCarrito = document.querySelectorAll('.carrito li');
    // Inicializamos el total en cero
    var total = 0;
    // Recorremos todos los items y vamos sumando sus precios multiplicados por la cantidad
    itemsCarrito.forEach(function(item) {
        var precio = item.querySelector('span').textContent * parseFloat(item.querySelector('p').textContent.substr(8));
        total += precio;
    });
    // Mostramos el total en pantalla
    document.querySelector('#total').textContent = total.toFixed(2);
}