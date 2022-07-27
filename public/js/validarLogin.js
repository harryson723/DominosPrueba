let user = document.querySelector('.user');
let pass = document.querySelector('.pass');
console.log(datos);
document.querySelector('.inputL').addEventListener('click', (e) => {
    e.preventDefault();
   
    if(datos) {
        if (user.value == "" && pass.value == "") alert("Inserte datos");
        else if(user.value == datos[0].users && pass.value == datos[0].passs){
           document.querySelector('.loginForm').submit();
        } else alert("Usuario invalido");
    }
    

});
