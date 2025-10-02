const assert = require('assert');
const Pokemon = require('../src/pokemon-model');

describe('Pokemon Model', () => {
    it('should create a Pokemon object with correct properties', () => {
        const pokemonData = {
            name: 'bulbasaur',
            id: 1,
            types: ['grass', 'poison'],
            photo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'
        };

        const pokemon = new Pokemon();
        pokemon.name = pokemonData.name;
        pokemon.id = pokemonData.id;
        pokemon.types = pokemonData.types;
        pokemon.photo = pokemonData.photo;

        assert.strictEqual(pokemon.name, 'bulbasaur');
        assert.strictEqual(pokemon.id, 1);
        assert.deepStrictEqual(pokemon.types, ['grass', 'poison']);
        assert.strictEqual(pokemon.photo, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg');
        assert.strictEqual(pokemon.mainType, 'grass');
    });

    it('should correctly set mainType based on the first type', () => {
        const pokemon = new Pokemon();
        pokemon.types = ['fire', 'flying'];
        assert.strictEqual(pokemon.mainType, 'fire');

        pokemon.types = ['water'];
        assert.strictEqual(pokemon.mainType, 'water');
    });

    it('should handle empty types array gracefully', () => {
        const pokemon = new Pokemon();
        pokemon.types = [];
        assert.strictEqual(pokemon.mainType, undefined);
    });
});

