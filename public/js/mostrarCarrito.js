

if (localStorage.getItem('i') != null) {
    localStorage.setItem('i', localStorage.getItem('i'));
} else {
    localStorage.setItem('i', 0);
}

if (localStorage.getItem('lista') == null) {
    localStorage.setItem('lista', '[]');
}
let carrito = document.querySelector('.mostrarCarrito');
let li = document.querySelector('.carrito');
let body = document.querySelector('body');
body.addEventListener('click', (e) => {
    carrito.classList = "mostrarCarrito oculto";
});

li.addEventListener('mouseover', (e) => {
    carrito.classList = "mostrarCarrito";
    if (carrito.childElementCount == 0) {
        carrito.classList = "mostrarCarrito vacia";
    }
    actualizar();
});

carrito.addEventListener('mouseover', (e) => {
    e.stopPropagation();
});
carrito.addEventListener('click', (e) => {
    e.stopPropagation();
});


function actualizar() {
    carrito.innerHTML = "";
    let productos = localStorage.getItem("lista");
    productos = JSON.parse(productos);
    productos.forEach((producto) => {
        let div = document.createElement('div');
        div.id = producto.nombre;
        // crear elementos dentro del div
        let img = document.createElement('img');
        let h1 = document.createElement('h1');
        let p = document.createElement('p');
        let text = document.createElement('div');
        let ip = document.createElement('i');
        ip.classList = "fa-solid fa-trash-can";
        //let a = document.createElement('a');
        //a.appendChild(ip);
        text.classList = "divText";
        // definir valores
        img.src = producto.imagen;
        p.innerHTML = producto.descripcion.toString().substring(0, 10);
        h1.innerHTML = producto.nombre;
        div.appendChild(img);
        text.appendChild(h1);
        text.appendChild(document.createElement('br'));
        text.appendChild(p);

        div.appendChild(text);
        div.appendChild(ip);
        carrito.appendChild(div);
        div.classList = "divCarrito";

        ip.addEventListener('click', (e) => {
            e.preventDefault();
            divParent = ip.parentElement;
            let lista = JSON.parse(localStorage.getItem('lista'));
            lista = lista.filter((item) => item.nombre != divParent.id);
            localStorage.setItem('lista', JSON.stringify(lista));
            actualizar();
        });
    })


}