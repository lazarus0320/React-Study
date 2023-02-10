import React from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../movie_data';

const Movie = () => {
  const params = useParams();
  console.log(params);
  const movie = getMovie(parseInt(params.movieId));
  console.log(movie);
  return <div>상세페이지입니다.</div>;
};

export default Movie;
