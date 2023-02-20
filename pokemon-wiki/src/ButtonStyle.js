import React, { useCallback, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) => (props.active ? props.color : 'white')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  border: 1px solid ${(props) => props.color};
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  width: 60px;
  cursor: pointer;
`;

export const showLikedButton = styled.button`
  margin: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const selectedTypeState = atom({
  key: 'selectedTypeState',
  default: [],
});

const ColorButton = React.memo(({ color, name }) => {
  const [active, setActive] = useState(false);
  const [selectedTypes, setSelectedTypes] = useRecoilState(selectedTypeState);

  const handleClick = useCallback(() => {
    setActive(!active);
    setSelectedTypes((selectedTypes) =>
      selectedTypes.includes(name)
        ? selectedTypes.filter((type) => type !== name)
        : [...selectedTypes, name]
    );
  }, [active, name, setSelectedTypes]);

  return (
    <StyledButton color={color} active={active} onClick={handleClick}>
      {name}
    </StyledButton>
  );
});

const TypeButtons = () => {
  const buttonData = [
    { name: 'bug', color: '#A8B820' },
    { name: 'dark', color: '#705848' },
    { name: 'dragon', color: '#7038F8' },
    { name: 'electric', color: '#F8D030' },
    { name: 'fairy', color: '#EE99AC' },
    { name: 'fighting', color: '#C03028' },
    { name: 'fire', color: '#F08030' },
    { name: 'flying', color: '#A890F0' },
    { name: 'ghost', color: '#705898' },
    { name: 'grass', color: '#78C850' },
    { name: 'ground', color: '#E0C068' },
    { name: 'ice', color: '#98D8D8' },
    { name: 'normal', color: '#A8A878' },
    { name: 'poison', color: '#A040A0' },
    { name: 'psychic', color: '#F85888' },
    { name: 'rock', color: '#B8A038' },
    { name: 'shadow', color: '#4A4A4A' },
    { name: 'steel', color: '#B8B8D0' },
    { name: 'water', color: '#6890F0' },
  ];

  return (
    <ButtonGroup>
      {buttonData.map((button) => (
        <ColorButton
          key={button.name}
          name={button.name}
          color={button.color}
        />
      ))}
    </ButtonGroup>
  );
};

export default TypeButtons;
