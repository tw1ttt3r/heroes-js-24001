class Registro {
    constructor() {
        this.heroes = []; // objeto tipo Heroe
        this.historialBusqueda = [];
    }
                //nombre | ciudad | genero    // valor de la busqueda
    busqueda(propiedad, dato) {
        console.log(propiedad, dato)
        const resultados = this.heroes.filter((heroe) => heroe[propiedad] === dato);
        this.historialBusqueda.push(resultados);
        return resultados
    }

    registro(heroe) {
        const newHeroe = new Heroe(heroe);
        this.guardaHeroe(newHeroe)
    }

    guardaHeroe(heroe) {
        this.heroes = [ ...this.heroes, heroe ]
        console.log(this.heroes)
    }

    obtenTodosHeroes() {
        return this.heroes
    }
}