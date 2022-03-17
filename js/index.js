let pokemonID = 0;

const abrirCampoBusqueda = () => {
    let element = document.getElementById("modalInput");
    element.classList.add("modal-activo");

    element = document.getElementById("inputNamePokemon");
    element.value = "";
    element.focus();
}

const cancelarCampoBusqueda = () => {
    let element = document.getElementById("modalInput");
    element.classList.remove("modal-activo");
}


const buscarPokemon = () => {
    
}

const nextPokemon = () => {

}

const afterPokemon = () => {
    
}