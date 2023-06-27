const validarRut = (rut) => {
    rut = rut.replace(/[\s.]/g, ''); // Eliminar espacios, puntos y guiones del Rut
    if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) {
        return false; // Verificar el formato correcto del Rut
    }

    var rutDigits = rut.split('-'); // Separar el Rut en dígitos y dígito verificador
    var rutBody = rutDigits[0];
    var rutDV = rutDigits[1];

    // Validar el dígito verificador
    var suma = 0;
    var multiplo = 2;

    for (var i = rutBody.length - 1; i >= 0; i--) {
        suma += parseInt(rutBody.charAt(i)) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    var verificador = 11 - (suma % 11);
    verificador = verificador === 11 ? '0' : verificador === 10 ? 'K' : verificador.toString();

    return verificador.toLowerCase() === rutDV.toLowerCase(); // Comparar dígito verificador calculado con el proporcionado
}

const validarCampos = (rut, direccion, nombre, apellido, telefono, correo, producto) => {
    let result = true;
    const rutLabel = document.getElementById('rut-label');
    const direccionLabel = document.getElementById('direccion-label');
    const nombreLabel = document.getElementById('nombre-label');
    const apellidoLabel = document.getElementById('apellido-label');
    const telefonoLabel = document.getElementById('telefono-label');
    const correoLabel = document.getElementById('correo-label');

    if (validarRut(rut.value)) {
        rut.classList.remove('error-validation');
        rutLabel.classList.remove('error');
        rutLabel.classList.add('hide');
    } else {
        rut.classList.add('error-validation');
        rutLabel.classList.add('error');
        rutLabel.classList.remove('hide');
        result = false;
    }

    if (direccion.value.length > 0) {
        direccion.classList.remove('error-validation');
        direccionLabel.classList.remove('error');
        direccionLabel.classList.add('hide');
    } else {
        direccion.classList.add('error-validation');
        direccionLabel.classList.add('error');
        direccionLabel.classList.remove('hide');
        result = false;
    }

    if (nombre.value.length > 0) {
        nombre.classList.remove('error-validation');
        nombreLabel.classList.remove('error');
        nombreLabel.classList.add('hide');
    } else {
        nombre.classList.add('error-validation');
        nombreLabel.classList.add('error');
        nombreLabel.classList.remove('hide');
        result = false;
    }

    if (apellido.value.length > 0) {
        apellido.classList.remove('error-validation');
        apellidoLabel.classList.remove('error');
        apellidoLabel.classList.add('hide');
    } else {
        apellido.classList.add('error-validation');
        apellidoLabel.classList.add('error');
        apellidoLabel.classList.remove('hide');
        result = false;
    }

    if (telefono.value.length === 9 && /^[0-9]+$/.test(telefono.value)) {
        telefono.classList.remove('error-validation');
        telefonoLabel.classList.remove('error');
        telefonoLabel.classList.add('hide');
    } else {
        telefono.classList.add('error-validation');
        telefonoLabel.classList.add('error');
        telefonoLabel.classList.remove('hide');
        result = false;
    }

    if (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(correo.value)) {
        correo.classList.remove('error-validation');
        correoLabel.classList.remove('error');
        correoLabel.classList.add('hide');
    } else {
        correo.classList.add('error-validation');
        correoLabel.classList.add('error');
        correoLabel.classList.remove('hide');
        result = false;
    }
    return result;
}

const finalizarCompra = async () => {
    const rut = document.getElementById('rut');
    const direccion = document.getElementById('direccion');
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const telefono = document.getElementById('telefono');
    const correo = document.getElementById('correo');
    const producto = JSON.parse(localStorage.getItem("producto"));
    if (validarCampos(rut, direccion, nombre, apellido, telefono, correo, producto)) {
        const fecha = new Date();
        const dia = fecha.getDate().toString().length === 1 ? '0' + fecha.getDate() : fecha.getDate();
        const mes = fecha.getMonth().toString().length === 1 ? '0' + fecha.getMonth() : fecha.getMonth();
        const anio = fecha.getFullYear();
        const hora = fecha.getHours().toString().length === 1 ? '0' + fecha.getHours() : fecha.getHours();
        const minutos = fecha.getMinutes().toString().length === 1 ? '0' + fecha.getMinutes() : fecha.getMinutes();
        const fechaCompra = dia + '/' + mes + '/' + anio + ' ' + hora + ':' + minutos;

        // console.log(listaProductos);
        // console.log(fecha);
        // localStorage.setItem("fecha", JSON.stringify(fechaCompra))

        // const data = {
        //     buy_order: "ordenCompra123456781111",
        //     session_id: "sesion1234557545111",
        //     amount: 20000,
        //     return_url: "http://127.0.0.1:8000"
        // }

        const data = {
            rut: rut.value,
            direccion: direccion.value,
            nombre: nombre.value,
            apellido: apellido.value,
            telefono: telefono.value,
            correo: correo.value,
            fecha: fechaCompra,
            productos: producto
        }

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }

        await fetch('http://127.0.0.1:8080/api/compras', params)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem("producto");
                    return response.json()
                } else if (response.status === 400) {
                    return response.json()
                }
            })
            .then((r) => {
                if (r.mensaje) {
                    alert(r.mensaje)
                } else {
                    window.location.href = r.url
                }
            })
            .catch(err => err)
    }
}