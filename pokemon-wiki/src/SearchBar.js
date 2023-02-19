import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { searchTermState } from './MainPage';
import { debounce } from 'lodash';

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  margin-right: 220px;
  margin-top: 22px;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
    </SearchContainer>
  );
};

export default SearchBar;
