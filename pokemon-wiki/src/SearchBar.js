import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-right: 220px;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SearchBar = ({ setSearchText }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setSearchText(inputValue);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search Pokémon..."
        value={value}
        onChange={handleChange}
      />
    </SearchContainer>
  );
};

export default SearchBar;
