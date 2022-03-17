let pokemonID = 0;
let indexImg = 4;
const valImg = ['back_default','back_female', 'back_shiny', 'back_shiny_female', 'front_default', 'front_female', 'front_shiny', 'front_shiny_female'];

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
    const element = document.getElementById("inputNamePokemon");
    let namePokemon = element.value;

    if (namePokemon !== null && namePokemon !== "") {
        const url = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`
        fetch(url).then((res) => { return res.json() })
            .then((data) => {
                console.log(data)

                pokemonID = data.id;
                indexImg = 4;

                const imgPokemon = document.getElementById("imgPokemon");
                imgPokemon.src = data.sprites[valImg[indexImg]];

                const namePokemon = document.getElementById("namePokemon");
                namePokemon.innerHTML = data.name;

                const tipoPokemon = document.getElementById("tipoPokemon");
                tipoPokemon.innerHTML = data.types[0].type.name;

                const pesoPokemon = document.getElementById("pesoPokemon");
                pesoPokemon.innerHTML = data.weight

                const alturaPokemon = document.getElementById("alturaPokemon");
                alturaPokemon.innerHTML = data.height

                cancelarCampoBusqueda()
            })
    } else {

    }
}

const nextPokemon = () => {
    
    if (pokemonID != 0) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
        fetch(url).then((res) => { return res.json() })
            .then((data) => {
                console.log(data)
                indexImg++;
                
                if(indexImg > valImg.length -1){
                    indexImg = 0;
                }

                const imgPokemon = document.getElementById("imgPokemon");
                imgPokemon.src = data.sprites[valImg[indexImg]];

            })
    } else {

    }
}

const afterPokemon = () => {

    if (pokemonID != 0) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
        fetch(url).then((res) => { return res.json() })
            .then((data) => {
                console.log(data)
                indexImg--;
                
                if(indexImg < 0){
                    indexImg = valImg.length-1;
                }

                const imgPokemon = document.getElementById("imgPokemon");
                imgPokemon.src = data.sprites[valImg[indexImg]];

            })
    } else {

    }
}