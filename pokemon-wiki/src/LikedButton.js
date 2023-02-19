import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import styled from 'styled-components';

const HeartButton = styled.button`
  position: absolute;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: right;
  padding-top: 12px;
  padding-left: 300px;
`;

const HeartIcon = styled.span`
  color: ${(props) => (props.isLiked ? 'red' : 'inherit')};
  font-size: 24px;
`;

export const LikeButton = ({ isLiked, onClick }) => {
  return (
    <HeartButton type="button" onClick={onClick}>
      <HeartIcon isLiked={isLiked}>
        {isLiked ? <FaHeart /> : <FiHeart />}
      </HeartIcon>
    </HeartButton>
  );
};

export default LikeButton;
