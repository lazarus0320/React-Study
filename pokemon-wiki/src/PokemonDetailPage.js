import React from 'react';
import { useRecoilValueLoadable, useRecoilState } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { pokemonInfoQuery } from './MainPage';
import { ImageContainer, PokemonImage } from './styles';
import { Type } from './Type';

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

export const TypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const BackButton = styled.button`
  background-color: #f0f0f0;
  padding: 10px 20px;
  margin-top: 50px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  cursor: pointer;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const PokemonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pokemonId = parseInt(id);

  const pokemonInfoLoadable = useRecoilValueLoadable(
    pokemonInfoQuery(pokemonId)
  );

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
        <ImageContainer>
          <PokemonImage
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
            alt={pokemonInfoLoadable.contents.name}
          />
        </ImageContainer>
        {console.log(pokemonInfoLoadable.state)}
        {pokemonInfoLoadable.state === 'loading' && <p>Loading...</p>}
        {pokemonInfoLoadable.state === 'hasValue' && (
          <>
            <PokemonName>{pokemonInfoLoadable.contents.name}</PokemonName>
            <PokemonId>ID: {pokemonInfoLoadable.contents.id}</PokemonId>
            {types.length > 0 && (
              <TypeContainer>
                {types.map((type) => (
                  <Type key={type.slot} name={type.type.name}>
                    {type.type.name}
                  </Type>
                ))}
              </TypeContainer>
            )}
          </>
        )}
        {pokemonInfoLoadable.state === 'hasError' && (
          <p>Error: {pokemonInfoLoadable.contents.message}</p>
        )}
        <BackButton onClick={handleBack}>Back</BackButton>
      </Container>
    </div>
  );
};

export default PokemonDetailPage;
