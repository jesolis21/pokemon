// Obtener referencia al botón y al div donde se mostrará la tarjeta del pokemon
const fetchButton = document.getElementById("fetch-pokemon");
const pokemonCard = document.getElementById("pokemon-card");

// Función para obtener un pokemon aleatorio
async function fetchRandomPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + getRandomPokemonId());
    const data = await response.json();
    return data;
}

// Función para obtener un ID de pokemon aleatorio entre 1 y 151 (puedes ajustar el rango)
function getRandomPokemonId() {
    return Math.floor(Math.random() * 151) + 1;
}

// Función para mostrar la tarjeta del pokemon
function displayPokemonCard(pokemon) {
    const cardHTML = `
        <div class="card">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Nombre: ${pokemon.name}</p>
            <p>ID: ${pokemon.id}</p>
            <p>Peso: ${pokemon.weight} kg</p>
        </div>
    `;
    pokemonCard.innerHTML = cardHTML;
}

// Evento de clic en el botón para obtener un pokemon
fetchButton.addEventListener("click", async () => {
    const pokemon = await fetchRandomPokemon();
    displayPokemonCard(pokemon);

    // Guardar el pokemon en localStorage
    localStorage.setItem("pokemon", JSON.stringify(pokemon));
});

// Verificar si hay un pokemon guardado en localStorage y mostrarlo
const savedPokemon = JSON.parse(localStorage.getItem("pokemon"));
if (savedPokemon) {
    displayPokemonCard(savedPokemon);
}