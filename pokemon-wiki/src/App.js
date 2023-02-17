import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import MainPage from './MainPage';
import PokemonDetailPage from './PokemonDetailPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
