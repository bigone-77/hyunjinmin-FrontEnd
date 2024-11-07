import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';
import SearchBar from '@/pages/Manager/utils/usersInfo/SearchBar';
import StudentDetailPopUp from '@/pages/Manager/utils/usersInfo/StudentDetailPopup';
import StudentTable from '@/pages/Manager/utils/usersInfo/StudentTable';
import { Student } from '@/pages/Manager/utils/usersInfo/StudentInter';

import { useEffect, useState } from 'react';
import {
  fetchStudents,
  handleSearch,
  handleStudentClick,
  handleClosePopUp,
} from './utils/usersInfo/StudentFunc';

function UsersInfoPage() {
  const [, setStudents] = useState<Student[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchAge, setSearchAge] = useState('');
  const [searchSchool, setSearchSchool] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetchStudents(setStudents, setFilteredStudents);
  }, []);

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
            searchSchool={searchSchool}
            setSearchSchool={setSearchSchool}
            handleSearch={() => handleSearch(searchName, setFilteredStudents)}
          />
        </div>
        <StudentTable
          students={filteredStudents}
          onStudentClick={(student) =>
            handleStudentClick(student, setSelectedStudent)
          }
        />
      </div>
      {selectedStudent && (
        <StudentDetailPopUp
          student={selectedStudent}
          onClose={() => handleClosePopUp(setSelectedStudent)}
        />
      )}
    </div>
  );
}

export default UsersInfoPage;
