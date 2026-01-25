let productos = [
    {
        nombre: "Laptop Gamer Pro",
        precio: 1299.99,
        descripcion: "Potente laptop para gaming con RTX 4070 y procesador i9"
    },
    {
        nombre: "Smartphone Ultra",
        precio: 899.99,
        descripcion: "Teléfono inteligente con cámara de 108MP y batería de 5000mAh"
    },
    {
        nombre: "Auriculares Inalámbricos",
        precio: 199.99,
        descripcion: "Auriculares con cancelación de ruido y 30 horas de batería"
    },
    {
        nombre: "Monitor 4K",
        precio: 459.99,
        descripcion: "Monitor de 27 pulgadas con resolución 4K y 144Hz"
    },
    {
        nombre: "Teclado Mecánico",
        precio: 89.99,
        descripcion: "Teclado mecánico RGB con switches táctiles"
    }
];

// Productos aleatorios para agregar
const productosAleatorios = [
    {
        nombre: "Mouse Gaming",
        precio: 59.99,
        descripcion: "Mouse ergonómico con DPI ajustable y RGB"
    },
    {
        nombre: "Tablet Pro",
        precio: 749.99,
        descripcion: "Tablet con pantalla OLED y lápiz digital incluido"
    },
    {
        nombre: "Altavoz Bluetooth",
        precio: 129.99,
        descripcion: "Altavoz portátil con sonido 360° y resistencia al agua"
    },
    {
        nombre: "Smartwatch Deportivo",
        precio: 249.99,
        descripcion: "Reloj inteligente con GPS y monitor de frecuencia cardíaca"
    },
    {
        nombre: "Cámara 4K",
        precio: 599.99,
        descripcion: "Cámara compacta con estabilización de imagen y zoom óptico"
    }
];

// Referencias a elementos del DOM
const productList = document.getElementById('productList');
const addProductBtn = document.getElementById('addProductBtn');
const addRandomBtn = document.getElementById('addRandomBtn');
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const productDescriptionInput = document.getElementById('productDescription');
const messageDiv = document.getElementById('message');

// Función para formatear el precio
function formatearPrecio(precio) {
    return `$${precio.toFixed(2)}`;
}

// Función para crear la plantilla HTML de un producto
function crearPlantillaProducto(producto, index) {
    return `
        <li class="product-item" data-index="${index}">
            <h3 class="product-name">${producto.nombre}</h3>
            <div class="product-price">${formatearPrecio(producto.precio)}</div>
            <p class="product-description">${producto.descripcion}</p>
            <button class="btn eliminar-btn" onclick="eliminarProducto(${index})" 
                    style="background-color: #e74c3c; margin-top: 10px;">
                🗑️ Eliminar
            </button>
        </li>
    `;
}

// Función para renderizar todos los productos
function renderizarProductos() {
    if (productos.length === 0) {
        productList.innerHTML = `
            <li class="empty-message">
                No hay productos en la lista. ¡Agrega el primero!
            </li>
        `;
        return;
    }
    
    productList.innerHTML = productos.map((producto, index) => 
        crearPlantillaProducto(producto, index)
    ).join('');
}

// Función para agregar un nuevo producto
function agregarProducto(nombre, precio, descripcion) {
    // Validar los datos
    if (!nombre.trim() || !descripcion.trim() || precio <= 0) {
        mostrarMensaje('Por favor, completa todos los campos correctamente', 'error');
        return;
    }
    
    const nuevoProducto = {
        nombre: nombre.trim(),
        precio: parseFloat(precio),
        descripcion: descripcion.trim()
    };
    
    productos.push(nuevoProducto);
    renderizarProductos();
    mostrarMensaje('✅ Producto agregado exitosamente', 'success');
    
    // Limpiar formulario
    limpiarFormulario();
}

// Función para agregar un producto aleatorio
function agregarProductoAleatorio() {
    const randomIndex = Math.floor(Math.random() * productosAleatorios.length);
    const productoAleatorio = productosAleatorios[randomIndex];
    
    productos.push({...productoAleatorio});
    renderizarProductos();
    mostrarMensaje('🎲 Producto aleatorio agregado', 'success');
}

// Función para eliminar un producto
function eliminarProducto(index) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        productos.splice(index, 1);
        renderizarProductos();
        mostrarMensaje('🗑️ Producto eliminado', 'success');
    }
}

// Función para mostrar mensajes temporales
function mostrarMensaje(texto, tipo) {
    messageDiv.textContent = texto;
    messageDiv.className = `message ${tipo === 'success' ? 'success' : ''}`;
    messageDiv.style.display = 'block';
    
    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

// Función para limpiar el formulario
function limpiarFormulario() {
    productNameInput.value = '';
    productPriceInput.value = '';
    productDescriptionInput.value = '';
    productNameInput.focus();
}

// Función para validar el formulario
function validarFormulario() {
    const nombre = productNameInput.value.trim();
    const precio = parseFloat(productPriceInput.value);
    const descripcion = productDescriptionInput.value.trim();
    
    if (!nombre) {
        mostrarMensaje('El nombre del producto es requerido', 'error');
        return false;
    }
    
    if (!precio || precio <= 0) {
        mostrarMensaje('El precio debe ser mayor a 0', 'error');
        return false;
    }
    
    if (!descripcion) {
        mostrarMensaje('La descripción es requerida', 'error');
        return false;
    }
    
    return true;
}

// Event Listeners
addProductBtn.addEventListener('click', () => {
    if (validarFormulario()) {
        agregarProducto(
            productNameInput.value,
            productPriceInput.value,
            productDescriptionInput.value
        );
    }
});

addRandomBtn.addEventListener('click', agregarProductoAleatorio);

// Permitir agregar producto con Enter en cualquier campo del formulario
[productNameInput, productPriceInput, productDescriptionInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && validarFormulario()) {
            agregarProducto(
                productNameInput.value,
                productPriceInput.value,
                productDescriptionInput.value
            );
        }
    });
});

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    
    // Mostrar instrucciones iniciales
    setTimeout(() => {
        mostrarMensaje('¡Bienvenido! Puedes agregar productos usando el formulario o el botón de producto aleatorio', 'success');
    }, 500);
});

// Hacer las funciones disponibles globalmente para los botones de eliminar
window.eliminarProducto = eliminarProducto;