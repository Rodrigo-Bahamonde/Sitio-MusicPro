let listaProductos = JSON.parse(localStorage.getItem("producto")) || [];
// let listaProductos = [];
let contadorProductos = 0;
let total = 0;

//Contador productos
const actualizarCarrito = () => {
    const Total = document.getElementById('total');
    contadorProductos = listaProductos.length;
    if(Total){        
        if (listaProductos.length > 0) {
            console.log('listaProductos');
            console.log(listaProductos);
            let suma = 0;
            listaProductos.forEach((item, index) => {
                suma += parseInt(item.precio)*item.cantidad;
            });
            total = suma
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
    const productos = JSON.parse(localStorage.getItem("producto"));
    listadoProductos.innerHTML = '';
    if (productos.length > 0) {
        productos.forEach(producto => {
            let { categoria, id, imagen, marca, nombreProducto, precio, cantidad } = producto;
            listadoProductos.innerHTML += `<div class="d-flex py-2 mx-4 align-items-center justify-content-between border-bottom">
                <div class="d-flex align-items-center">
                    <img style="max-height: 80px; max-width: 80px;" class="rounded-2 ms-4"
                        src="img/guitarra-electrico-ibanez-negra.jpg" />
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
    }
    actualizarCarrito()
}