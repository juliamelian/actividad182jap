const botonBuscar = document.getElementById('btnGet1');
const botonAgregar = document.getElementById('btnPost');
const botonModificar = document.getElementById('btnPut');
const botonDel = document.getElementById('btnDelete');
const idInput = document.getElementById("inputGet1Id");
const panel = document.getElementById('results');
const urlGetListado = "https://65417f75f0b8287df1fe6ba5.mockapi.io/users";
const urlGetListadoID = `https://65417f75f0b8287df1fe6ba5.mockapi.io/users/${idInput.value}`;
const urlPOST = "https://65417f75f0b8287df1fe6ba5.mockapi.io/users";
const inputPostNombre = document.getElementById('inputPostNombre');
const inputPostApellido = document.getElementById('inputPostApellido');
const inputMod = document.getElementById("inputPutId")
const inputDelete = document.getElementById("inputDelete")
const modalGuardarButton = document.getElementById('saveChanges');
const modalSendChangesButton = document.getElementById('btnSendChanges');

// Habilitamos o deshabilitamos los botones según el contenido de los campos
function updateButtonState() {
    botonAgregar.disabled = inputPostNombre.value.trim() === "" || inputPostApellido.value.trim() === "";
    botonModificar.disabled = inputMod.value.trim() === "";
    botonDel.disabled = inputDelete.value.trim() === "";
}

// Agregamos controladores de eventos "input" a los campos
idInput.addEventListener("input", updateButtonState);
inputPostNombre.addEventListener("input", updateButtonState);
inputPostApellido.addEventListener("input", updateButtonState);
inputDelete.addEventListener("input", updateButtonState);
inputMod.addEventListener("input", updateButtonState)

// Inicialmente, desactivamos los botones
updateButtonState();

botonModificar.addEventListener('click', () => {
    const idMOD = inputMod.value;

    fetch(`${urlGetListado}/${idMOD}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("No se pudo obtener los datos del usuario. Algo salió mal.");
                throw new Error('No se pudo obtener los datos del usuario');
            }
        })
        .then(data => {
            nameInput.value = data.name;
            lastnameInput.value = data.lastname;
        })
        .catch(error => {
            console.error('Error al obtener datos del usuario:', error);
        });

});

modalGuardarButton.addEventListener('click', () => {
    const idMOD = inputMod.value;
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
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("No se pudo actualizar el usuario. Algo salió mal.");
                throw new Error('No se pudo actualizar el usuario');
            }
        })
        .then(data => {
            panel.innerHTML = `Usuario actualizado:<br>ID: ${data.id}<br>Nombre: ${data.name}<br>Apellido: ${data.lastname}`;
            console.log('Usuario actualizado:', data);

        })
        .catch(error => {
            console.error('Error al actualizar usuario:', error);
        });
    //no funciona: inputMod.innerHTML = ""
});

botonDel.addEventListener('click', () => {
    const userId = inputDelete.value;
    const deleteUrl = `${urlGetListado}/${userId}`;

    const options = {
        method: 'DELETE',
    };

    fetch(deleteUrl, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("No se pudo eliminar el usuario. Algo salió mal.");
                throw new Error('No se pudo eliminar el usuario');
            }
        })
        .then(data => {
            panel.innerHTML = `Usuario eliminado:<br>ID: ${data.id}<br>Nombre: ${data.name}<br>Apellido: ${data.lastname}`;

        })
        .catch(error => {
            panel.innerHTML = 'Error al eliminar el usuario';
            console.error('Error al eliminar el usuario:', error);
        });

});

botonAgregar.addEventListener('click', () => {
    const nombre = inputPostNombre.value;
    const apellido = inputPostApellido.value;

    if (nombre.trim() === "" || apellido.trim() === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }
    const data = {
        name: nombre,
        lastname: apellido,
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    fetch(urlPOST, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("No se pudo agregar el registro. Algo salió mal.");
                throw new Error('No se pudo agregar el registro');
            }
        })
        .then(data => {
            panel.innerHTML = `Registro Agregado:<br>ID: ${data.id}<br>Nombre: ${data.name}<br>Apellido: ${data.lastname}`;
        })
        .catch(e => {
            panel.innerHTML = "Error al crear el registro" + e
            console.error('Error al crear el registro:', e);
        });
});

botonBuscar.addEventListener("click", async () => {
    const idValue = idInput.value.trim();
    if (idValue === "") {
        try {
            const response = await fetch(urlGetListado);
            const data = await response.json();
            showAllData(data);
        } catch (error) {
            alert("No se pudo realizar la búsqueda. Algo salió mal.");
            console.error("Error trayendo:", error);
        }
    } else {
        try {
            const urlGetListadoID = `${urlGetListado}/${idInput.value}`;
            const response = await fetch(urlGetListadoID);
            const data = await response.json();
            console.log(idInput.value);
            showData(data);
        } catch (error) {
            alert("No se pudo realizar la búsqueda. Algo salió mal.");
            console.error("Error trayendo:", error);
        }
    }
});
function showData(data) {
    if (data.id) {
        panel.innerHTML = `<p> ID: ${data.id} <br> NAME: ${data.name} <br> LASTNAME: ${data.lastname} </p>`;
    } else {
        panel.innerHTML = "Usuario no encontrado.";
    }
}

function showAllData(data) {
    panel.innerHTML = "";
    data.forEach(item => {
        const listItem = document.createElement("div");
        listItem.innerHTML = `<p> ID: ${item.id} <br> NAME: ${item.name} <br> LASTNAME: ${item.lastname} </p>`;
        panel.appendChild(listItem);
    });
}
