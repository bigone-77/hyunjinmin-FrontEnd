import axios from 'axios';
import { ChangeEvent } from 'react';
import { Student } from './StudentInter';

//////////////////////////////AXIOS함수////////////////////////////////////////
// 유저 권한 회수 함수
export const unApproveUser = async (studentId: string, onClose: () => void) => {
  const accessToken = localStorage.getItem('accessToken');
  //JWT토큰 없다면 로그인으로 이동
  if (!accessToken) {
    window.location.href = '/manager/auth/adminLogin';
    return Promise.reject(new Error('No access token found.'));
  }
  try {
    const response = await axios.post(
      '/systemMng/admin/userMng/unAprovUserInfo',
      { USER_ID: studentId },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );

    if (response.data.status === 'success') {
      alert('권한을 성공적으로 회수했습니다.');
      window.location.reload();
      onClose();
    } else {
      //JWT토큰 만료
      if (response.data.msg === '유효하지 않은 토큰입니다') {
        alert('다시 로그인을 해주세요.');
        window.location.href = '/manager/auth/adminLogin';
      }
      alert(response.data.msg || '회수에 실패했습니다.');
    }
  } catch (error) {
    alert('권한 회수 중 오류가 발생했습니다.');
  }
};

// 학생 정보를 가져오는 함수
let alertShown = false; // 플래그 선언

export const fetchStudents = async (
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>,
  setFilteredStudents: React.Dispatch<React.SetStateAction<Student[]>>,
) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    if (!alertShown) {
      alertShown = true; // alert가 한 번만 표시되도록 설정
      alert('다시 로그인을 해주세요.');
      window.location.href = '/manager/auth/adminLogin';
    }
    return Promise.reject(new Error('No access token found.'));
  }
  try {
    const response = await axios.post(
      '/systemMng/admin/userMng/userInfo',
      { USER_NM: '' },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );

    if (response.data.status === 'success') {
      const studentsData = response.data.dl_userList.map((user: any) => ({
        id: user.USER_ID,
        name: user.USER_NM,
        age: user.USER_AGE,
        email: user.USER_EMAIL,
        phone: user.PHONE_NUM,
        school: '',
        postalCode: '',
        address: '',
        rewardPoints: 0,
        penaltyPoints: 0,
        classes: [],
        tuitionFees: 0,
        feesDay: 1,
        feesStatus: true,
      }));
      setStudents(studentsData);
      setFilteredStudents(studentsData);
    } else {
      if (response.data.msg === '유효하지 않은 토큰입니다' && !alertShown) {
        alertShown = true;
        alert('다시 로그인을 해주세요.');
        window.location.href = '/manager/auth/adminLogin';
      }
      throw new Error(response.data.msg || '학생 정보를 불러오지 못했습니다.');
    }
  } catch (error) {
    console.error('Error fetching student data:', error);
  }
};

// 검색 함수
export const handleSearch = async (
  searchName: string,
  setFilteredStudents: React.Dispatch<React.SetStateAction<Student[]>>,
) => {
  const accessToken = localStorage.getItem('accessToken');
  //JWT토큰 없다면 로그인으로 이동
  if (!accessToken) {
    window.location.href = '/manager/auth/adminLogin';
    return Promise.reject(new Error('No access token found.'));
  }
  try {
    const response = await axios.post(
      '/systemMng/admin/userMng/userInfo',
      { USER_NM: searchName },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );

    if (response.data.status === 'success') {
      const searchedStudents = response.data.dl_userList.map((user: any) => ({
        id: user.USER_ID,
        name: user.USER_NM,
        age: user.USER_AGE,
        email: user.USER_EMAIL,
        phone: user.PHONE_NUM,
        school: '',
        postalCode: '',
        address: '',
        rewardPoints: 0,
        penaltyPoints: 0,
        classes: [],
        tuitionFees: 0,
        feesDay: 1,
        feesStatus: true,
      }));
      setFilteredStudents(searchedStudents);
    } else {
      //JWT토큰 만료
      if (response.data.msg === '유효하지 않은 토큰입니다') {
        alert('다시 로그인을 해주세요.');
        window.location.href = '/manager/auth/adminLogin';
      }
      throw new Error(response.data.msg || '학생 정보를 불러오지 못했습니다.');
    }
  } catch (error) {
    console.error('Error during search:', error);
  }
};
//////////////////////////////일반함수////////////////////////////////////////
// 납부상태 변경 함수
export const handlePaymentCompletion = (
  setFeesStatus: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setFeesStatus(true); // Update the status to "completed"
};

// SearchBar에서 사용하는 검색함수들
export const handleNameChange =
  (setSearchName: React.Dispatch<React.SetStateAction<string>>) =>
  (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

export const handleAgeChange =
  (setSearchAge: React.Dispatch<React.SetStateAction<string>>) =>
  (e: ChangeEvent<HTMLInputElement>) => {
    setSearchAge(e.target.value);
  };

export const handleSchoolChange =
  (setSearchSchool: React.Dispatch<React.SetStateAction<string>>) =>
  (e: ChangeEvent<HTMLInputElement>) => {
    setSearchSchool(e.target.value);
  };

// detail popup에서 사용하는 유저 클릭함수
export const handleStudentClick = (
  student: Student,
  setSelectedStudent: React.Dispatch<React.SetStateAction<Student | null>>,
) => {
  setSelectedStudent(student);
};

//detail popup에서 사용하는 닫기 함수
export const handleClosePopUp = (
  setSelectedStudent: React.Dispatch<React.SetStateAction<Student | null>>,
) => {
  setSelectedStudent(null);
};
