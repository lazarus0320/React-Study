import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { getMovies } from '../movie_data';

const Movies = () => {
  const movies = getMovies();
  return (
    <div>
      <h1>넷플릭스 영화 추천 목록</h1>
      <div>
        {movies.map((movie) => (
          <NavLink
            to={`/movies/${movie.id}`}
            key={movie.id}
            style={({ isActive }) => {
              return {
                TextDecoration: isActive ? 'underline' : '',
                color: isActive ? '#FF9E1B' : '',
              };
            }}
          >
            <p>{movie.title}</p>
          </NavLink>
        ))}
      </div>
      <hr />
      <Outlet />
    </div>
  );
};

export default Movies;
