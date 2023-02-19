import styled from 'styled-components';

export const ImageContainer = styled.div`
  border: 1px solid black;
  width: 130px;
  height: 130px;
  margin-right: 10px;
  margin-left: 10px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  /* width: 200px; */
  flex: 1;
  margin-right: 10px;

  height: 130px;
`;

export const PokemonImage = styled.img`
  width: 130px;
  height: 130px;
  object-fit: contain;
  border: 1px solid black;
`;

export const PokemonName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0 0 20px;
`;

export const Id = styled.p`
  font-size: 15px;
  margin: 10px 0 0 20px;
`;

export const Information = styled.p`
  font-size: 15px;
  margin: 10px 0 0 10px;
`;

export const ListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #fff;
  border: 1px solid black;
  cursor: pointer;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 70px;
  font-weight: bold;
  color: #ffcb05;
  text-shadow: 2px 2px #c10707;
  margin-top: 50px;
  margin-bottom: 50px;
  cursor: pointer;
`;

export const PokemonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid black;
  width: 500px;
  height: 150px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;
