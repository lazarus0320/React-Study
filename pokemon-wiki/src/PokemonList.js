import { useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import {
  renderedPokemonListQuery,
  currentOffsetState,
  currentPokemonIdState,
} from './MainPage';
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
import { useNavigate } from 'react-router-dom';

function PokemonList() {
  const [currentOffset, setCurrentOffset] = useRecoilState(currentOffsetState);
  const renderedPokemonListLoadable = useRecoilValueLoadable(
    renderedPokemonListQuery
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setCurrentOffset((offset) => offset + 40);
      }
    });

    observer.observe(document.querySelector('#end-of-list'));

    return () => {
      observer.disconnect();
    };
  }, [setCurrentOffset]);

  const navigate = useNavigate();

  const [currentPokemonId, setCurrentPokemonId] = useRecoilState(
    currentPokemonIdState
  );

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
    <>
      <ListContainer>
        {renderedPokemonListLoadable.state === 'loading' && (
          <div>Loading...</div>
        )}
        {renderedPokemonListLoadable.state === 'hasValue' &&
          renderedPokemonListLoadable.contents.map((pokemon) => (
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
        {renderedPokemonListLoadable.state === 'hasError' && (
          <li>Error: {renderedPokemonListLoadable.contents.message}</li>
        )}
      </ListContainer>
      <ButtonContainer>
        <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={handleNext}>Next</Button>
      </ButtonContainer>
      <div id="end-of-list"></div>
    </>
  );
}

export default PokemonList;
