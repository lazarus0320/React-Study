import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { getStars } from './store';

const Stars = ({ className }) => {
  const userRepoStars = useRecoilValue(getStars);

  const stars = userRepoStars ? `${userRepoStars} 개` : '';
  return <StyledStars className={className}>{stars}</StyledStars>;
};

const StyledStars = styled.div``;

export default Stars;
