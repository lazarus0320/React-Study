import styled from 'styled-components';
import { useRecoilValueLoadable } from 'recoil';
import { pokemonInfoQuery } from './MainPage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 200px;
`;

const Name = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 10px;
`;

const Info = styled.p`
  margin: 10px;
`;

const InfoContainer = ({ id }) => {
  const pokemonInfoLoadable = useRecoilValueLoadable(pokemonInfoQuery(id)); // add 1 to the id prop

  return (
    <Container>
      {pokemonInfoLoadable.state === 'loading' && <p>Loading...</p>}
      {pokemonInfoLoadable.state === 'hasValue' && (
        <>
          <Name>{pokemonInfoLoadable.contents.name}</Name>
          <Info>ID: {pokemonInfoLoadable.contents.id}</Info>
          <Info>Height: {pokemonInfoLoadable.contents.height}</Info>
          <Info>Weight: {pokemonInfoLoadable.contents.weight}</Info>
        </>
      )}
      {pokemonInfoLoadable.state === 'hasError' && (
        <p>Error: {pokemonInfoLoadable.contents.message}</p>
      )}
    </Container>
  );
};
export default InfoContainer;
