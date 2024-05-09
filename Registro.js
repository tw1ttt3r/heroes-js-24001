class Registro {
    constructor() {
        this.heroes = []; // objeto tipo Heroe
        this.historialBusqueda = []
    }
                //nombre | ciudad | genero    // valor de la busqueda
    busqueda(propiedad, dato) {
        const resultados = this.heroes.filter((heroe) => {
            heroe[propiedad] === dato
        });
        this.historialBusqueda.push(resultados);
        return resultados
    }

    registro() {}
}