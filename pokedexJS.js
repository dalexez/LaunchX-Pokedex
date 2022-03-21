const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pkmnToSearch");
    let pkmnToSearch = pokeNameInput.value;
    pkmnToSearch = pkmnToSearch.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pkmnToSearch}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImage("./pokemon-sad.gif")
        }
        else {
            return res.json();
        }
    }).then((datos) => {
        if (datos) {
            let pokeImg = datos.sprites.front_default;
            pokeImage(datos);
        }
    });
}

const pokeImage = (datos) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = datos.sprites.other.home.front_default;

    //pequeña rutina para dar formato a el numero de pokemon
    let number = datos.id.toString();
    if (number.length == 1) {
        number = "#00" + number;
    } else if (number.length == 2) {
        number = "#0" + number;
    } else {
        number = "#" + number;
    }
    //

    // para dar formato a los stats
    const baseStat = (baseStat) => {
        if(baseStat.length == 1) {
            return "00" + baseStat;
        } else if(baseStat.length == 2) {
            return "0" + baseStat;
        } else {
            return baseStat;
        }
    }
    //

    typesPoke = datos.types.map(function(tipos){ //Esto saca los tipo de pokemon y los mete en un arreglo todos juntos
        return `<p class="types">${tipos.type.name}</p>`
    })

    //Para conseguir los movimientos iniciales del pokemon
    abilitiesPkmn = datos.abilities.map(function(habilidades){
        return `<span>${habilidades.ability.name}</span>`
    })

    document.getElementById("pokeName").innerText = datos.name
    document.getElementById("pokeNumber").innerText = number
    //document.getElementById("type").innerText = datos.types[0].type.name
    document.getElementById("typePokemon").innerHTML = typesPoke.join(" ")
    document.getElementById("height").innerText = `${datos.height / 10} m`
    document.getElementById("weight").innerText = `${datos.weight / 10} kg`
    document.getElementById("abilities").innerHTML = abilitiesPkmn.join(" ")
    //document.getElementById("category").innerText = 
    //document.getElementById("category").innerText = ("HOLA");

    // Esto es para cambiar el tamaño de la barra de los stats de los pokemon
    //document.getElementById("stat1").innerText = data.stats[0].stat.name;
    document.getElementById("hpBar").style.width = `${datos.stats[0].base_stat/2}%`;
    document.getElementById("hp").innerText = baseStat(datos.stats[0].base_stat.toString());

    //document.getElementById("stat2").innerText = data.stats[1].stat.name;
    document.getElementById("atkBar").style.width = `${datos.stats[1].base_stat/2}%`;
    document.getElementById("atk").innerText = baseStat(datos.stats[1].base_stat.toString());

    //document.getElementById("stat3").innerText = datos.stats[2].stat.name;
    document.getElementById("defBar").style.width = `${datos.stats[2].base_stat/2}%`;
    document.getElementById("def").innerText = baseStat(datos.stats[2].base_stat.toString());

    //document.getElementById("stat4").innerText = datos.stats[3].stat.name;
    document.getElementById("satkBar").style.width = `${datos.stats[3].base_stat/2}%`;
    document.getElementById("satk").innerText = baseStat(datos.stats[3].base_stat.toString());

    //document.getElementById("stat5").innerText = datos.stats[4].stat.name;
    document.getElementById("sdefBar").style.width = `${datos.stats[4].base_stat/2}%`;
    document.getElementById("sdef").innerText = baseStat(datos.stats[4].base_stat.toString());

    //document.getElementById("stat5").innerText = datos.stats[4].stat.name;
    document.getElementById("spdBar").style.width = `${datos.stats[5].base_stat/2}%`;
    document.getElementById("spd").innerText = baseStat(datos.stats[5].base_stat.toString());
    //

    // No estoy seguro que este bien hacerlo aquí este fetch, es para conseguir la especie
    urlCategory = `https://pokeapi.co/api/v2/pokemon-species/${datos.id}`;
    fetch(urlCategory).then((res) => {
        return res.json();
    }).then((datos) => {
        document.getElementById("category").innerText = datos.genera[7].genus;
    });
    // 
}