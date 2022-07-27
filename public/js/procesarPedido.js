let boton = document.querySelector('.botonPedidoB');
boton.addEventListener('click', () => {
    let url = location;
    url = url.toString();
    url = url.substring(url.indexOf('?'), url.length);
    console.log(url.indexOf('?'));
    if (url.indexOf('?') != -1) {
        let form = document.createElement('form');
        form.action = '/procesarPedido';
        form.method = 'POST';

        let datos = url.split('&');
        let direccion = "";
        for (i = 3; i <= 9; i++) {
            direccion += datos[i].substring(datos[i].indexOf('=') + 1, datos[i].length) + "+";
        }
        let pedido = {
            cedula: datos[0].substring(datos[0].indexOf('=') + 1, datos[0].length),
            ciudad: datos[1].substring(datos[1].indexOf('=') + 1, datos[1].length) + "+" + datos[2].substring(datos[2].indexOf('=') + 1, datos[2].length),
            direccion: direccion,
            observaciones: datos[10].substring(datos[10].indexOf('=') + 1, datos[10].length),
            estado: "Procesando"
        }
        //let infoForm = JSON.stringify(pedido);
        //alert(infoForm);
        form.innerHTML += `<input name="cedula" value=${pedido.cedula}>
                        <input name="ciudad" value=${pedido.ciudad}>
                        <input name="direccion" value=${pedido.direccion}>
                        <input name="observaciones" value=${pedido.observaciones}>
                        <input name="estado" value=${pedido.estado}>
                        <input name="lista" value=${localStorage.getItem('lista').split(" ").join('+')}>`;
        document.body.append(form);
        localStorage.removeItem('lista');
        form.submit();

    } else {
        alert('No ha ingresado una direccion');
    }


});