import { UserSearchBarProps } from './UserProvInter';
import { handleInputChange } from './UserProvFunc';

function UserSearchBar({
  searchName,
  setSearchName,
  searchAge,
  setSearchAge,
  searchSchool,
  setSearchSchool,
  handleSearch,
}: UserSearchBarProps) {
  return (
    <div className='flex space-x-4'>
      <input
        type='text'
        placeholder='이름으로 검색'
        className='px-2 py-1 border border-gray-300 rounded'
        value={searchName}
        onChange={handleInputChange(setSearchName)}
      />
      <input
        type='text'
        placeholder='나이로 검색'
        className='px-2 py-1 border border-gray-300 rounded'
        value={searchAge}
        onChange={handleInputChange(setSearchAge)}
      />
      <input
        type='text'
        placeholder='학교로 검색'
        className='px-2 py-1 border border-gray-300 rounded'
        value={searchSchool}
        onChange={handleInputChange(setSearchSchool)}
      />
      <button
        onClick={handleSearch}
        className='px-4 py-1 text-white rounded bg-search hover:bg-search-hover btn-shadow'
      >
        검색
      </button>
    </div>
  );
}

export default UserSearchBar;
