document.getElementById("busqueda").addEventListener('change', (event) => {
    const option = event.target.value;
    if (option !== '-1') {
        document.getElementById('dato').disabled = false;
    } else {
        document.getElementById('dato').value = '';
        document.getElementById('dato').disabled = true;
    }
});

document.getElementByName("haspowers").addEventListener("change", () => {
    console.log(document.getElementById("haspowers").value)
})

document.getElementById("busquedaHeroe").addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const busqueda = event.target.elements.busqueda.value;
    const dato = event.target.elements.dato.value;
    const resultados = registro.busqueda(busqueda, dato); // arreglo vacio, arreglo con algunos heroes o un arreglo con todos los heroes
    console.log("resultados", resultados)
    impremeBusqueda(resultados);
});

document.querySelector("#registraHeroe").addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.target.elements);
    const data = Object.entries(event.target.elements).filter((prop) => isNaN(Number(prop[0]))) // [ [ key, value ] ] //'weakness'
    preregistro(data);
});

function cardHeroe(heroe) {
    const card = `<div class="cardHeroe">
        <div>
            <img src="images/${heroe.genero === 'M' ? 'hombre.jpeg' : 'mujer.jpeg'}">
        </div>
        <div>
            <p>${heroe.nombre}</p>
        </div>
    </div>`;
    return card;
}

function allHeroes() {
    const area = document.getElementById("todosHeroes");
    const heroesElements = registro.obtenTodosHeroes().reduce((acc, curr, p) => {
        return acc += cardHeroe(curr); // '<li>'+curr.nombre+'</li>'
    }, '');
    area.innerHTML = heroesElements;
}

function preregistro(dataHeroe) {
    console.log("dataHeroe", dataHeroe);

    const persona = { "nombre": "pedro", "edad": 33 }
    persona["profesion"] = "programador";
                                    //[ key, value]
    const heroe = dataHeroe.reduce((acc, value, position, array) => {
        return { ...acc, [value[0]]: value[1].value } // "nombre"
    }, {});

    console.log("heroe", heroe);

    validaInfoHeroe(dataHeroe, heroe)
}

function validaInfoHeroe(dataHeroe, heroe) {
    if (heroe.haspowers === 'S') {
        if (heroe.powers === '') {
            alert("Enlista todos los poderes")
            return;
        }
        heroe.powers = heroe.powers.split(",")
    }

    if (heroe.weakness === 'S') {
        if (heroe.allweakness === '') {
            alert("Enlista todos las debilidades")
            return;
        }
        heroe.allweakness = heroe.allweakness.split(",")
    }
    console.log("heroe---", heroe)

    guardaHeroe(dataHeroe, heroe)
}

function guardaHeroe(dataHeroe, heroe) {
    registro.registro(heroe);
    limpieza()
    allHeroes();
}

function impremeBusqueda(listadoHeroes) {
    const area = document.getElementById("imprime");
    if (listadoHeroes.length === 0) {
        area.innerHTML = "<p>No encontramos a ningún heroe! :(</p>";
        return
    }
    const heroesElements = listadoHeroes.reduce((acc, curr, p) => {
        return acc += cardHeroe(curr); // '<li>'+curr.nombre+'</li>'
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
        // limpieza de areas
        limpieza();
        Array.from(document.getElementsByClassName("area")).forEach((el) => el.classList.replace('visible', 'invisible'));
        document.getElementById(ruta).classList.replace('invisible', 'visible');
    }));
}

function limpieza() {
    // registrar
    document.querySelector("#registraHeroe").reset();
    // buscar
    document.querySelector("#busquedaHeroe").reset();
    document.querySelector("#imprime").innerHTML = "";
}