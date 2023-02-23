import React from 'react';
import { PokemonContainer } from './styles';
import { currentPokemonIdState } from './MainPage';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const PokemonContainerMaker = (id) => {
  const [currentPokemonId, setCurrentPokemonId] = useRecoilState(
    currentPokemonIdState
  );

  const navigate = useNavigate();

  const handlePokemonClick = (id) => {
    setCurrentPokemonId(id);
    navigate(`/pokemon/${id}`);
  };
  return <PokemonContainer onClick={handlePokemonClick(id)} />;
};

export default PokemonContainerMaker;
