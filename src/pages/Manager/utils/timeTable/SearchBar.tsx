import { schoolOptions, schoolCodeMapping } from '@/utils/getCode';
import { SearchBarProps } from './adminTimeTableInter';
import { useSearchTimeTalbe } from '@/pages/Manager/utils/timeTable/hooks/useSearchTimeTable';

function SearchBar({
  schoolLevel,
  schoolName,
  grade,
  setSchoolLevel,
  setSchoolName,
  setGrade,
  isSearchDisabled,
  selectedResult,
  setSelectedResult,
  setTimeTableYN,
  onResultSelect,
}: SearchBarProps) {
  const { searchResults, searchTimeTable, isLoading, error } =
    useSearchTimeTalbe();

  const handleSearchClick = async () => {
    if (!schoolName || !grade) return;

    const schoolCode = schoolCodeMapping[schoolName];
    await searchTimeTable(schoolCode, grade);
  };

  const gradeOptions = schoolLevel === '초' ? [1, 2, 3, 4, 5, 6] : [1, 2, 3];

  return (
    <div className='flex space-x-4 h-8 justify-end'>
      {/* School Level Select Box */}
      <select
        value={schoolLevel}
        onChange={(e) => setSchoolLevel(e.target.value)}
        className='border p-1 rounded w-1/8 min-w-32'
      >
        <option value=''>학교 레벨 선택</option>
        <option value='초'>초등학교</option>
        <option value='중'>중학교</option>
        <option value='고'>고등학교</option>
      </select>

      {/* School Name Select Box */}
      <select
        value={schoolName}
        onChange={(e) => setSchoolName(e.target.value)}
        className='border p-1 rounded w-1/8 min-w-44'
        disabled={!schoolLevel}
      >
        <option value=''>학교 선택</option>
        {schoolLevel &&
          schoolOptions[schoolLevel as '초' | '중' | '고'].map((school) => (
            <option key={school} value={school}>
              {school}
            </option>
          ))}
      </select>

      {/* Grade Select Box */}
      <select
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className='border p-1 rounded w-1/8 min-w-8'
        disabled={!schoolName}
      >
        <option value=''>학년 선택</option>
        {gradeOptions.map((g) => (
          <option key={g} value={g}>
            {g}학년
          </option>
        ))}
      </select>

      {/* Search Button */}
      <button
        onClick={handleSearchClick}
        disabled={isSearchDisabled}
        className={`p-1 rounded w-1/8 min-w-24 ${
          isSearchDisabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-search text-white btn-shadow'
        }`}
      >
        {isLoading ? '검색 중...' : '검색'}
      </button>

      {/* Search Results Dropdown */}
      <select
        value={selectedResult}
        onChange={(e) => {
          const selectedValue = e.target.value;
          setSelectedResult(selectedValue);

          const selectedItem = searchResults.find(
            (result) => String(result.CLASS_MAIN_SEQ) === selectedValue,
          );

          if (selectedItem) {
            setTimeTableYN(selectedItem.USE_YN); // USE_YN 값을 설정
          } else {
            setTimeTableYN(''); // 찾지 못한 경우 초기화
          }
        }}
        className='border p-1 rounded w-1/8 min-w-60'
      >
        <option value=''>
          {searchResults.length === 0 ? '검색을 해주세요' : '검색 결과 선택'}
        </option>
        {searchResults.map((result) => (
          <option
            key={result.CLASS_MAIN_SEQ}
            value={String(result.CLASS_MAIN_SEQ)}
          >
            {result.CLASS_TYPE_NAME}
          </option>
        ))}
      </select>

      {/* View Button */}
      <button
        onClick={onResultSelect}
        disabled={!selectedResult}
        className={`p-1 rounded w-1/8 min-w-24 ${
          !selectedResult
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-search text-white btn-shadow'
        }`}
      >
        조회
      </button>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
}

export default SearchBar;
