import { Schema, model } from "mongoose"

const UsuarioSchema = Schema({
    email: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    dirección: {
        type: String,
        default: ''
    },
    comuna: {
        type: String,
        default: ''
    },
    region: {
        type: String,
        default: ''
    },
    imagen: {
        type: String
    },
    rol: {
        type: Number,
        required: true,
        enum: [0, 1, 2, 3, 4]
    },
    estado: {
        type: Boolean,
        default: true
    }
})


export default model('Usuario', UsuarioSchema);