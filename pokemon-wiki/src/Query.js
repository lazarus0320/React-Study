import { selectorFamily } from 'recoil';
import { currentOffsetState } from './MainPage';

export const pokemonListQuery = selectorFamily({
  key: 'pokemonList',
  get:
    (searchTerm = '') =>
    async ({ get }) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${get(
          currentOffsetState
        )}&limit=20`
      );
      const data = await response.json();
      const pokemonList = data.results.map((result) => {
        const id = result.url.split('/')[6];
        return {
          id,
          name: result.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      });

      if (searchTerm) {
        const filteredList = pokemonList.filter((pokemon) =>
          pokemon.name.includes(searchTerm.toLowerCase())
        );
        return filteredList;
      }

      return pokemonList;
    },
});
export default pokemonListQuery;
