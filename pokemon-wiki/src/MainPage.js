import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValueLoadable,
  selectorFamily,
  useSetRecoilState,
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
  RowRendering,
} from './styles';
import SearchBar from './SearchBar';
import TypeButtons from './ButtonStyle';
import { selectedTypeState, showLikedButton } from './ButtonStyle';
import { Type } from './Type';
import { LikeButton } from './LikedButton';

const TypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  padding-left: 10px;
`;

const currentPokemonIdState = atom({
  key: 'currentPokemonIdState',
  default: 1,
});

export const searchTermState = atom({
  key: 'searchTermState',
  default: '',
});

export const likedPokemonsState = atom({
  key: 'likedPokemonState',
  default: [],
});

const showLikedOnlyState = atom({
  key: 'showLikedOnlyState',
  default: false,
});

const pokemonListQuery = selector({
  key: 'pokemonList',
  get: async ({ get }) => {
    const selectedTypes = get(selectedTypeState);
    const searchTerm = get(searchTermState);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10000`
    );
    const data = await response.json();
    const pokemonList = data.results.map((result) => {
      const id = result.url.split('/')[6];
      return {
        id,
        name: result.name,
        types: [],
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
    });

    const pokemonDetailsRequests = pokemonList.map((pokemon) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
    );
    const pokemonDetailsResponses = await Promise.all(pokemonDetailsRequests);
    const pokemonDetailsJson = await Promise.all(
      pokemonDetailsResponses.map((response) => response.json())
    );

    pokemonDetailsJson.forEach((pokemonDetails, index) => {
      const types = pokemonDetails.types.map((type) => type.type.name);
      pokemonList[index].types = types;
    });

    let filteredList = pokemonList;
    if (searchTerm) {
      filteredList = filteredList.filter((pokemon) =>
        pokemon.name.includes(searchTerm.toLowerCase())
      );
    }
    if (selectedTypes.length > 0) {
      filteredList = filteredList.filter((pokemon) =>
        selectedTypes.every((type) => pokemon.types.includes(type))
      );
    }
    return filteredList;
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
  const [searchText, setSearchText] = useState(searchTermState);
  const pokemonListLoadable = useRecoilValueLoadable(pokemonListQuery);
  const [currentPokemonId, setCurrentPokemonId] = useRecoilState(
    currentPokemonIdState
  );
  const [likedPokemons, setLikedPokemons] = useRecoilState(likedPokemonsState);
  const [showLikedOnly, setShowLikedOnly] = useRecoilState(showLikedOnlyState);
  const [selectedTypes, setSelectedTypes] = useRecoilState(selectedTypeState);

  const handleLikedOnlyButtonClick = () => {
    setShowLikedOnly(!showLikedOnly);
    setSearchText('');
    setSelectedTypes([]);
  };

  const handleLikeClick = (event, id) => {
    event.stopPropagation();
    setLikedPokemons((prevLikedPokemons) => {
      if (prevLikedPokemons.includes(id)) {
        return prevLikedPokemons.filter((prevId) => prevId !== id); // 하트 눌렀는데 이미 리스트에 있으면 제외
      }
      return [...prevLikedPokemons, id]; //
    });
  };

  const navigate = useNavigate();

  const handlePokemonClick = (id) => {
    setCurrentPokemonId(id);
    navigate(`/pokemon/${id}`);
  };

  const handleTitleClick = () => {
    navigate(0);
  };

  return (
    <div>
      <Title onClick={handleTitleClick}>Pokémon Wiki</Title>
      <TypeButtons />
      <button onClick={handleLikedOnlyButtonClick}>favorite</button>
      <SearchBar />
      <ListContainer>
        {pokemonListLoadable.state === 'loading' && <li>Loading...</li>}
        {pokemonListLoadable.state === 'hasValue' &&
          pokemonListLoadable.contents
            .filter(
              (pokemon) => !showLikedOnly || likedPokemons.includes(pokemon.id)
            )
            .map((pokemon) => (
              <ListItem key={pokemon.name}>
                <PokemonContainer
                  onClick={() => handlePokemonClick(pokemon.id)}
                >
                  <ImageContainer>
                    <PokemonImage
                      src={pokemon.imageUrl}
                      alt={`${pokemon.name} sprite`}
                    />
                  </ImageContainer>
                  <InfoContainer>
                    <RowRendering>
                      <Id>id. {pokemon.id}</Id>
                      <LikeButton
                        isLiked={likedPokemons.includes(pokemon.id)}
                        onClick={(event) => handleLikeClick(event, pokemon.id)}
                      />
                    </RowRendering>
                    <PokemonName>{pokemon.name}</PokemonName>
                    <TypeContainer>
                      {pokemon.types.map((type) => (
                        <Type key={type} name={type} />
                      ))}
                    </TypeContainer>
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
