let productosData = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// 1. Cargar productos desde nuestra API (Backend)
async function cargarProductos() {
    try {
        const response = await fetch('/api/productos');
        productosData = await response.json();
        renderizarProductos();
        actualizarContador();
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

// 2. Renderizar tarjetas de productos (Vista dinámica)
function renderizarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    const filtro = document.getElementById('filtroCategoria').value;
    
    contenedor.innerHTML = '';

    const productosFiltrados = filtro === 'Todos' 
        ? productosData 
        : productosData.filter(p => p.categoria === filtro);

    productosFiltrados.forEach(producto => {
        contenedor.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <span class="badge bg-primary categoria-badge">${producto.categoria}</span>
                    <img src="${producto.imagen_url}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text text-muted small">${producto.descripcion}</p>
                        <h6 class="text-primary mt-auto">$${parseFloat(producto.precio).toLocaleString()}</h6>
                        <button onclick="agregarAlCarrito(${producto.id})" class="btn btn-dark mt-2">
                            Añadir al Carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// 3. Lógica del Carrito (Requisito 5 del Alcance)
function agregarAlCarrito(id) {
    const producto = productosData.find(p => p.id === id);
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    alert(`${producto.nombre} añadido al carrito`);
}

function actualizarContador() {
    document.getElementById('cart-count').innerText = carrito.length;
}

// Inicializar
cargarProductos();