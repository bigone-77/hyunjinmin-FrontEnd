import { useState } from 'react';
import axiosInstance from '../../../hooks/useManagerAxios';
import { Student } from '../StudentInter'; // Student 타입 정의

export const useSearchStudents = () => {
  const [searchName, setSearchName] = useState('');
  const [searchAge, setSearchAge] = useState('');
  const [searchSchoolName, setSearchSchoolName] = useState('');
  const [isSearching, setIsSearching] = useState(false); // 검색 로딩 상태
  const [searchError, setSearchError] = useState<string | null>(null); // 검색 에러 상태

  const searchStudents = async (
    setFilteredStudents: React.Dispatch<React.SetStateAction<Student[]>>,
  ) => {
    const searchParams: Record<string, string> = {};
    if (searchName.trim()) searchParams.USER_NM = searchName;
    if (searchAge.trim()) searchParams.USER_AGE = searchAge;
    if (searchSchoolName.trim()) searchParams.SCHL_NM = searchSchoolName;

    // 검색 조건이 없으면 에러 반환
    if (Object.keys(searchParams).length === 0) {
      setSearchError('검색 조건을 입력해주세요.');
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await axiosInstance.post('/userInfo', searchParams);

      if (response.data.status === 'success') {
        const searchedStudents = response.data.dl_userList.map((user: any) => ({
          id: user.USER_ID,
          name: user.USER_NM,
          age: user.USER_AGE,
          email: user.USER_EMAIL,
          phone: user.PHONE_NUM,
          schoolName: user.SCHL_NM,
          postalCode: user.USER_ADDR_NUM,
          address: user.USER_ADDR_DTL,
          rewardPoints: user.GoodP,
          penaltyPoints: user.BadP,
          totalPoints: user.totalP,
        }));
        setFilteredStudents(searchedStudents);
      } else {
        if (response.data.msg === '유효하지 않은 토큰입니다') {
          alert('다시 로그인을 해주세요.');
          window.location.href = '/manager/auth/admin-login';
        } else {
          setSearchError(
            response.data.msg || '학생 정보를 불러오지 못했습니다.',
          );
        }
      }
    } catch (error: any) {
      console.error('Error during search:', error);
      setSearchError('검색 중 오류가 발생했습니다.');
    } finally {
      setIsSearching(false);
    }
  };

  return {
    searchName,
    setSearchName,
    searchAge,
    setSearchAge,
    searchSchoolName,
    setSearchSchoolName,
    searchStudents,
    isSearching,
    searchError,
  };
};
