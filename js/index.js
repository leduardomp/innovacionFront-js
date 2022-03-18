let pokemonID = 0;
let indexImg = 4;
const valImg = ['back_default', 'back_female', 'back_shiny', 'back_shiny_female', 'front_default', 'front_female', 'front_shiny', 'front_shiny_female'];
const valPorcientos = {
    0: 'ceroPorciento',
    5: 'cincoPorciento', 10: 'diezPorciento',
    15: 'quincePorciento', 20: 'veintePorciento',
    25: 'veitiCincoPorciento', 30: 'treintaPorciento',
    35: 'treintaCincoPorciento', 40: 'cuarentaPorciento',
    45: 'cuarentaCincoPorciento', 50: 'cincuentaPorciento',
    55: 'cincuentaCincoPorciento', 60: 'sesentaPorciento',
    65: 'sesentaCincoPorciento', 70: 'setentaPorciento',
    75: 'setentaCincoPorciento', 80: 'ochentaPorciento',
    85: 'ochentaCincoPorciento', 90: 'noventaPorciento',
    95: 'noventaCincoPorciento', 100: 'cienPorciento',
    110:'maximo'
}

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
    let namePokemon = element.value.toLowerCase();

    if (namePokemon !== null && namePokemon !== "") {
        const url = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`
        fetch(url).then((res) => { return res.json() })
            .then((data) => {
                cargarDatos(data);
                cancelarCampoBusqueda();
            })
    } else {

    }
}

const nextFotoPokemon = () => {

    if (pokemonID != 0) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
        fetch(url).then((res) => { return res.json() })
            .then((data) => {
                console.log(data)
                indexImg++;

                if (indexImg > valImg.length - 1) {
                    indexImg = 0;
                }

                if (data.sprites[valImg[indexImg]] != null) {
                    const imgPokemon = document.getElementById("imgPokemon");
                    imgPokemon.src = data.sprites[valImg[indexImg]];
                }

            })
    } else {

    }
}

const afterFotoPokemon = () => {

    if (pokemonID != 0) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
        fetch(url).then((res) => { return res.json() })
            .then((data) => {
                console.log(data)
                indexImg--;

                if (indexImg < 0) {
                    indexImg = valImg.length - 1;
                }

                if (data.sprites[valImg[indexImg]] != null) {
                    const imgPokemon = document.getElementById("imgPokemon");
                    imgPokemon.src = data.sprites[valImg[indexImg]];
                }

            })
    } else {

    }
}

const obtenerCssNivel = (valor) => {

    let residuo = valor % 5

    if(valor > 100){
        return valPorcientos[110]
        
    }else{
        if (valor > 0 && residuo == 0) {
            return valPorcientos[valor]
    
        } else {
    
            if (residuo < 3)
                valor = valor - residuo
            else if (residuo === 3)
                valor = valor + 2
            else if (residuo === 4)
                valor = valor + 1
            
            return valPorcientos[valor]
        }
    }
}

const nextPokemon = () => {
    if (pokemonID != 0) {
        pokemonID++
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
        fetch(url).then((res) => { return res.json() })
            .then((data) => {
                cargarDatos(data)
            })
    }
}

const afterPokemon = () => {
    if (pokemonID != 0) {
        pokemonID--

        if (pokemonID > 0) {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
            fetch(url).then((res) => { return res.json() })
                .then((data) => {
                    cargarDatos(data)
                })
        } else {
            pokemonID = 1
        }
    }
}

const cargarDatos = (data) => {
    console.log(data)

    pokemonID = data.id;
    indexImg = 4;

    const imgPokemon = document.getElementById("imgPokemon");
    imgPokemon.src = data.sprites[valImg[indexImg]];

    const namePokemon = document.getElementById("namePokemon");
    namePokemon.innerHTML = data.name;

    const numPokemon = document.getElementById("numPokemon");
    numPokemon.innerHTML = "#" + pokemonID;

    const tipoPokemon = document.getElementById("tipoPokemon");
    tipoPokemon.innerHTML = data.types[0].type.name;

    const pesoPokemon = document.getElementById("pesoPokemon");
    pesoPokemon.innerHTML = data.weight

    const alturaPokemon = document.getElementById("alturaPokemon");
    alturaPokemon.innerHTML = data.height



    const nivelHP = document.getElementById("nivelHP");
    nivelHP.removeAttribute("class");
    nivelHP.classList.add("cantidad");
    nivelHP.classList.add(obtenerCssNivel(data.stats[0].base_stat));

    const nivelAttack = document.getElementById("nivelAttack");
    nivelAttack.removeAttribute("class");
    nivelAttack.classList.add("cantidad");
    nivelAttack.classList.add(obtenerCssNivel(data.stats[1].base_stat));

    const nivelDefense = document.getElementById("nivelDefense");
    nivelDefense.removeAttribute("class");
    nivelDefense.classList.add("cantidad");
    nivelDefense.classList.add(obtenerCssNivel(data.stats[2].base_stat));

    const nivelSuperAttack = document.getElementById("nivelSuperAttack");
    nivelSuperAttack.removeAttribute("class");
    nivelSuperAttack.classList.add("cantidad");
    nivelSuperAttack.classList.add(obtenerCssNivel(data.stats[3].base_stat));

    const nivelSuperDefense = document.getElementById("nivelSuperDefense");
    nivelSuperDefense.removeAttribute("class");
    nivelSuperDefense.classList.add("cantidad");
    nivelSuperDefense.classList.add(obtenerCssNivel(data.stats[4].base_stat));

    const nivelSpeed = document.getElementById("nivelSpeed");
    nivelSpeed.removeAttribute("class");
    nivelSpeed.classList.add("cantidad");
    nivelSpeed.classList.add(obtenerCssNivel(data.stats[5].base_stat));

}