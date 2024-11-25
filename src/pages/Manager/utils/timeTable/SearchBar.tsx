import { useState } from 'react';
import axios from 'axios';
import { schoolOptions, schoolCodeMapping } from '@/utils/getCode';
import { SearchBarProps } from './adminTimeTableInter';

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
  onResultSelect,
}: SearchBarProps) {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearchClick = async () => {
    if (!schoolName || !grade) return;
    const schoolCode = schoolCodeMapping[schoolName];

    const accessToken = localStorage.getItem('accessToken');

    // JWT 토큰 없다면 로그인으로 이동
    if (!accessToken) {
      window.location.href = '/manager/auth/adminLogin';
      return Promise.reject(new Error('No access token found.'));
    }

    try {
      const response = await axios.post(
        '/systemMng/admin/classMng/selectMainClassSeq',
        {
          SCHL_CD: schoolCode,
          GRADE: grade,
        },
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        },
      );

      if (response.data.status === 'success') {
        // selectList 사용
        const results = response.data.selectList || [];
        setSearchResults(results); // 검색 결과를 상태에 저장
      } else {
        if (response.data.msg === '유효하지 않은 토큰입니다') {
          alert('다시 로그인을 해주세요.');
          window.location.href = '/manager/auth/adminLogin';
        }
        console.error('Failed to fetch search results:', response.data.msg);
      }
    } catch (error) {
      console.error('Error while fetching search results:', error);
    }
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
        검색
      </button>

      {/* Search Results Dropdown */}
      <select
        value={selectedResult}
        onChange={(e) => setSelectedResult(e.target.value)}
        className='border p-1 rounded w-1/8 min-w-60'
      >
        <option value=''>
          {searchResults.length === 0 ? '검색을 해주세요' : '검색 결과 선택'}
        </option>
        {searchResults.map((result, index) => (
          <option key={index} value={result.CLASS_MAIN_SEQ}>
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
    </div>
  );
}

export default SearchBar;
