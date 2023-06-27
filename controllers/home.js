import { response, request } from 'express'
import Producto from '../models/producto.js'
import { productosGet } from './productos.js';
import numeral from 'numeral';
import moment from 'moment';
import fetch from "node-fetch";
import Pedido from '../models/pedido.js';

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

//Success
const boletaGet = async (req = request, res = response) => {

    const fecha = moment().utc(true).format('DD-MM-YYYY HH:mm');
    const response = req.query

    const infoPedido = await Pedido.findOne({ pedidoId: response.preference_id })
    console.log('infoPedido');
    console.log(infoPedido);

    let data = {
        ordenCompra: infoPedido.pedidoId,
        metodoPago: response.payment_type,
        fecha: infoPedido.fecha,
        total: infoPedido.total,
        rut: infoPedido.clienteRut,
        nombre: infoPedido.clienteNombre,
        apellido: infoPedido.clienteApellido,
    };
    if (response.payment_type === 'credit_card') {
        data.metodoPago = 'Tarjeta crédito';
    } else if (response.payment_type === 'debit_card') {
        data.metodoPago = 'Tarjeta débito';
    } else if (response.payment_type === 'prepaid_card') {
        data.metodoPago = 'Tarjeta prepago';
    }
    console.log('response');
    console.log(response);

    res.render('boleta', { URL: getURL(), data });
}

//Failure
const failureGet = async (req = request, res = response) => {

    // const { limite = 9, desde = 0 } = req.query;
    // const productos = await Producto.find()

    res.json('Falló');
}
//Pending
const pendingGet = async (req = request, res = response) => {

    // const { limite = 9, desde = 0 } = req.query;
    // const productos = await Producto.find()

    res.json('Pendiente');
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

export { homeGet, compraGet, boletaGet, formularioTransbankGet, errorGet, pendingGet, failureGet }