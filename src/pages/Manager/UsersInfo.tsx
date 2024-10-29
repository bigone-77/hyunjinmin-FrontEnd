import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';
import SearchBar from '@/pages/Manager/utils/usersInfo/SearchBar';
import StudentDetailPopUp from '@/pages/Manager/utils/usersInfo/StudentDetailPopup';
import StudentTable from '@/pages/Manager/utils/usersInfo/StudentTable';
import { Student } from '@/pages/Manager/utils/types/Student';

import { useState } from 'react';

const initialStudents: Student[] = [
  {
    id: 1,
    name: '김현진',
    age: 17,
    school: '서울고등학교',
    email: 'hjkim@example.com',
    phone: '010-1234-5678',
    postalCode: '12345',
    address: '서울특별시 강남구 테헤란로 123',
    rewardPoints: 5,
    penaltyPoints: 2,
    classes: ['국어', '수학'],
    tuitionFees: 200000,
    feesDay: 1,
    feesStatus: true,
  },
  {
    id: 2,
    name: '박지민',
    age: 18,
    school: '부산고등학교',
    email: 'jmpark@example.com',
    phone: '010-9876-5432',
    postalCode: '67890',
    address: '부산광역시 해운대구 센텀로 456',
    rewardPoints: 3,
    penaltyPoints: 0,
    classes: ['국어', '수학'],
    tuitionFees: 200000,
    feesDay: 1,
    feesStatus: false,
  },
  {
    id: 3,
    name: '이수정',
    age: 16,
    school: '대구여자고등학교',
    email: 'sjlee@example.com',
    phone: '010-1111-2222',
    postalCode: '54321',
    address: '대구광역시 중구 중앙대로 789',
    rewardPoints: 8,
    penaltyPoints: 1,
    classes: ['국어', '수학'],
    tuitionFees: 200000,
    feesDay: 1,
    feesStatus: false,
  },
];

function UsersInfoPage() {
  const [students] = useState<Student[]>(initialStudents);
  const [searchName, setSearchName] = useState('');
  const [searchAge, setSearchAge] = useState('');
  const [searchSchool, setSearchSchool] = useState('');
  const [filteredStudents, setFilteredStudents] =
    useState<Student[]>(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleSearch = () => {
    const newFilteredStudents = students.filter((student) => {
      return (
        (searchName === '' || student.name.includes(searchName)) &&
        (searchAge === '' || student.age.toString() === searchAge) &&
        (searchSchool === '' || student.school.includes(searchSchool))
      );
    });
    setFilteredStudents(newFilteredStudents);
  };

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleClosePopUp = () => {
    setSelectedStudent(null);
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
            searchSchool={searchSchool}
            setSearchSchool={setSearchSchool}
            handleSearch={handleSearch}
          />
        </div>
        <StudentTable
          students={filteredStudents}
          onStudentClick={handleStudentClick}
        />
      </div>
      {selectedStudent && (
        <StudentDetailPopUp
          student={selectedStudent}
          onClose={handleClosePopUp}
        />
      )}
    </div>
  );
}

export default UsersInfoPage;
