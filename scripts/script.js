const botonBuscar = document.getElementById('btnGet1');
const botonAgregar = document.getElementById('btnPost');
const botonModificar = document.getElementById('btnPut');
const botonDel = document.getElementById('btnDelete');
const id = document.getElementById("inputGet1Id");
const panel = document.getElementById('results');
const urlGetListado = "https://65417f75f0b8287df1fe6ba5.mockapi.io/users";
const urlGetListadoID = `https://65417f75f0b8287df1fe6ba5.mockapi.io/users/${id.value}`;
/*
Agregar: POST https://65417f75f0b8287df1fe6ba5.mockapi.io/users
Recibe un json con un objeto con los atributos name y lastname, (en el body) lo agrega a la base de datos (asignándole un id) y devuelve un json con el registro creado.
*/
const urlPOST = "https://65417f75f0b8287df1fe6ba5.mockapi.io/users"
const inputPostNombre =  document.getElementById('inputPostNombre');
const inputPostApellido  =  document.getElementById('inputPostApellido');
const btnPost =  document.getElementById('btnPost');



const inputDelete = document.getElementById('inputDelete'); // Campo de entrada para el ID del usuario a eliminar

botonDel.addEventListener('click', () => {
    const userId = inputDelete.value; // Obtén el ID del usuario a eliminar desde el campo de entrada

    const deleteUrl = `${urlGetListado}/${userId}`; // Configura la URL completa para el usuario a eliminar

    const options = {
        method: 'DELETE',
    };

    fetch(deleteUrl, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
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

btnPost.addEventListener('click', () => {
    const nombre = inputPostNombre.value;
    const apellido = inputPostApellido.value;
  
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
      .then(response => response.json())
      .then(data => {
        panel.innerHTML = `Registro Agregado:<br>ID: ${data.id}<br>Nombre: ${data.name}<br>Apellido: ${data.lastname}`;
      })
      .catch(e => {
        console.error('Error al crear el registro:', e);
      });
  });

botonBuscar.addEventListener("click", async () => {
    const idValue = id.value.trim();
    if (idValue === "") {
        try {
            const response = await fetch(urlGetListado);
            const data = await response.json();
            showAllData(data);
        } catch (error) {
            console.error("Error trayendo:", error);
        }
    } else {
        try {
            const urlGetListadoID = `${urlGetListado}/${id.value}`;
            const response = await fetch(urlGetListadoID);
            const data = await response.json();
            console.log(id.value);
            showData(data);
        } catch (error) {
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
