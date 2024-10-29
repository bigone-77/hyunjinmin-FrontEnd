interface SearchBarProps {
  school: string;
  grade: string;
  setSchool: (value: string) => void;
  setGrade: (value: string) => void;
  onSearch: () => void;
  isSearchDisabled: boolean;
}

function SearchBar({
  school,
  grade,
  setSchool,
  setGrade,
  onSearch,
  isSearchDisabled,
}: SearchBarProps) {
  return (
    <div className='flex space-x-4 h-8'>
      <input
        type='text'
        placeholder='학교 입력'
        value={school}
        onChange={(e) => setSchool(e.target.value)}
        className='border p-2 rounded w-1/3'
      />
      <input
        type='text'
        placeholder='나이 입력'
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className='border p-2 rounded w-1/3'
      />
      <button
        onClick={onSearch}
        disabled={isSearchDisabled}
        className={`p-2 rounded ${isSearchDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue text-white'}`}
      >
        검색
      </button>
    </div>
  );
}

export default SearchBar;
