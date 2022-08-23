const API_URL = 'http://localhost:3000/productos';
let products = [];
let deleteId = null;
console.log(API_URL)
window.addEventListener('DOMContentLoaded', () => {
    getProducts();
})

const getProducts = () => {
    fetch(API_URL)
        .then(response =>response.json())
        .catch(error => {
            alertManager('error', 'Ocurrió un problema al cargar los productos');
        })
        .then(data => {
            console.log(data);
            products = data;
            console.log(products);
            renderResult(products);
        })
}

const productsList = document.querySelector('#productsList');

const renderResult = (products) => {
    let listHTML = "";
    products.forEach(product => {
        listHTML += `
        <div class="card">
            <div><img id="img${product.id}" src="${product.url}"></div>
            <div>Nombre: ${product.titulo}</div>
            <div>Precio: ${product.precio}</div>
            <div class="options">
                <button type="button" onclick="editProduct(${product.id})">Editar</button>
                <button type="button" onclick="openModalConfirm(${product.id})">Eliminar</button>
            </div>
        </div>
    `
    })
    productsList.innerHTML = listHTML;
}

const createProduct = () => {
    const formData = new FormData(document.querySelector('#formAdd'));
    console.log(formData);
    if (!formData.get('nombre').length || !formData.get('precio')) {
        document.querySelector('#msgFormAdd').innerHTML = '* Llena todos los campos';
        return;
    }
    document.querySelector('#msgFormAdd').innerHTML = '';

    const product = {
        titulo: formData.get('nombre'),
        precio: formData.get('precio'),
    }

    console.log(product)

    fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => {
            alertManager('error', error);
            document.querySelector('#formAdd').reset();
        })
        .then(response => {
            alertManager('success', response.mensaje)
            getProducts();
        })
}

const editProduct = (id) => {
    let product = {};
    products.filter(prod => {
        if (prod.id == id) {
            product = prod
            console.log(product);
        }
    });

    document.querySelector('#formEdit #ID').value = product.id;
    document.querySelector('#formEdit #nombre').value = product.titulo;
    document.querySelector('#formEdit #precio').value = product.precio;
    document.querySelector('#formEdit #source').value = product.url;

    console.log(product);
    openModalEdit();
}

const updateProduct = (id) => {
    const product = {
        titulo: document.querySelector('#formEdit #nombre').value,
        precio: document.querySelector('#formEdit #precio').value,
        id: document.querySelector('#formEdit #ID').value,
        url: document.querySelector('#formEdit #source').value,
    }

    if (!product.titulo || !product.precio) {
        document.querySelector('#msgFormEdit').innerHTML = '* Los campos no deben estar vacios';
        return;
    }
    document.querySelector('#msgFormEdit').innerHTML = '';
    
    fetch(`${API_URL}/${product.id}`, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => {
            alertManager('error', error);
        })
        .then(response => {
            alertManager('success', response.mensaje);
            getProducts();
        });
    document.querySelector('#formEdit').reset();
}

const deleteProduct = (id) => {

    fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .catch(error => {
            alertManager('error', error);
        })
        .then(response => {
            alertManager('success', response.mensaje);
            closeModalConfirm();
            getProducts();
            deleteId = null;
        })

}

const confirmDelete = (res) => {
    if (res) {
        deleteProduct(deleteId);
    } else {
        closeModalConfirm();
    }
}



// MODAL 
/** --------------------------------------------------------------- */
const btnAdd = document.querySelector('#btnAdd');
const modalAdd = document.querySelector('#modalAdd');

btnAdd.onclick = () => openModalAdd();

window.onclick = function (event) {
    if (event.target == modalAdd) {
        
    }
}

const closeModalAdd = () => {
    modalAdd.style.display = 'none';
}

const openModalAdd = () => {
    modalAdd.style.display = 'block';
}

// MODAL 
/** --------------------------------------------------------------- */
const modalEdit = document.querySelector('#modalEdit');

const openModalEdit = () => {
    modalEdit.style.display = 'block';
}

const closeModalEdit = () => {
    modalEdit.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == modalEdit) {
        //modalEdit.style.display = "none";
    }
}

// MODAL CONFIRM 
/** --------------------------------------------------------------- */
const modalConfirm = document.getElementById('modalConfirm');

window.onclick = function (event) {
    if (event.target == modalConfirm) {
        modalConfirm.style.display = "none";
    }
}

const closeModalConfirm = () => {
    modalConfirm.style.display = 'none';
}

const openModalConfirm = (id) => {
    deleteId = id;
    modalConfirm.style.display = 'block';
}


/** ALERT */
const alertManager = (typeMsg, message) => {
    const alert = document.querySelector('#alert');

    alert.innerHTML = message || 'Se produjo cambios';
    alert.classList.add(typeMsg);
    alert.style.display = 'block';

    setTimeout(() => {
        alert.style.display = 'none';
        alert.classList.remove(typeMsg);
    }, 4500);

}