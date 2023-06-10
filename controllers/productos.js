import { response, request } from 'express'
import Producto from '../models/producto.js'
import numeral from 'numeral';

// const data = [
//     {
//         idProducto: "1",
//         categoria: "IC-G-GCS",
//         marca: "Ibanez",
//         precio: 100000,
//         nombreProducto: "Guitarra acustica",
//         descripcion: "Da tus primeros pasos y descubre el amor por la música con nuestra excelente guitarra clásica de 39 pulgadas color natural, ideal para principiantes gracias a su gran calidad. Divierte creando y aprendiendo con el instrumento de cuerdas más popular del mercado. (cuerdas de nylon incluidas).",
//         imagen: "imagen1",
//         stock: 100,
//     },
//     {
//         idProducto: "1",
//         categoria: "IC-G-GCS",
//         marca: "Ibanez",
//         precio: 100000,
//         nombreProducto: "Guitarra acustica",
//         descripcion: "Da tus primeros pasos y descubre el amor por la música con nuestra excelente guitarra clásica de 39 pulgadas color natural, ideal para principiantes gracias a su gran calidad. Divierte creando y aprendiendo con el instrumento de cuerdas más popular del mercado. (cuerdas de nylon incluidas).",
//         imagen: "imagen1",
//         stock: 100,
//     },
//     {
//         idProducto: "1",
//         categoria: "IC-G-GCS",
//         marca: "Ibanez",
//         precio: 100000,
//         nombreProducto: "Guitarra acustica",
//         descripcion: "Da tus primeros pasos y descubre el amor por la música con nuestra excelente guitarra clásica de 39 pulgadas color natural, ideal para principiantes gracias a su gran calidad. Divierte creando y aprendiendo con el instrumento de cuerdas más popular del mercado. (cuerdas de nylon incluidas).",
//         imagen: "imagen1",
//         stock: 100,
//     },
//     {
//         idProducto: "1",
//         categoria: "IC-G-GCS",
//         marca: "Ibanez",
//         precio: 100000,
//         nombreProducto: "Guitarra acustica",
//         descripcion: "Da tus primeros pasos y descubre el amor por la música con nuestra excelente guitarra clásica de 39 pulgadas color natural, ideal para principiantes gracias a su gran calidad. Divierte creando y aprendiendo con el instrumento de cuerdas más popular del mercado. (cuerdas de nylon incluidas).",
//         imagen: "imagen1",
//         stock: 100,
//     },
//     {
//         idProducto: "1",
//         categoria: "IC-G-GCS",
//         marca: "Ibanez",
//         precio: 100000,
//         nombreProducto: "Guitarra acustica",
//         descripcion: "Da tus primeros pasos y descubre el amor por la música con nuestra excelente guitarra clásica de 39 pulgadas color natural, ideal para principiantes gracias a su gran calidad. Divierte creando y aprendiendo con el instrumento de cuerdas más popular del mercado. (cuerdas de nylon incluidas).",
//         imagen: "imagen1",
//         stock: 100,
//     },
// ]


const getURL = () => {
    return process.env.URL;
}

const formatNumber = (number) => {
    var formattedNumber = numeral(number).format('0,0');
    return formattedNumber;
}

//Obtener productos
const productosGet = async (req = request, res = response) => {

    // const { limite = 10, desde = 0 } = req.query;
    //Obtener productos de base de datos
    const productos = await Producto.find()
    // .skip(Number(desde))
    // .limit(Number(limite))

    //Mostrar estado del producto segun stock


    res.json({
        productos
    })
};

//Obtener producto por id
const productoGet = async (req = request, res = response) => {

    const idProducto = req.params.id

    //Obtener producto de base de datos
    const producto = await Producto.findById(idProducto)
    let newProducto = producto;

    if (producto.imagen === null || producto.imagen === "" || producto.imagen === "imagen2") {
        newProducto.imagen = '/img/no-hay-imagen.png';
    }
    console.log('newProducto');
    console.log(newProducto);
    res.render('detalle-instrumento', { producto: newProducto, URL: getURL() });
};

//Obtener producto por categoria
const productosCategoriaGet = async (req = request, res = response) => {

    const { Tipo } = req.params
    //Obtener producto de base de datos
    const productos = await Producto.find({ Tipo })

    let listaProductos = productos;

    productos.forEach((item, index) => {
        if (item.imagen === null || item.imagen === "") {
            listaProductos[index].imagen = '/img/no-hay-imagen.png';
        } else {
            listaProductos[index].imagen = '/img/guitarra-electrico-ibanez-negra.jpg';
        }
        listaProductos[index].precio = formatNumber(item.precio);
        console.log(listaProductos);
    });

    res.render('instrumentos', { productos: listaProductos, URL: getURL() });
};

//Ingresar un nuevo producto
const productosPost = async (req = request, res = response) => {

    const body = req.body;
    const producto = new Producto(body);
    //Validar que al agregar un producto solo sea administrador o vendedor


    //Guardar en base de datos
    await producto.save();

    res.json({
        producto
    })
};

//Actualizar un producto
const productosPut = async (req = request, res = response) => {

    const idProducto = req.params.id
    const { categroia, marca, precio, imagen, stock, descripcion, nombreProducto, estado } = req.body

    const productoActualizado = { categroia, marca, precio, imagen, stock, descripcion, nombreProducto, estado };

    //Obtener producto de base de datos
    const productoFinal = await Producto.findByIdAndUpdate(idProducto, productoActualizado, { new: true });


    //Validar que cambios sean de parte de admin y vendedor
    res.json({
        msg: 'Producto actualizado',
        producto: productoFinal
    })
};

//Desactivar un producto (deshabilitar)
const productosDelete = async (req = request, res = response) => {

    const idProducto = req.params.id

    const productoEliminado = await Producto.findByIdAndUpdate({ _id: idProducto }, { estado: false }, { new: true });



    res.json({
        msg: 'Producto eliminado'
    })
};


export {
    productosGet,
    productosCategoriaGet,
    productoGet,
    productosPost,
    productosPut,
    productosDelete,
}