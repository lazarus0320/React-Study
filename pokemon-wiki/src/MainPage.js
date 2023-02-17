import React from 'react';
import { useNavigate } from 'react-router-dom';
import { atom, selector, useRecoilState, useRecoilValueLoadable } from 'recoil';
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

const currentOffsetState = atom({
  key: 'currentOffsetState',
  default: 0,
});

const currentPokemonIdState = atom({
  key: 'currentPokemonIdState',
  default: 1,
});

const pokemonListQuery = selector({
  key: 'pokemonListQuery',
  get: async ({ get }) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${get(
        currentOffsetState
      )}&limit=20`
    );
    const data = await response.json();
    console.log(data);
    return data.results;
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
  const [currentOffset, setCurrentOffset] = useRecoilState(currentOffsetState);
  const pokemonListLoadable = useRecoilValueLoadable(pokemonListQuery);
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
      <ListContainer>
        {pokemonListLoadable.state === 'loading' && <li>Loading...</li>}
        {pokemonListLoadable.state === 'hasValue' &&
          pokemonListLoadable.contents.map((pokemon, index) => (
            <ListItem key={pokemon.name}>
              <PokemonContainer onClick={() => handlePokemonClick(index + 1)}>
                <ImageContainer>
                  <PokemonImage
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      pokemon.url.split('/')[6]
                    }.png`}
                    alt={`${pokemon.name} sprite`}
                  />
                </ImageContainer>
                <InfoContainer>
                  <Id>id. {currentOffset + index + 1}</Id>
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
