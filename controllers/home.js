import { response, request } from 'express'
import Producto from '../models/producto.js'
import { productosGet } from './productos.js';
import numeral from 'numeral';

const data = {
    total: 999999,
    productos: [
        {
            marca: 'marca',
            nombreProducto: 'Nombre producto',
            categoria: 'categoria',
            precio: 999999,
            cantidad: 1
        },
        {
            marca: 'marca',
            nombreProducto: 'Nombre producto',
            categoria: 'categoria',
            precio: 999999,
            cantidad: 2
        },
        {
            marca: 'marca',
            nombreProducto: 'Nombre producto',
            categoria: 'categoria',
            precio: 999999,
            cantidad: 3
        }
    ]
}

const dataBoleta = {

}

const getURL = () => {
    return process.env.URL;
}

const formatNumber = (number) => {
    var formattedNumber = numeral(number).format('0,0');
    return formattedNumber;
}

//mostrar home
const homeGet = async (req = request, res = response) => {

    const { limite = 9, desde = 0 } = req.query;
    const productos = await Producto.find()
        .skip(Number(desde))
        .limit(Number(limite))
    let listaProductos = productos;

    productos.forEach((item, index) => {
        if (item.imagen === null || item.imagen === "") {
            listaProductos[index].imagen = '/img/no-hay-imagen.png';
        } else {
            listaProductos[index].imagen = '/img/guitarra-electrico-ibanez-negra.jpg';
        }
        listaProductos[index].precio = formatNumber(item.precio);
    });

    res.render('home', { productos: listaProductos, URL: getURL() });
}

const compraGet = async (req = request, res = response) => {

    // const { limite = 9, desde = 0 } = req.query;
    // const productos = await Producto.find()

    res.render('carro-compras', { URL: getURL() });
}

const boletaGet = async (req = request, res = response) => {

    // const { limite = 9, desde = 0 } = req.query;
    // const productos = await Producto.find()

    res.render('boleta', { URL: getURL() });
}

const formularioTransbankGet = async (req = request, res = response) => {

    const { url, token } = req.query
    console.log(url);
    console.log(typeof url);
    console.log(token);
    console.log(typeof token);
    res.render('formulario-transbank', { url, token });
}

const errorGet = async (req = request, res = response) => {
    if (req.cookies && req.cookies.errors) {
        const errors = JSON.parse(req.cookies.errors);
        console.log('errors');
        console.log(errors);
        res.render('error', { errors });
    } else {
        const errors = [];
        console.log('errors');
        console.log(errors);
        res.render('error', { errors: [] });
    }
}

export { homeGet, compraGet, boletaGet, formularioTransbankGet, errorGet }