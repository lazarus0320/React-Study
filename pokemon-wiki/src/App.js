import React from 'react';
import styled from 'styled-components';
import { atom, selector, useRecoilValueLoadable, useRecoilState } from 'recoil';

const currentOffsetState = atom({
  key: 'currentOffsetState',
  default: 0,
});

const currentPokemonIdState = atom({
  key: 'currentPokemonIdState',
  default: 1,
});

// function InfoContainer({ id }) {
//   // styled.div`
//   //   display: flex;
//   //   flex-direction: column;
//   //   border: 1px solid black;
//   //   width: 200px;
//   // `;

//   const pokemonInfoQuery = selector({
//     key: 'pokemonQuery',
//     get: async ({ get }) => {
//       const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
//       const data = await response.json();
//       return data;
//     },
//   });

//   const { state, contents, error } = useRecoilValueLoadable(pokemonInfoQuery);

//   return (
//     <div>
//       {state === 'loading' && <li>Loading...</li>}
//       {state === 'hasValue' && (
//         <>
//           <span>ID: {contents.id}</span>
//           <br />
//           <span>Height: {contents.height}</span>
//         </>
//       )}
//       {state === 'hasError' && <li>Error: {error.message}</li>}
//     </div>
//   );
// }

const pokemonListQuery = selector({
  key: 'pokemonListQuery',
  get: async ({ get }) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${get(
        currentOffsetState
      )}&limit=20`
    );
    const data = await response.json();
    return data.results;
  },
});

// const pokemonInfoQuery = selector({
//   key: 'pokemonQuery',
//   get: async ({ get }) => {
//     const response = await fetch(
//       `https://pokeapi.co/api/v2/pokemon/${get(currentPokemonIdState)}`
//     );
//     const data = await response.json();
//     return data;
//   },
// });

const ImageContainer = styled.div`
  border: 1px solid black;
  width: 96px;
  height: 96px;
  margin-right: 10px;
`;

const PokemonImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border: 1px solid black;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 200px;
`;

const PokemonName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0 0 10px;
`;

const Information = styled.p`
  font-size: 15px;
  margin: 10px 0 0 10px;
`;

const ListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  margin: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #fff;
  border: 1px solid black;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 70px;
  font-weight: bold;
  color: #ffcb05;
  text-shadow: 2px 2px #c10707;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const App = () => {
  const [currentOffset, setCurrentOffset] = useRecoilState(currentOffsetState);
  const { state, contents, error } = useRecoilValueLoadable(pokemonListQuery);
  // const pokemonInfoLoadable = useRecoilValueLoadable(pokemonInfoQuery);

  const handleNext = () => {
    setCurrentOffset(currentOffset + 10);
  };

  const handlePrev = () => {
    setCurrentOffset(Math.max(0, currentOffset - 10));
  };
  return (
    <div>
      <Title>Pokémon Wiki</Title>
      <ListContainer>
        {state === 'loading' && <li>Loading...</li>}
        {state === 'hasValue' &&
          contents.map((pokemon, index) => (
            <ListItem key={pokemon.name}>
              <ImageContainer>
                <PokemonImage
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    pokemon.url.split('/')[6]
                  }.png`}
                  alt={`${pokemon.name} sprite`}
                />
              </ImageContainer>
              <InfoContainer>
                <PokemonName>{pokemon.name}</PokemonName>
              </InfoContainer>
            </ListItem>
          ))}
        {state === 'hasError' && <li>Error: {error.message}</li>}
      </ListContainer>
      <ButtonContainer>
        <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={handleNext}>Next</Button>
      </ButtonContainer>
    </div>
  );
};

export default App;
