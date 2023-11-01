const botonBuscar = document.getElementById('btnGet1');
const botonAgregar = document.getElementById('btnPost');
const botonModificar = document.getElementById('btnPut');
const botonDel = document.getElementById('btnDelete');
const id = document.getElementById("inputGet1Id");
const panel = document.getElementById('results');
const urlGetListado = "https://65417f75f0b8287df1fe6ba5.mockapi.io/users";
const urlGetListadoID = `https://65417f75f0b8287df1fe6ba5.mockapi.io/users/${id.value}`;

// Obtén una referencia a tu botón "Modificar"
const botonMod = document.getElementById('btnPut');

// Agrega un controlador de evento al botón "Modificar"
botonModificar.addEventListener('click', () => {
    // Obtiene los valores ingresados por el usuario
    const nombre = document.getElementById('nameInput').value;
    const apellido = document.getElementById('lastnameInput').value;
     

    // Crea un objeto con los datos que deseas actualizar
    const data = {
        name: nameInput,
        lastname: lastnameInput,
    };

    // URL completa para el usuario específico
    const url = `${url}/${lastnameInput}`;

    // Realiza la solicitud PUT a la API
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Usuario actualizado:', data);
    
    })
    .catch(error => {
        console.error('Error al actualizar usuario:', error);
    });
});
