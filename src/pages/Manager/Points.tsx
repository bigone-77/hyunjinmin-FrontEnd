import { useState } from 'react';
import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';
import SearchBar from '@/pages/Manager/utils/usersInfo/SearchBar';
import { Student } from '@/pages/Manager/utils/types/Student';
import PointsTable from '@/pages/Manager/utils/points/PointsTable';

// 임시 학생 데이터
const initialStudents: Student[] = [
  {
    id: 1,
    name: '김현진',
    age: 17,
    school: '서울고등학교',
    rewardPoints: 5,
    penaltyPoints: 2,
    email: '',
    phone: '',
    postalCode: '',
    address: '',
    classes: [],
    tuitionFees: 0,
    feesDay: 0,
    feesStatus: false,
  },
  {
    id: 2,
    name: '박지민',
    age: 18,
    school: '부산고등학교',
    rewardPoints: 3,
    penaltyPoints: 0,
    email: '',
    phone: '',
    postalCode: '',
    address: '',
    classes: [],
    tuitionFees: 0,
    feesDay: 0,
    feesStatus: false,
  },
  {
    id: 3,
    name: '이수정',
    age: 16,
    school: '대구여자고등학교',
    rewardPoints: 8,
    penaltyPoints: 1,
    email: '',
    phone: '',
    postalCode: '',
    address: '',
    classes: [],
    tuitionFees: 0,
    feesDay: 0,
    feesStatus: false,
  },
];

function PointsPage() {
  const [students] = useState<Student[]>(initialStudents);
  const [filteredStudents, setFilteredStudents] =
    useState<Student[]>(initialStudents);
  const [searchName, setSearchName] = useState<string>('');
  const [searchAge, setSearchAge] = useState<string>('');
  const [searchSchool, setSearchSchool] = useState<string>('');

  const handleSearch = () => {
    const filtered = students.filter((student) => {
      return (
        (searchName === '' || student.name.includes(searchName)) &&
        (searchAge === '' || student.age.toString() === searchAge) &&
        (searchSchool === '' || student.school.includes(searchSchool))
      );
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
            searchSchool={searchSchool}
            setSearchSchool={setSearchSchool}
            handleSearch={handleSearch}
          />
        </div>
        {/* 학생 정보 테이블 */}
        <PointsTable students={filteredStudents} />
      </div>
    </div>
  );
}

export default PointsPage;
