import Producto from '../models/producto.js'


const existeProductoPorId = async (id) => {
    const existeProducto = await Producto.findById(id);

    if (!existeProducto) {
        throw new Error(`El id no existe ${id}`)
    }
}

const existenProductosPorCategoria = async (categoria) => {

    const regexCategoria = new RegExp(categoria, 'i');

    const existeProducto = await Producto.find({ categoria: regexCategoria });

    if (existeProducto.length === 0) {
        throw new Error(`No existe esta categoria`)
    }
}


export { existeProductoPorId, existenProductosPorCategoria };