// ----- Lista de productos --------/ 

const products = [{
    id: 1,
    name: "Choker basic",
    price: 250,
    stock: 200,
    cantidad: 0
}, {
    id: 2,
    name: "Choker Daisy",
    price: 300,
    stock: 20,
    cantidad: 0
},  {
    id: 3,
    name: "Choker Jupiter",
    price: 200,
    stock: 25,
    cantidad: 0
}];

let carrito = []

const clickButton = document.querySelectorAll(".btnAgregar");
console.log(clickButton)

clickButton.forEach(btn =>{
    btn.addEventListener("click",addItem);
})


function addItem(event){
    const button = event.target 
    console.log(button)
    const objetoElegido = products.find((product) => product.id == button.id);
    carrito.push(objetoElegido);
    let total = carrito.reduce((acumulador, itemActual) => acumulador += itemActual.price, 0);
    console.log(carrito)
    console.log(total)
    const mostrar = document.getElementById('result')

    mostrar.innerHTML = `<h3>El precio total es: ${total} </h3>`
}