document.getElementById("busqueda").addEventListener('change', (event) => {
    const option = event.target.value;
    if (option !== '-1') {
        document.getElementById('dato').disabled = false;
    } else {
        document.getElementById('dato').value = '';
        document.getElementById('dato').disabled = true;
    }
});

document.getElementById("busquedaHeroe").addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const busqueda = event.target.elements.busqueda.value;
    const dato = event.target.elements.dato.value;
    const resultados = registro.busqueda(busqueda, dato); // arreglo vacio, arreglo con algunos heroes o un arreglo con todos los heroes
    impremeBusqueda(resultados);
});

function impremeBusqueda(listadoHeroes) {
    const area = document.getElementById("imprime");
    if (listadoHeroes.length === 0) {
        area.innerHTML = "<p>No encontramos a ningún heroe! :(</p>";
        return
    }
    const heroesElements = listaOpciones.reduce((acc, curr, p) => {
        return acc += `<div><p>${curr.nombre}</p></div>`; // '<li>'+curr.nombre+'</li>'
    }, '');
    area.innerHTML = heroesElements;
}

function creaMenus(listaOpciones) {
    const menu = document.getElementById("menus"); //HTMLElement
    const liElements = listaOpciones.reduce((acc, curr, p) => {
        return acc += `<li class="menuevents" id="opcion-${p}">${curr.nombre}</li>`; // '<li>'+curr.nombre+'</li>'
    }, '');

    // iteracion 0
    // acc = ''
    // curr = {
    //     nombre: "Registrar",
    //     link: "/registrar",
    //     active: true
    // },
    // p = 0

    // iteracion 1
    // acc = '<li></li>'
    // curr = {
    //     nombre: "Buscar",
    //     link: "/buscar",
    //     active: true
    // },
    // p = 1


    menu.innerHTML = liElements;

    Array.from(document.getElementsByClassName("menuevents")).forEach((el) => el.addEventListener('click', (event) => {
        //event.stopPropagation(); // cancela la propagacion del evento
        //event.preventDefault(); // cancela el evento
        const posicion = Number(event.target.id.split("-")[1]); // 1 // explicita Number() // implicita * 1
        const ruta = menus[posicion].link;
        Array.from(document.getElementsByClassName("area")).forEach((el) => el.classList.replace('visible', 'invisible'));
        document.getElementById(ruta).classList.replace('invisible', 'visible');
    }));
}