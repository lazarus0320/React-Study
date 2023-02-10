import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Movie from './pages/Movie';
import Menubar from './pages/Menubar';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Menubar />}>
        <Route index element={<Home />} />
        <Route path="/movies" element={<Movies />}>
          <Route path=":movieId" element={<Movie />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
