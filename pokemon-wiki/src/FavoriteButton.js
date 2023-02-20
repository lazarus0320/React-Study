import styled from 'styled-components';

const FavoriteButton = styled.button`
  margin-top: 10px;
  margin-left: 260px;
  background-color: #ffcc33;
  border-radius: 10%;
  width: 70px;
  height: 32px;
  display: flex;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  justify-content: center;
  align-items: center;
  float: left;

  &:hover {
    background-color: #f5b033;
  }
`;

export const Favorite = ({ onClick }) => {
  return <FavoriteButton onClick={onClick}>favorite</FavoriteButton>;
};

export default Favorite;
