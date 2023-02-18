import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValueLoadable,
  selectorFamily,
} from 'recoil';
import {
  ImageContainer,
  PokemonImage,
  PokemonName,
  Information,
  ListContainer,
  ListItem,
  ButtonContainer,
  Button,
  Title,
  InfoContainer,
  Id,
  PokemonContainer,
} from './styles';
import SearchBar from './SearchBar';

const currentPokemonIdState = atom({
  key: 'currentPokemonIdState',
  default: 1,
});

const pokemonListQuery = selectorFamily({
  key: 'pokemonList',
  get:
    (searchTerm = '') =>
    async ({ get }) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=10000`
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

export const pokemonInfoQuery = (id) =>
  selector({
    key: `pokemonInfoQuery-${id}`,
    get: async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      console.log(data);
      return data;
    },
  });

const MainPage = () => {
  const [searchText, setSearchText] = useState('');
  const pokemonListLoadable = useRecoilValueLoadable(
    pokemonListQuery(searchText)
  );
  const [currentPokemonId, setCurrentPokemonId] = useRecoilState(
    currentPokemonIdState
  );

  const navigate = useNavigate();

  const handlePokemonClick = (id) => {
    setCurrentPokemonId(id);
    navigate(`/pokemon/${id}`);
  };

  return (
    <div>
      <Title>Pokémon Wiki</Title>
      <SearchBar setSearchText={setSearchText} />
      <ListContainer>
        {pokemonListLoadable.state === 'loading' && <li>Loading...</li>}
        {pokemonListLoadable.state === 'hasValue' &&
          pokemonListLoadable.contents.map((pokemon) => (
            <ListItem key={pokemon.name}>
              <PokemonContainer onClick={() => handlePokemonClick(pokemon.id)}>
                <ImageContainer>
                  <PokemonImage
                    src={pokemon.imageUrl}
                    alt={`${pokemon.name} sprite`}
                  />
                </ImageContainer>
                <InfoContainer>
                  <Id>id. {pokemon.id}</Id>
                  <PokemonName>{pokemon.name}</PokemonName>
                </InfoContainer>
              </PokemonContainer>
            </ListItem>
          ))}
        {pokemonListLoadable.state === 'hasError' && (
          <li>Error: {pokemonListLoadable.contents.message}</li>
        )}
      </ListContainer>
    </div>
  );
};

export default MainPage;
