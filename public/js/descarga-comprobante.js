function descargarComprobante() {
    const comprobante = document.getElementById('comprobante');
    var ventana = window.open('', 'PRINT', 'height=400,width=600');
    ventana.document.write('<html><head><title>Comprobante</title><link rel="stylesheet" href="/css/style.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css">');
    ventana.document.write('</head><body >');
    ventana.document.write(comprobante.innerHTML);
    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.focus();
    ventana.print();
    ventana.close();
    return true;
}