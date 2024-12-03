import { useState } from 'react';
import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';
import SearchBar from '@/pages/Manager/utils/usersInfo/SearchBar';
import { useStudentPoints } from '@/pages/Manager/utils/points/hooks/useStudentPoints';
import PointsTable from '@/pages/Manager/utils/points/PointsTable';

function PointsPage() {
  const { students, filteredStudents, setFilteredStudents, isLoading, error } =
    useStudentPoints();
  const [searchName, setSearchName] = useState<string>('');
  const [searchAge, setSearchAge] = useState<string>('');
  const [searchSchool, setSearchSchool] = useState<string>('');

  const handleSearch = () => {
    const filtered = students.filter((student) => {
      const matchesName =
        searchName === '' || student.name.includes(searchName);
      const matchesAge =
        searchAge === '' || student.age.toString() === searchAge;
      const matchesSchool =
        searchSchool === '' || student.school.includes(searchSchool);

      return matchesName && matchesAge && matchesSchool;
    });
    setFilteredStudents(filtered);
  };

  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <Lnb />
      <div className='p-6 flex-1 bg-gray-200 rounded-xl'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold'>학생 상/벌점 관리</h1>
          <SearchBar
            searchName={searchName}
            setSearchName={setSearchName}
            searchAge={searchAge}
            setSearchAge={setSearchAge}
            searchSchoolName={searchSchool}
            setSearchSchoolName={setSearchSchool}
            handleSearch={handleSearch}
            isSearching={isLoading}
            searchError={error}
          />
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {/* 학생 정보 테이블 */}
        <PointsTable students={filteredStudents} />
      </div>
    </div>
  );
}

export default PointsPage;
