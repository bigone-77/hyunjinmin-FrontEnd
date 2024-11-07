import { useState, useEffect } from 'react';
import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';
import SearchBar from '@/pages/Manager/utils/usersInfo/SearchBar';
import { StudentPoints } from '@/pages/Manager/utils/points/PointsInter';
import PointsTable from '@/pages/Manager/utils/points/PointsTable';
import { fetchStudentPoints, handleSearch } from './utils/points/PointsFunc';

function PointsPage() {
  const [students, setStudents] = useState<StudentPoints[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentPoints[]>([]);
  const [searchName, setSearchName] = useState<string>('');
  const [searchAge, setSearchAge] = useState<string>('');
  const [searchSchool, setSearchSchool] = useState<string>('');

  useEffect(() => {
    fetchStudentPoints(setStudents, setFilteredStudents);
  }, []);

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
            searchSchool={searchSchool}
            setSearchSchool={setSearchSchool}
            handleSearch={() =>
              handleSearch(
                students,
                searchName,
                searchAge,
                searchSchool,
                setFilteredStudents,
              )
            }
          />
        </div>
        {/* 학생 정보 테이블 */}
        <PointsTable students={filteredStudents} />
      </div>
    </div>
  );
}

export default PointsPage;
