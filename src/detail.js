// Navegação entre Pokémon na página de detalhes
let currentPokemonId = 1;

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function convertPokemonToDetailDiv(pokemon) {
    return `
    <header class="header_detail">
        <div class="${pokemon.type}">
            <span id="pokemonName" class="header_detail_name">${pokemon.name}</span>
            <span id="pokemonNumber" class="header_detail_id">#${pokemon.number}</span>
        </div>
    </header>
    <main>
        <div class="apresentacao_pokemom">
            <img class="apresentacao_pokemom_foto" src="${pokemon.photo}" alt="${pokemon.name}">
            <span class="apresentacao_pokemom_tipo">${pokemon.type}</span>
            <span class="apresentacao_pokemom_sobre">About</span>
            <div class="apresentacao_pokemom_caracteristica_conteiner">
                <div class="apresentacao_pokemom_caracteristica">
                    <span class="apresentacao_pokemom_caracteristica_detalhe">${pokemon.weight} kg</span>
                    <span class="apresentacao_pokemom_caracteristica_detalhe2">Weight</span>
                </div>
                <div class="apresentacao_pokemom_caracteristica">
                    <span class="apresentacao_pokemom_caracteristica_detalhe">${pokemon.height} m</span>
                    <span class="apresentacao_pokemom_caracteristica_detalhe2">Height</span>
                </div>
            </div>
        </div>
        
        <!-- Botões de navegação -->
        <div class="navigation-buttons">
            <button id="prevButton" onclick="navigatePokemon(-1)" ${currentPokemonId <= 1 ? 'disabled' : ''}>
                ← Anterior
            </button>
            <button id="nextButton" onclick="navigatePokemon(1)" ${currentPokemonId >= 151 ? 'disabled' : ''}>
                Próximo →
            </button>
        </div>
    </main>
    `;
}

function loadPokemonDetailPage(id) {
    currentPokemonId = parseInt(id);
    
    pokeApi.getPokemonDetailId(id).then((pokemon) => {
        const pokemonDetailElement = document.getElementById('pokemonDetail');
        
        if (pokemonDetailElement) {
            const pokemonHtml = convertPokemonToDetailDiv(pokemon);
            pokemonDetailElement.innerHTML = pokemonHtml;
            
            // Atualizar URL sem recarregar a página
            const newUrl = `${window.location.pathname}?id=${id}`;
            window.history.pushState({id: id}, '', newUrl);
        } else {
            console.error('Elemento pokemonDetail não encontrado.');
        }
    }).catch((error) => {
        console.error('Erro ao carregar Pokémon:', error);
        const pokemonDetailElement = document.getElementById('pokemonDetail');
        if (pokemonDetailElement) {
            pokemonDetailElement.innerHTML = '<p>Pokémon não encontrado :(</p>';
        }
    });
}

function navigatePokemon(direction) {
    const newId = currentPokemonId + direction;
    
    if (newId >= 1 && newId <= 151) {
        loadPokemonDetailPage(newId);
    }
}

// Carregar Pokémon quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    const pokemonId = getUrlParameter('id') || '1';
    loadPokemonDetailPage(pokemonId);
});

// Lidar com navegação do browser (botões voltar/avançar)
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.id) {
        loadPokemonDetailPage(event.state.id);
    }
});
