import { atom, selector } from 'recoil';

export const pokemonListState = atom({
  key: 'pokemonListState',
  default: [],
});

export const pokemonListSelector = selector({
  key: 'pokemonListSelector',
  get: async ({ get }) => {
    const offset = get(offsetState);
    const limit = 20;
    const response = fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();
    const pokemonList = data.results;

    const imageUrls = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await response.json();
        return data.sprites.front_default;
      })
    );

    const pokemonListWithImages = pokemonList.map((pokemon, index) => {
      return {
        id: index + 1 + offset,
        name: pokemon.name,
        imageUrl: imageUrls[index],
      };
    });

    return pokemonListWithImages;
  },
});

export const offsetState = atom({
  key: 'offsetState',
  default: 0,
});
