let listaProductos = JSON.parse(localStorage.getItem("producto")) || [];
// let listaProductos = [];
let contadorProductos = 0;
let total = 0;

//Contador productos
const actualizarCarrito = () => {
    const Total = document.getElementById('total');
    contadorProductos = listaProductos.length;
    if (Total) {
        if (listaProductos.length > 0) {
            console.log('listaProductos');
            console.log(listaProductos);
            let suma = 0;
            listaProductos.forEach((item, index) => {
                suma += parseInt(item.precio) * item.cantidad;
            });
            total = suma
        } else {
            total = 0;
        }
        Total.innerHTML = `Total: $${total}`;
    }
}


//set items
const guardarProductoCarrito = (id, categoria, marca, precio, nombreProducto, imagen) => {
    const producto = { id, categoria, marca, precio, nombreProducto, imagen, cantidad: 1 };
    const productos = listaProductos;
    let existeProducto = false;
    let indexProducto = -1;
    if (productos.length > 0) {
        productos.forEach((item, index) => {
            if (item.id === producto.id) {
                existeProducto = true
                indexProducto = index;
            }
        });
    }

    if (existeProducto) {
        listaProductos[indexProducto].cantidad++;
    } else {
        listaProductos.push(producto);
    }
    localStorage.setItem("producto", JSON.stringify(listaProductos))
    actualizarCarrito();
}

const sumarProductoCarrito = (id) => {
    const productos = listaProductos;
    productos.forEach((item, index) => {
        if (item.id === id) {
            listaProductos[index].cantidad++;
        }
    });

    localStorage.setItem("producto", JSON.stringify(listaProductos))
    actualizarCarrito();
    obtenerProductosCarrito();
}

const restarProductoCarrito = (id) => {
    const productos = listaProductos;
    let eliminarProducto = false;
    let indexProducto = -1;
    productos.forEach((item, index) => {
        if (item.id === id) {
            if (item.cantidad === 1) {
                eliminarProducto = true;
            }
            indexProducto = index;
        }
    });
    if (eliminarProducto) {
        listaProductos = productos.filter((item) => item.id !== id);
    } else {
        listaProductos[indexProducto].cantidad--;
    }

    localStorage.setItem("producto", JSON.stringify(listaProductos))
    actualizarCarrito();
    obtenerProductosCarrito();
}

const eliminarProductoCarrito = (id) => {
    const productos = listaProductos;
    listaProductos = productos.filter((item) => item.id !== id);

    localStorage.setItem("producto", JSON.stringify(listaProductos))
    actualizarCarrito();
    obtenerProductosCarrito();
}

//get items
const obtenerProductosCarrito = () => {
    const listadoProductos = document.getElementById("productos");
    const finalizarCompra = document.getElementById("finalizarCompra");
    const productos = JSON.parse(localStorage.getItem("producto"));
    listadoProductos.innerHTML = '';
    if (productos.length > 0) {
        productos.forEach(producto => {
            let { categoria, id, imagen, marca, nombreProducto, precio, cantidad } = producto;
            if(imagen === null || imagen === ''){
                imagen = '/img/no-hay-imagen.png';
            }
            listadoProductos.innerHTML += `<div class="d-flex py-2 mx-4 align-items-center justify-content-between border-bottom">
                <div class="d-flex align-items-center">
                    <div class="ms-4 d-flex align-items-center justify-content-center" style="width:80px!important;height:80px!important;">
                        <img style="max-height: 80px; max-width: 80px!important;" class="rounded-2"
                            src="${imagen}" />
                    </div>
                    <div class="ms-4">
                        <p class="m-0">${marca}</p>
                        <h3 class="m-0">${nombreProducto}</h3>
                        <p class="m-0">${categoria}</p>
                    </div>
                </div>
                <div class="col-6 d-flex align-items-center">
                    <div class="col-6 row">
                        <div class="col-2 p-0 d-flex justify-content-center align-items-center">
                            <button class="btn btn-link link-basic" onclick="restarProductoCarrito('${id}')">      
                                <img height="20px" width="20px" src="/img/restar.png" />
                            </button>
                        </div>
                        <div class="col-2 p-0 d-flex justify-content-center align-items-center">
                            <p class="m-0">${cantidad}</p>
                        </div>
                        <div class="col-2 p-0 d-flex justify-content-center align-items-center">
                            <button class="btn btn-link link-basic" onclick="sumarProductoCarrito('${id}')">    
                                <img height="20px" width="20px" src="/img/sumar.png" />
                            </button>
                        </div>
                    </div>
                    <div class="col-4 p-0 d-flex justify-content-center align-items-center">
                        <h3>Precio: ${precio}</h3>
                    </div>
                    <div class="col-2 p-0 d-flex justify-content-center align-items-center">
                        <button class="btn btn-link link-basic" onclick="eliminarProductoCarrito('${id}')">
                            <img height="40px" width="40px" src="/img/eliminar.png" />
                        </button>
                    </div>
                </div>
            </div>`
        });
        finalizarCompra.innerHTML = `<button onclick="finalizarCompra()" class="btn btn-secondary btn-lg px-4">Finalizar compra</button>`
    } else {
        listadoProductos.innerHTML = `<div class="my-5 d-flex row justify-content-center align-items-center">
            <div class="col-1">
                <img height="90px" width="90px" src="/img/carro-compras-vacio.png">
            </div>
            <div class="col-5 align-items-center">
                <h1>Tu carrito está vacío</h1>
            </div>
        </div>
        `
        finalizarCompra.innerHTML = '';
    }
    actualizarCarrito()
}