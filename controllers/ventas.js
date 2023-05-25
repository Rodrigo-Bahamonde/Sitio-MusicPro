import { response, request } from 'express'

const data=[
    {
        idVenta: 1,
        total: 999999,
        fechaCompra: '22-04-2023',
        estado: 1,
        medioDePago: 'DB',
    },
    {
        idVenta: 1,
        total: 999999,
        fechaCompra: '22-04-2023',
        estado: 1,
        medioDePago: 'DB',
    },
    {
        idVenta: 1,
        total: 999999,
        fechaCompra: '22-04-2023',
        estado: 1,
        medioDePago: 'DB',
    },
    {
        idVenta: 1,
        total: 999999,
        fechaCompra: '22-04-2023',
        estado: 1,
        medioDePago: 'DB',
    },
]


//Ingresar una nueva venta
const ventasGet = (req = request, res = response) => {

    res.json({
        data
    })
};

//Ingresar una nueva venta
const ventasPost = (req, res = response) => {

    res.json({
        msg: 'nueva venta',
    })
};

const informesVentasGet = (req = request, res = response) => {

    //Obtener data de BD y transformarla a CSV

    res.json({
        data: "archivo CSV de ventas"
    })
};


export {
    ventasGet,
    ventasPost,
    informesVentasGet
}