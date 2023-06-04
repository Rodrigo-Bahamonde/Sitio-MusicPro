import { validationResult } from 'express-validator';


const validarCampos = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array();
        res.cookie('errors', JSON.stringify(errorMessages));
        return res.redirect('/error');
    }
    next();
}

export default validarCampos;