import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { pokemonInfoQuery } from './MainPage';
import { ImageContainer, PokemonImage } from './styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: #ffcb05;
  text-shadow: 2px 2px #c10707;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const PokemonName = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const PokemonId = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const TypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const Type = styled.div`
  background-color: #f0f0f0;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 10px;
`;

const PokemonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const pokemonInfoLoadable = useRecoilValueLoadable(pokemonInfoQuery(id));

  const handleBack = () => {
    navigate(-1);
  };

  const types =
    pokemonInfoLoadable.state === 'hasValue'
      ? pokemonInfoLoadable.contents.types
      : [];

  return (
    <div>
      <Title>Pokémon Wiki</Title>
      <Container>
        {pokemonInfoLoadable.state === 'loading' && <p>Loading...</p>}
        {pokemonInfoLoadable.state === 'hasValue' && (
          <>
            <ImageContainer>
              <PokemonImage
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={pokemonInfoLoadable.contents.name}
              />
            </ImageContainer>
            <PokemonName>{pokemonInfoLoadable.contents.name}</PokemonName>
            <PokemonId>ID: {pokemonInfoLoadable.contents.id}</PokemonId>
            <TypeContainer>
              {types.map((type) => (
                <Type key={type.slot}>{type.type.name}</Type>
              ))}
            </TypeContainer>
            <button onClick={handleBack}>Back</button>
          </>
        )}
        {pokemonInfoLoadable.state === 'hasError' && (
          <p>Error: {pokemonInfoLoadable.contents.message}</p>
        )}
      </Container>
    </div>
  );
};

export default PokemonDetailPage;
