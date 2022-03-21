const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pkmnToSearch");
    let pkmnToSearch = pokeNameInput.value;
    pkmnToSearch = pkmnToSearch.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pkmnToSearch}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./pokemon-sad.gif")
        }
        else {
            return res.json();
        }
    }).then((datos) => {
        if (datos) {
            console.log(datos);
            let pokeImg = datos.sprites.front_default;
            pokeImage(datos);
            console.log(pokeImg);
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

    // //Esto es para calcular el ancho de la barra de stats
    // let progress = document.getElementsByClassName("progress");
    // let bars = document.getElementsByClassName("bar");

    // console.log(progress)

    // for (let i = 0; i < progress.length; i++) {
    //     bars[i].style.width = (parseInt(progress[i].innerText)/2) + "%";
    // }
    // //


    typesPoke = datos.types.map(function(tipos){ //Esto saca los tipo de pokemon y los mete en un arreglo todos juntos
        return `<p class="types">${tipos.type.name}</p>`
    })

    abilitiesPkmn = datos.abilities.map(function(habilidades){
        return `<span>${habilidades.ability.name}</span>`
    })

    console.log(abilitiesPkmn);

    //pruebaInnerHTML = typesPoke.join(" ")
    //console.log(pruebaInnerHTML)

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
        //pokeSpecies(datos);
        console.log(datos.genera[7].genus)
    });
    // 

    

    // const pokeSpecies = (datos) => {
    //     document.getElementById("category".innerText = datos.genera[7].genus);
    //     console.log("HOLA") 
    // }
    
}






// var numbers = [1, 5, 10, 15];
// var doubles = numbers.map(function(x) {
//    return x * 2;
// });

// // doubles is now [2, 10, 20, 30]
// // numbers is still [1, 5, 10, 15]

// var numbers = [1, 4, 9];
// var roots = numbers.map(function(num) {
//     return Math.sqrt(num);
// });
// // roots is now [1, 2, 3]
// // numbers is still [1, 4, 9]

// const materials = [
//     'Hydrogen',
//     'Helium',
//     'Lithium',
//     'Beryllium'
//   ];
  
//   console.log(materials.map(material => material.length));
//   // expected output: Array [8, 6, 7, 9]
//   console.log(materials)