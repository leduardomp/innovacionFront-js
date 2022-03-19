let pokemonID = 0;
let indexImg = 4;
let prendido = false;

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
    110: 'maximo'
}

const abrirCampoBusqueda = (origen) => {

    if (prendido) {

        if (origen === 1) {
            document.getElementById("modalInput").classList.add("modal-activo")
            document.getElementById("inputNamePokemon").value = ""
            document.getElementById("mensajeError").innerHTML = ""

        } else if (origen === 2) {
            document.getElementById("modalInputNumber").classList.add("modal-activo");
            document.getElementById("inputNumberPokemon").value = ""
            document.getElementById("mensajeNumError").innerHTML = ""
        }

    }

}

const cancelarCampoBusqueda = (origen) => {

    if (origen === 1) {
        document.getElementById("modalInput").classList.remove("modal-activo");

    } else if (origen === 2) {
        document.getElementById("modalInputNumber").classList.remove("modal-activo");
    }

}

const buscarPokemon = (origen) => {

    let namePokemon = ''

    if (origen === 1) {
        namePokemon = document.getElementById("inputNamePokemon").value.toLowerCase();
    } else {
        namePokemon = document.getElementById("inputNumberPokemon").value;
    }

    if (namePokemon !== null && namePokemon !== "") {
        const url = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`
        fetch(url)
            .then((res) => {

                if (res.ok) {
                    return res.json()
                } else {
                    mensajeError(res, origen)
                }
            })
            .then((data) => {

                if (data) {
                    cargarDatos(data);
                    cancelarCampoBusqueda(origen);
                }

            })
            .catch((err) => {
                console.log("error")
                console.log(err)
            })

    } else {
        mensajeError({textoVacio:true}, origen)
    }
}

const nextFotoPokemon = () => {

    if (prendido && pokemonID != 0) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
        fetch(url).then((res) => { return res.json() })
            .then((data) => {
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

    if (prendido && pokemonID != 0) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
        fetch(url).then((res) => { return res.json() })
            .then((data) => {
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

    if (valor > 100) {
        return valPorcientos[110]

    } else {
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
    if (prendido && pokemonID != 0) {
        pokemonID++
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
        fetch(url).then((res) => { return res.json() })
            .then((data) => {
                cargarDatos(data)
            })
    }
}

const afterPokemon = () => {
    if (prendido && pokemonID != 0) {
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

    const listaMov = document.getElementById("listaMov");
    listaMov.innerHTML = getListadoMovimientos(data)



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

const turnOnOff = () => {

    if (prendido) {
        const imgPokemon = document.getElementById("imgPokemon")
        imgPokemon.classList.add("oculto");

        const namePokemon = document.getElementById("namePokemon")
        namePokemon.classList.add("oculto");

        const textoPizarra = document.getElementById("textoPizarra")
        textoPizarra.classList.add("oculto");

        const movimientos = document.getElementById("movimientos")
        movimientos.classList.add("oculto");

        const numPokemon = document.getElementById("numPokemon")
        numPokemon.classList.add("oculto");

        const alturaDiv = document.getElementById("alturaDiv")
        alturaDiv.classList.add("oculto");

        const pesoDiv = document.getElementById("pesoDiv")
        pesoDiv.classList.add("oculto");

        prendido = false;

    } else {
        const imgPokemon = document.getElementById("imgPokemon")
        imgPokemon.classList.remove("oculto");

        const namePokemon = document.getElementById("namePokemon")
        namePokemon.classList.remove("oculto");

        const textoPizarra = document.getElementById("textoPizarra")
        textoPizarra.classList.remove("oculto");

        const numPokemon = document.getElementById("numPokemon")
        numPokemon.classList.remove("oculto");

        const alturaDiv = document.getElementById("alturaDiv")
        alturaDiv.classList.remove("oculto");

        const pesoDiv = document.getElementById("pesoDiv")
        pesoDiv.classList.remove("oculto");

        prendido = true;
    }
}

const cambiarStadisticMov = () => {

    if (prendido) {
        const textPizarra = document.getElementById("textoPizarra")
        textPizarra.classList.toggle("oculto");

        const movimientos = document.getElementById("movimientos")
        movimientos.classList.toggle("oculto");
    }
}

const getListadoMovimientos = (data) => {

    let listaFinalMovimientos = '';

    data.moves.forEach(item => {
        listaFinalMovimientos += item.move.name + ", "
    });

    return listaFinalMovimientos
}

const mensajeError = (res, origen) => {

    let mensajeError = ''

    if (origen === 1) {
        mensajeError = document.getElementById("mensajeError")

    } else if (origen === 2) {
        mensajeError = document.getElementById("mensajeNumError")
    }


    if (res.status === 404) {
        mensajeError.innerHTML = "Pokemon no localizado"

    }else if(res.textoVacio){
        mensajeError.innerHTML = "Debes llenar la casilla"

    } else {
        mensajeError.innerHTML = "Ocurrio el error -" + res.status
    }

}