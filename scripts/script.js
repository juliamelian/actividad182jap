const botonBuscar = document.getElementById('btnGet1');
const botonAgregar = document.getElementById('btnPost');
const botonModificar = document.getElementById('btnPut');
const botonDel = document.getElementById('btnDelete');
const id = document.getElementById("inputGet1Id");
const panel = document.getElementById('results');
const urlGetListado = "https://65417f75f0b8287df1fe6ba5.mockapi.io/users";
const urlGetListadoID = `https://65417f75f0b8287df1fe6ba5.mockapi.io/users/${id.value}`;


const botonMod = document.getElementById('btnPut');
const nameInput = document.getElementById('nameInput');
const lastnameInput = document.getElementById('lastnameInput');
const saveChangesButton = document.getElementById('saveChanges');

botonMod.addEventListener('click', () => {
    const idMOD = document.getElementById('inputPutId').value;

    // Realiza la solicitud GET para obtener los datos existentes del usuario con el ID especificado y luego los muestra en el modal
    fetch(`${urlGetListado}/${idMOD}`)
        .then(response => response.json())
        .then(data => {
            nameInput.value = data.name;
            lastnameInput.value = data.lastname;
        })
        .catch(error => {
            console.error('Error al obtener datos del usuario:', error);
        });
});

// Cuando se hace clic en "Guardar" en el modal, realiza una solicitud PUT para actualizar los datos
saveChangesButton.addEventListener('click', () => {
    const idMOD = document.getElementById('inputPutId').value;
    const nombre = nameInput.value;
    const apellido = lastnameInput.value;

    const data = {
        name: nombre,
        lastname: apellido,
    };

    fetch(`${urlGetListado}/${idMOD}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        panel.innerHTML = `Usuario actualizado: <br>ID: ${data.id}<br>Nombre: ${data.name}<br>Apellido: ${data.lastname}`
        console.log('Usuario actualizado:', data);
    })
    .catch(error => {
        panel.innerHTML = `Error al actualizar usuario: ${error}`
        console.error('Error al actualizar usuario:', error);
    });
});

panel.innerHTML = `Usuario actualizado: <br>ID: ${data.id}<br>Nombre: ${data.name}<br>Apellido ${data.lastname}`
console.log('Usuario actualizado:', data);
