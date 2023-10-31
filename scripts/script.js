const botonBuscar = document.getElementById('btnGet1');
const botonAgregar = document.getElementById('btnPost');
const botonMod = document.getElementById('btnPut');
const botonDel = document.getElementById('btnDelete');
const id = document.getElementById("inputGet1Id");
const panel = document.getElementById('results');
const urlGetListado = "https://65417f75f0b8287df1fe6ba5.mockapi.io/users";
const urlGetListadoID = `https://65417f75f0b8287df1fe6ba5.mockapi.io/users/${id.value}`;

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