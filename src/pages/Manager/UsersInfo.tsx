import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';
import SearchBar from '@/pages/Manager/utils/usersInfo/SearchBar';
import StudentDetailPopUp from '@/pages/Manager/utils/usersInfo/StudentDetailPopup';
import StudentTable from '@/pages/Manager/utils/usersInfo/StudentTable';
import { Student } from '@/pages/Manager/utils/usersInfo/StudentInter';

import { useState } from 'react';

import { useFetchStudents } from './utils/usersInfo/hooks/useFetchStudents';
import { useSearchStudents } from './utils/usersInfo/hooks/useSearchStudents';
import { useUnApproveUser } from './utils/usersInfo/hooks/useUnApproveUser';

function UsersInfoPage() {
  const {
    //students,
    filteredStudents,
    setFilteredStudents,
    isLoading,
    error,
  } = useFetchStudents();

  const {
    searchName,
    setSearchName,
    searchAge,
    setSearchAge,
    searchSchoolName,
    setSearchSchoolName,
    searchStudents,
    isSearching,
    searchError,
  } = useSearchStudents(); // 검색 기능
  const unApproveUser = useUnApproveUser(); // 권한 회수

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleSearch = () => {
    searchStudents(setFilteredStudents); // 검색 실행
  };

  const handleUnApprove = (studentId: string) => {
    unApproveUser(studentId, () => setSelectedStudent(null)); // 권한 회수 후 팝업 닫기
  };

  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <Lnb />
      <div className='p-6 flex-1 bg-gray-200 rounded-xl'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold'>학생 정보 관리</h1>
          <SearchBar
            searchName={searchName}
            setSearchName={setSearchName}
            searchAge={searchAge}
            setSearchAge={setSearchAge}
            searchSchoolName={searchSchoolName}
            setSearchSchoolName={setSearchSchoolName}
            handleSearch={handleSearch}
            isSearching={isSearching}
            searchError={searchError}
          />
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        <StudentTable
          students={filteredStudents}
          onStudentClick={(student) => setSelectedStudent(student)}
        />
      </div>
      {selectedStudent && (
        <StudentDetailPopUp
          studentId={selectedStudent.id}
          onUnApprove={handleUnApprove}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

export default UsersInfoPage;
