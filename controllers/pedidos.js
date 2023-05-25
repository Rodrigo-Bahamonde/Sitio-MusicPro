import { response, request } from 'express'

const data =[
    {
        idPedido: 1,
        direccion: "direccion 1",
        fechaEntrega: "20-04-2023",
        estado: true,
        codBoleta: 12345678,
    },
    {
        idPedido: 2,
        direccion: "direccion 2",
        fechaEntrega: "20-04-2023",
        estado: true,
        codBoleta: 12345678,
    },
    {
        idPedido: 3,
        direccion: "direccion 3",
        fechaEntrega: "20-04-2023",
        estado: true,
        codBoleta: 12345678,
    },
    {
        idPedido: 4,
        direccion: "direccion 4",
        fechaEntrega: "20-04-2023",
        estado: true,
        codBoleta: 12345678,
    },
]

//Obtener estado de pedidos
const pedidosGet = (req = request, res = response) => {

    // const query = req.query;
    const {api, nombre='no name'} = req.query;

    res.render('formulario-envio')
};

//Ingresar un nuevo pedido
const pedidosPost = (req, res = response) => {

    const { nombre, edad } = req.body;
    res.json({
        msg: 'Post API controller',
        nombre,
        edad,
    })
};

//Actualizar el estado de un pedido
const pedidosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'Put API controller',
        id
    })
};

//Desactivar un pedido (Canelar)
const pedidosDelete = (req, res = response) => {

    res.json({
        msg: 'Delete API controller'
    })
};


export {
    pedidosGet,
    pedidosPost,
    pedidosPut,
    pedidosDelete,
}