const finalizarCompra = async () => {
    let token = ''
    let url = ''

    const data = {
        buy_order: "ordenCompra123456781",
        session_id: "sesion12345575451",
        amount: 20000,
        return_url: "https://www.google.cl"
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
                return response.json()
            }
        })
        .then((r) => {
            window.location.href = `http://127.0.0.1:8000/formulario-transbank?url=${r.message.url}&token=${r.message.token}`;
        })
}