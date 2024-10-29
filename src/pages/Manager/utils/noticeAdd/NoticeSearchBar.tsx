interface NoticeSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSearch: () => void;
}

function NoticeSearchBar({
  searchTerm,
  setSearchTerm,
  onSearch,
}: NoticeSearchBarProps) {
  return (
    <div className='flex gap-2 mb-6 justify-end'>
      <input
        type='text'
        placeholder='검색어를 입력하세요...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='border p-2 rounded w-1/3'
      />
      <button onClick={onSearch} className='bg-blue text-white p-2 rounded'>
        검색
      </button>
    </div>
  );
}

export default NoticeSearchBar;
