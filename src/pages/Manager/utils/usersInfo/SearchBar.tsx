import { SearchBarProps } from './StudentInter';

function SearchBar({
  searchName,
  setSearchName,
  searchAge,
  setSearchAge,
  searchSchoolName,
  setSearchSchoolName,
  handleSearch,
  isSearching,
  searchError,
}: SearchBarProps) {
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
        value={searchSchoolName}
        onChange={(e) => setSearchSchoolName(e.target.value)}
      />
      <button
        onClick={handleSearch}
        disabled={isSearching}
        className='px-4 py-1 text-white rounded bg-search hover:bg-search-hover btn-shadow disabled:opacity-50'
      >
        {isSearching ? '검색 중...' : '검색'}
      </button>
      {searchError && <p className='text-red-500 mt-2'>{searchError}</p>}
    </div>
  );
}

export default SearchBar;
