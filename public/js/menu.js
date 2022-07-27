// mostrar pizzas
let menuPizza = document.querySelector('.menuPizza');

let pizzas = [];
pizzas.push(new Producto("Img/pizzaHawaiana.jpg", "Pizza Hawaiana", "Extraqueso , Jamón y Piña."));
pizzas.push(new Producto("Img/pizza3estaciones.jpg", "Pizza 3 Estaciones", "Nuestra versión especial de pollo y champiñones con chorizo."));
pizzas.push(new Producto("Img/pizzaAmericana.jpg", "Pizza Americana", "Maíz tierno y tocineta con un toque picantico de pepperoni."));
pizzas.push(new Producto("Img/pizzaFiestaPeperoni.jpg", "Pizza Fiesta de Peperoni", "Doble pepperoni y extraqueso."));
pizzas.push(new Producto("Img/pizzaSuperPollo.jpg", "Pizza Super Pollo", "Tradicional mezcla de Trocitos de pechuga de pollo champiñones frescos y extraqueso."));


let i = Number(localStorage.getItem('i'));

pizzas.forEach(pizza => {
    let div = document.createElement('div');
    // crear elementos dentro del div
    let img = document.createElement('img');
    let a = document.createElement('a');
    let h1 = document.createElement('h1');
    let p = document.createElement('p');
    // definir valores
    img.src = pizza.imagen;
    p.innerHTML = pizza.descripcion;
    h1.innerHTML = pizza.nombre;
    a.innerHTML = "PIDE YA";
    div.appendChild(img);
    div.appendChild(a);
    div.appendChild(h1);
    div.appendChild(p);
    menuPizza.appendChild(div);

    // anadir evento al boton
    a.addEventListener('click', (e) => {
        e.preventDefault();
        let lista = JSON.parse(localStorage.getItem('lista'));
        lista.push(pizza);
        localStorage.setItem('lista', JSON.stringify(lista));
    });
    
});

// mostrar acompanamientos

let menuAcompa = document.querySelector('.menuAcompa');

let acompa = [];
acompa.push(new Producto("Img/acompa1.jpg", "Canela Baitz", "Deliciosos panecillos dulces hechos con la receta única de Domino's, espolvoreados con canela y acompañados de Arequipe."));
acompa.push(new Producto("Img/acompa2.jpg", "Palitos de Queso", "Exquisitas barritas de pan cubiertas con queso mozarella gratinado y acompañados de Arequipe."));
acompa.push(new Producto("Img/acompa3.jpg", "Arequipe Rolls", "Exquisitos rollos recién horneados, rellenos de arequipe y glaseados con el toque Domino's"));

acompa.forEach(acom => {
    let div = document.createElement('div');
    // crear elementos dentro del div
    let img = document.createElement('img');
    let a = document.createElement('a');
    let h1 = document.createElement('h1');
    let p = document.createElement('p');
    // definir valores
    img.src = acom.imagen;
    p.innerHTML = acom.descripcion;
    h1.innerHTML = acom.nombre;
    a.innerHTML = "PIDE YA";
    div.appendChild(img);
    div.appendChild(a);
    div.appendChild(h1);
    div.appendChild(p);
    menuAcompa.appendChild(div);

    // anadir evento al boton
    a.addEventListener('click', (e) => {
        e.preventDefault();
        let lista = JSON.parse(localStorage.getItem('lista'));
        lista.push(acom);
        localStorage.setItem('lista', JSON.stringify(lista));
    });
    
});

// mostrar bebidas

let menuBebi = document.querySelector('.menuBebida');

let bebida = [];
bebida.push(new Producto("Img/bebida1.jpg", "Coca Cola Sabor Original", "El auténtico sabor de la bebida Coca Cola®, una refrescante manera de compartir los mejores momentos."));
bebida.push(new Producto("Img/bebida2.jpg", "Coca Cola Merch", "Coca Cola Merch"));
bebida.push(new Producto("Img/bebida3.jpg", "Quatro Toronja", ""));
bebida.push(new Producto("Img/bebida4.jpg", "Sprite Limón", ""));
bebida.push(new Producto("Img/bebida5.jpg", "Coca Cola sin Azucar", ""));
bebida.push(new Producto("Img/bebida6.jpg", "Agua", ""));

bebida.forEach(bebi => {
    let div = document.createElement('div');
    // crear elementos dentro del div
    let img = document.createElement('img');
    let a = document.createElement('a');
    let h1 = document.createElement('h1');
    let p = document.createElement('p');
    // definir valores
    img.src = bebi.imagen;
    p.innerHTML = bebi.descripcion;
    h1.innerHTML = bebi.nombre;
    a.innerHTML = "PIDE YA";
    div.appendChild(img);
    div.appendChild(a);
    div.appendChild(h1);
    div.appendChild(p);
    menuBebi.appendChild(div);

    // anadir evento al boton
    a.addEventListener('click', (e) => {
        e.preventDefault();
        let lista = JSON.parse(localStorage.getItem('lista'));
        lista.push(bebi);
        localStorage.setItem('lista', JSON.stringify(lista));
    });
    
});



