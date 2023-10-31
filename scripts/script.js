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


botonDel.addEventListener('click', () => {
    const idBorrar = document.getElementById('inputDelete').value;
  
    // Buscar el elemento en el panel por su ID
    const elementoAEliminar = panel.querySelector(`#${idBorrar}`);
  
    if (elementoAEliminar) {
      elementoAEliminar.remove();
    } else {
      console.log("Elemento no encontrado en el panel");
    }
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
        panel.innerHTML = `Nombre: ${data.name}<br>Apellido: ${data.lastname}<br>ID: ${data.id}`;
      })
      .catch(e => {
        console.error('Error al crear el registro:', e);
      });
  });

