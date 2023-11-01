const botonBuscar = document.getElementById('btnGet1');
const botonAgregar = document.getElementById('btnPost');
const botonMod = document.getElementById('btnPut');
const botonDel = document.getElementById('btnDelete');
const id = document.getElementById("inputGet1Id");
const panel = document.getElementById('results');
const urlGetListado = "https://65417f75f0b8287df1fe6ba5.mockapi.io/users";

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
