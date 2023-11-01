const botonBuscar = document.getElementById('btnGet1');
const botonAgregar = document.getElementById('btnPost');
const botonMod = document.getElementById('btnPut');
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

