import React from 'react';

interface SearchBarProps {
  searchName: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
  searchAge: string;
  setSearchAge: React.Dispatch<React.SetStateAction<string>>;
  searchSchool: string;
  setSearchSchool: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchName,
  setSearchName,
  searchAge,
  setSearchAge,
  searchSchool,
  setSearchSchool,
  handleSearch,
}) => {
  return (
    <div className='flex space-x-4'>
      <input
        type='text'
        placeholder='이름으로 검색'
        className='px-2 py-1 border border-gray-300 rounded'
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <input
        type='text'
        placeholder='나이로 검색'
        className='px-2 py-1 border border-gray-300 rounded'
        value={searchAge}
        onChange={(e) => setSearchAge(e.target.value)}
      />
      <input
        type='text'
        placeholder='학교로 검색'
        className='px-2 py-1 border border-gray-300 rounded'
        value={searchSchool}
        onChange={(e) => setSearchSchool(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className='px-4 py-1 text-white rounded transition-colors duration-200 bg-[#4a6fcc] hover:bg-[#3957af]'
      >
        검색
      </button>
    </div>
  );
};

export default SearchBar;
