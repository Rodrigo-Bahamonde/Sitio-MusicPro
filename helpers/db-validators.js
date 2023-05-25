import Producto from '../models/producto.js'


const existeProductoPorId = async (id) => {
    const existeProducto = await Producto.findById(id);

    if (!existeProducto) {
        throw new Error(`El id no existe ${id}`)
    }
}

const existenProductosPorCategorias = async (categoria) => {
    const existeProducto = await Producto.find({ categoria });

    if (existeProducto.length === 0) {
        throw new Error(`No existe esta categoria`)
    }
}


export { existeProductoPorId, existenProductosPorCategorias };