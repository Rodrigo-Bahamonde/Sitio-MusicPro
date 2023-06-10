import { response, request } from 'express'

//mongodb+srv://user_node2:MYhqi3fEnqp8jPzU@micluster1.jxztl8z.mongodb.net/nodeDB

//Iniciar sesion
const loginGet = (req, res = response) => {

    const { email, contraseña } = req.body;
    res.render('login')
};

//Iniciar sesion
const loginPost = (req, res = response) => {

    const { email, contraseña } = req.body;
    res.json({
        email,
        contraseña
    })
};

//Registro
const registroPost = (req = request, res = response) => {

    // const query = req.query;
    const { email, password, nombre } = req.query;

    res.json({
        email,
        password,
        nombre
    }) 
};


export {
    loginPost,
    loginGet,
    registroPost,
}