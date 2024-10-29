import React, { ChangeEvent } from 'react';

interface SearchBarProps {
  searchName: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
  searchAge: string;
  setSearchAge: React.Dispatch<React.SetStateAction<string>>;
  searchSchool: string;
  setSearchSchool: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

function SearchBar({
  searchName,
  setSearchName,
  searchAge,
  setSearchAge,
  searchSchool,
  setSearchSchool,
  handleSearch,
}: SearchBarProps) {
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchAge(e.target.value);
  };

  const handleSchoolChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchSchool(e.target.value);
  };

  return (
    <div className='flex space-x-4'>
      <input
        type='text'
        placeholder='이름으로 검색'
        className='px-2 py-1 border border-gray-300 rounded'
        value={searchName}
        onChange={handleNameChange}
      />
      <input
        type='text'
        placeholder='나이로 검색'
        className='px-2 py-1 border border-gray-300 rounded'
        value={searchAge}
        onChange={handleAgeChange}
      />
      <input
        type='text'
        placeholder='학교로 검색'
        className='px-2 py-1 border border-gray-300 rounded'
        value={searchSchool}
        onChange={handleSchoolChange}
      />
      <button
        onClick={handleSearch}
        className='px-4 py-1 text-white rounded transition-colors duration-200 bg-[#4a6fcc] hover:bg-[#3957af]'
      >
        검색
      </button>
    </div>
  );
}

export default SearchBar;
