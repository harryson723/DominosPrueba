let conteiner = document.querySelector('.conteinerT');
let tabla = document.createElement('table');
let tr = document.createElement('tr');
let ths = [document.createElement('th'),
document.createElement('th'), document.createElement('th'),
document.createElement('th'), document.createElement('th'),
document.createElement('th'), document.createElement('th')];
let encabezados = ["CEDULA", "CIUDAD", "DIRECCION", "OBSERVACIONES", "PRODUCTOS", "ESTADO", "CAMBIAR"];
for (let i = 0; i < ths.length; i++) {
    ths[i].innerHTML = encabezados[i];
    tabla.appendChild(ths[i]);
}

datos.forEach((value) => {
    if (value.estado != "eliminado") {
        let tr1 = document.createElement('tr');
        let tds = [document.createElement('td'),
        document.createElement('td'), document.createElement('td'),
        document.createElement('td'), document.createElement('td'),
        document.createElement('td'), document.createElement('td')];
        tds[0].innerHTML = value.cedula;
        tds[1].innerHTML = value.ciudad;
        tds[2].innerHTML = value.direccion;
        tds[3].innerHTML = value.observaciones;
        let productos = JSON.parse(value.productos.split('%w%').join('\"'));
        productos.forEach((producto) => {
            let div = document.createElement('div');
            div.id = producto.nombre;
            // crear elementos dentro del div
            let img = document.createElement('img');
            let h1 = document.createElement('h1');
            let p = document.createElement('p');
            let text = document.createElement('div');
            //let a = document.createElement('a');
            //a.appendChild(ip);
            text.classList = "divText";
            // definir valores
            img.src = producto.imagen;
            p.innerHTML = producto.descripcion.split("+").join(" ");
            h1.innerHTML = producto.nombre.split("+").join(" ");
            div.appendChild(img);
            text.appendChild(h1);
            text.appendChild(document.createElement('br'));
            text.appendChild(p);
            div.appendChild(text);
            tds[4].appendChild(div);
        });
        tds[4].classList = "productList";
        if (value.estado == "Procesando" ) {
            tds[5].innerHTML = `<select name="estado" id="${value.cedula}t">
        <option value="Procesando" selected>Procesando</option>
        <option value="Cocinando" >Cocinando</option>
        <option value="Enviando">Enviando</option>
        <option value="eliminado">Terminado</option>
      </select>`;
        } else if (value.estado == "Cocinando") {
            tds[5].innerHTML = `<select name="estado" id="${value.cedula}t">
        <option value="Procesando" >Procesando</option>
        <option value="Cocinando" selected >Cocinando</option>
        <option value="Enviando">Enviando</option>
        <option value="eliminado">Terminado</option>
      </select>`;
        } else if (value.estado == "Enviando") {
            tds[5].innerHTML = `<select name="estado" id="${value.cedula}t">
        <option value="Procesando" >Procesando</option>
        <option value="Cocinando" >Cocinando</option>
        <option value="Enviando" selected>Enviando</option>
        <option value="eliminado">Terminado</option>
      </select>`;
        }

        let boton = document.createElement('button');
        boton.innerHTML = "CAMBIAR";
        tds[6].appendChild(boton);
        tds[6].id = value.cedula + ';' + value.estado;
        for (let i = 0; i < tds.length; i++) {
            tr1.appendChild(tds[i]);
        }
        tabla.appendChild(tr1);

        boton.addEventListener('click', (e) => {
            let form = document.querySelector('.form');
            let input = document.createElement('input');
            let info = e.srcElement.parentNode.id.split(";");
            input.value = info[0];
            input.name = "id";
            let input2 = document.createElement('input');
            let sel = document.getElementById(value.cedula+'t');
            let val = sel.options[sel.selectedIndex].value;
            input2.value = val;
            alert(input2.value);
            input2.name = "estado";
            form.appendChild(input);
            form.appendChild(input2);
            form.submit();
        });
    }
});

conteiner.appendChild(tabla);