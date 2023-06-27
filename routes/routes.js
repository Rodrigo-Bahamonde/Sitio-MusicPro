
import { Router } from 'express'
import { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } from '../controllers/usuarios.js';
import { productosGet, productosPost, productosPut, productosDelete, productoGet, productosCategoriaGet } from '../controllers/productos.js';
import { pedidosGet, pedidosPost, pedidosPut, pedidosDelete } from '../controllers/pedidos.js';
import { loginGet, loginPost, registroPost } from '../controllers/login.js';
import { informesVentasGet, ventasGet, ventasPost } from '../controllers/ventas.js';
import { check } from 'express-validator'
import validarCampos from '../middlewares/validar-campos.js';
import { existenProductosPorCategoria, existeProductoPorId } from '../helpers/db-validators.js';
import { boletaGet, compraGet, errorGet, failureGet, formularioTransbankGet, homeGet, pendingGet } from '../controllers/home.js';

const router = Router();

router.get('/error', errorGet);
router.get('/', homeGet);

//Mantenedor de compra
router.get('/carro-compras', compraGet);
router.get('/boleta', boletaGet);//Success
router.get('/error-compra', failureGet);//Failure
router.get('/compra-pendiente', pendingGet);//Pending
router.get('/formulario-transbank', formularioTransbankGet);

// //Mantenedores pedidos
router.get('/pedidos', pedidosGet);
// router.post('/pedidos', pedidosPost);
// router.put('/pedidos', pedidosPut);
// router.delete('/pedidos', pedidosDelete);

//Mantenedores productos
// router.get('/productos', productosGet);
router.get('/productos/:categoria', [
    check('categoria').custom(existenProductosPorCategoria),
    validarCampos,
], productosCategoriaGet);
router.get('/producto/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], productoGet);
router.post('/productos', [
    check('categoria', 'La categoria es obligatoria').notEmpty(),
    check('marca', 'La marca es obligatoria').notEmpty(),
    check('precio', 'El precio es obligatorio').notEmpty(),
    check('stock', 'El stock es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion es obligatoria').notEmpty(),
    check('nombreProducto', 'El nombreProducto es obligatorio').notEmpty(),
    validarCampos,
], productosPost);
router.put('/productos/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('categoria', 'La categoria es obligatoria').notEmpty(),
    check('marca', 'La marca es obligatoria').notEmpty(),
    check('precio', 'El precio es obligatorio').notEmpty(),
    check('stock', 'El stock es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion es obligatoria').notEmpty(),
    check('nombreProducto', 'El nombreProducto es obligatorio').notEmpty(),
    validarCampos,
], productosPut);
router.delete('/productos/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], productosDelete);

// //Mantenedores usuarios
// router.get('/usuarios', usuariosGet);
// router.put('/usuarios', usuariosPut);
// router.post('/usuarios', usuariosPost);
// router.delete('/usuarios', usuariosDelete);

// //Login
router.get('/login', loginGet);
router.post('/login', loginPost);
// router.post('/registro', registroPost);

// //Ventas
// router.get('/ventas', ventasGet);
// router.post('/ventas', ventasPost);
// router.get('/informes', informesVentasGet);

export default router;