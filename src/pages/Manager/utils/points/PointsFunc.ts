import axios from 'axios';
import { StudentPoints } from './PointsInter';
//////////////////////////////AXIOS함수////////////////////////////////////////
// 상점추가 함수
export const handleAddReward = async (
  studentId: string,
  rewardScore: number,
) => {
  const accessToken = localStorage.getItem('accessToken');

  //JWT토큰 없다면 로그인으로 이동
  if (!accessToken) {
    window.location.href = '/manager/auth/admin-login';
    return Promise.reject(new Error('No access token found.'));
  }
  try {
    const response = await axios.post(
      '/systemMng/admin/pointMng/addPoint',
      {
        USER_ID: studentId,
        SCORE_GB: '상점',
        SCORE: rewardScore,
      },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );

    if (response.data.status === 'success') {
      alert('상점이 성공적으로 추가되었습니다.');
      window.location.reload();
    } else {
      //JWT토큰 만료
      if (response.data.msg === '유효하지 않은 토큰입니다') {
        alert('다시 로그인을 해주세요.');
        window.location.href = '/manager/auth/admin-login';
      }
      alert(response.data.msg || '상점 추가에 실패했습니다.');
    }
  } catch (error) {
    alert('상점 추가 중 오류가 발생했습니다.');
  }
};

// 벌점 추가 함수
export const handleAddPenalty = async (
  studentId: string,
  penaltyScore: number,
) => {
  const accessToken = localStorage.getItem('accessToken');

  //JWT토큰 없다면 로그인으로 이동
  if (!accessToken) {
    window.location.href = '/manager/auth/admin-login';
    return Promise.reject(new Error('No access token found.'));
  }
  try {
    const response = await axios.post(
      '/systemMng/admin/pointMng/addPoint',
      {
        USER_ID: studentId,
        SCORE_GB: '벌점',
        SCORE: penaltyScore,
      },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );

    if (response.data.status === 'success') {
      alert('벌점이 성공적으로 추가되었습니다.');
      window.location.reload();
    } else {
      //JWT토큰 만료
      if (response.data.msg === '유효하지 않은 토큰입니다') {
        alert('다시 로그인을 해주세요.');
        window.location.href = '/manager/auth/admin-login';
      }
      alert(response.data.msg || '벌점 추가에 실패했습니다.');
    }
  } catch (error) {
    alert('벌점 추가 중 오류가 발생했습니다.');
  }
};

// 학생 상벌점 데이터 가져오는 함수
export const fetchStudentPoints = async (
  setStudents: React.Dispatch<React.SetStateAction<StudentPoints[]>>,
  setFilteredStudents: React.Dispatch<React.SetStateAction<StudentPoints[]>>,
) => {
  const accessToken = localStorage.getItem('accessToken');

  //JWT토큰 없다면 로그인으로 이동
  if (!accessToken) {
    window.location.href = '/manager/auth/admin-login';
    return Promise.reject(new Error('No access token found.'));
  }

  try {
    const response = await axios.post(
      '/systemMng/admin/pointMng/selectUserPoint',
      {},
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );

    if (response.data.status === 'success') {
      const studentsData = response.data.rtnList.map((student: any) => ({
        id: student.USER_ID,
        name: student.USER_NM,
        age: student.USER_AGE,
        school: student.SCHL_NM,
        rewardPoints: student.GoodP,
        penaltyPoints: student.BadP,
        totalPoints: student.totalP,
      }));
      setStudents(studentsData);
      setFilteredStudents(studentsData);
      console.log('response', response);
    } else {
      //JWT토큰 만료
      if (response.data.msg === '유효하지 않은 토큰입니다') {
        alert('다시 로그인을 해주세요.');
        window.location.href = '/manager/auth/admin-login';
      }
      alert(response.data.msg || '데이터를 가져오는데 실패했습니다.');
    }
  } catch (error) {
    alert('학생 상벌점을 가져오는데 실패했습니다.');
  }
};
//////////////////////////////일반함수////////////////////////////////////////
// 학생 상세보기 클릭 함수
export const handleStudentClick = (
  student: StudentPoints,
  setSelectedStudent: React.Dispatch<
    React.SetStateAction<StudentPoints | null>
  >,
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setSelectedStudent(student);
  setIsPopupOpen(true);
};

// 팝업 닫기 함수
export const handleClosePopup = (
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedStudent: React.Dispatch<
    React.SetStateAction<StudentPoints | null>
  >,
) => {
  setIsPopupOpen(false);
  setSelectedStudent(null);
};

// 학생 검색 함수
export const handleSearch = (
  students: StudentPoints[],
  searchName: string,
  searchAge: string,
  searchSchool: string,
  setFilteredStudents: React.Dispatch<React.SetStateAction<StudentPoints[]>>,
) => {
  const filtered = students.filter((student) => {
    return (
      (searchName === '' || student.name.includes(searchName)) &&
      (searchAge === '' || student.age.toString() === searchAge) &&
      (searchSchool === '' || student.school.includes(searchSchool))
    );
  });
  setFilteredStudents(filtered);
};
