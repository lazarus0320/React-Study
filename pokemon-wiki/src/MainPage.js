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

const currentOffsetState = atom({
  key: 'currentOffsetState',
  default: 0,
});

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

// const pokemonListQuery = selector({
//   key: 'pokemonListQuery',
//   get: async ({ get }) => {
//     const response = await fetch(
//       `https://pokeapi.co/api/v2/pokemon?offset=${get(
//         currentOffsetState
//       )}&limit=20`
//     );
//     const data = await response.json();
//     console.log(data);
//     return data.results;
//   },
// });

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
  const [currentOffset, setCurrentOffset] = useRecoilState(currentOffsetState);
  const pokemonListLoadable = useRecoilValueLoadable(
    pokemonListQuery(searchText)
  );
  const [currentPokemonId, setCurrentPokemonId] = useRecoilState(
    currentPokemonIdState
  );

  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentOffset(currentOffset + 20);
  };

  const handlePrev = () => {
    setCurrentOffset(Math.max(0, currentOffset - 20));
  };

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
          pokemonListLoadable.contents.map((pokemon, index) => (
            <ListItem key={pokemon.name}>
              <PokemonContainer
                onClick={() => handlePokemonClick(currentOffset + index + 1)}
              >
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
      <ButtonContainer>
        <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={handleNext}>Next</Button>
      </ButtonContainer>
    </div>
  );
};

export default MainPage;
