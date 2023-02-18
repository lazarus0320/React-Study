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
  const { state, contents } = useRecoilValueLoadable(pokemonInfoQuery(id + 1));

  return (
    <Container>
      {state === 'loading' && <p>Loading...</p>}
      {state === 'hasValue' && (
        <>
          <Name>{contents.name}</Name>
          <Info>ID: {contents.id}</Info>
          <Info>Height: {contents.height}</Info>
          <Info>Weight: {contents.weight}</Info>
        </>
      )}
      {state === 'hasError' && <p>Error: {contents.message}</p>}
    </Container>
  );
};
export default InfoContainer;
