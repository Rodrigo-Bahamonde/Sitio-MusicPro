import { response, request } from 'express'
import Usuario from '../models/usuario.js';

const data = [
    {
        email: "email@gmail.com",
        password: "password",
        nombreCompleto: "Nombre",
        numeroTelefono: 123456789,
        imagen: "Imagen",
        rol: 4,
        activo: true,
    },
    {
        email: "email@gmail.com",
        password: "password",
        nombreCompleto: "Nombre",
        numeroTelefono: 123456789,
        imagen: "Imagen",
        rol: 4,
        activo: true,
    },
    {
        email: "email@gmail.com",
        password: "password",
        nombreCompleto: "Nombre",
        numeroTelefono: 123456789,
        imagen: "Imagen",
        rol: 4,
        activo: true,
    },
    {
        email: "email@gmail.com",
        password: "password",
        nombreCompleto: "Nombre",
        numeroTelefono: 123456789,
        imagen: "Imagen",
        rol: 4,
        activo: true,
    },
]

//Ver usuarios
const usuariosGet = (req = request, res = response) => {

    //Validar rol de usuario de consulta

    //Obtener los usuarios de la BD

    //Mostrar campos especificos

    res.json({
        data
    })
};

//Crear un usuario
const usuariosPost = async(req, res = response) => {

    // const { email, password, nombre, imagen } = req.body;
    const body = req.body;
    const usuario = new Usuario(body);

    //Verificar si el usuario existe

    //Encriptar la contraseña

    //Dejar el estado de activo en true

    //Validar que el rol de administrador sea el unico que pueda crear un rol distinto a 0

    //Guardar en la base de datos
    await usuario.save();

    res.json({
        usuario
    })
};

//Actualizar usuario
const usuariosPut = (req, res = response) => {

    const { email, password, nombre, imagen } = req.body;

    //Validar sesion de usuario corresponda con usuario modificado

    //Validar que usuario admin modifique otros usuarios

    //Validar que email existe

    //Encriptar la contraseña en caso que cambie

    //Guardar en la base de datos

    res.json({
        email,
        password,
        nombre,
        imagen
    })
};

//Deshabilitar usuario
const usuariosDelete = (req, res = response) => {

    //Validar que usuario desactivado sea solo el correspondiente al usuario que realiza la solicitud

    //Validar que usuario desactivado distinto al que realiza la solicitud tenga rol de administrador

    //Validar que email existe

    //Cambiar valor de usuario activo

    //Guardar en base de datos

    const { email } = req.body;
    res.json({
        email
    })
};


export {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
}