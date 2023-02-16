import styled from 'styled-components';
import React from 'react';
import { atom, selector, useRecoilValueLoadable, useRecoilState } from 'recoil';

function InfoContainer({ id }) {
  // styled.div`
  //   display: flex;
  //   flex-direction: column;
  //   border: 1px solid black;
  //   width: 200px;
  // `;

  const pokemonInfoQuery = selector({
    key: 'pokemonQuery',
    get: async ({ get }) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      return data;
    },
  });

  const { state, contents, error } = useRecoilValueLoadable(pokemonInfoQuery);

  return (
    <div>
      {state === 'loading' && <li>Loading...</li>}
      {state === 'hasValue' && (
        <>
          <span>ID: {contents.id}</span>
          <br />
          <span>Height: {contents.height}</span>
        </>
      )}
      {state === 'hasError' && <li>Error: {error.message}</li>}
    </div>
  );
}

export default InfoContainer;
