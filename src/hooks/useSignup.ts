import { useState } from 'react';
import axios from 'axios';
import {
  schoolCodeMapping,
  userSchoolLevel,
  classGBMap,
} from '@/utils/getCode';

const useSignup = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userId, setUserId] = useState(''); //아이디
  const [password, setPassword] = useState(''); //비밀번호
  const [passwordConfirm, setPasswordConfirm] = useState(''); //비밀번호 확인 {확인버튼}
  const [userName, setUserName] = useState(''); //이름 {2~4글자}
  const [userEmail, setUserEmail] = useState(''); //이메일 {naver.com같은거 select}
  const [userSchoolName, setUserSchoolName] = useState(''); //학교 {여러개 중에 선택}
  const [userSchool, setUserSchool] = useState(''); //초,중,고
  const [userGrade, setUserGrade] = useState(1); //학년
  const [userAge, setUserAge] = useState(0); //나이
  //APRV_YN은 N으로
  //USER_ROLE은 USER_S로
  //SCHL_CD는 학교코드
  const [userPhoneNumber, setUserPhoneNumber] = useState(''); //본인 휴대폰 번호
  const [userParentPhoneNumber, setUserParentPhoneNumber] = useState(''); //학부모 휴대폰 번호
  const [userParentGB, setUserParentGB] = useState(''); //학부모 정보('부', '모') {부,모 중 선택}
  const [userParentName, setUserParentName] = useState(''); //학부모 이름
  const [userAddressNumber, setUserAddressNumber] = useState(''); //도로명 주소 {우편 번호 검색 기능 api - daum꺼 쓰기}
  const [userAddressDetail, setUserAddressDeatil] = useState(''); //상세 주소 {상세주소}
  //PAY_DATE -> 관리쌤이 변경가능하게(일단은 default로 넣고)
  const [userClasses, setUserClasses] = useState(''); //듣는 수업 {국, 영, 수, 과 중 중복 선택가능}
  const [error, setError] = useState('');

  const handleNext = () => {
    if (currentPage < 5) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const formatDateTime = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSignup = async () => {
    const schoolCode = schoolCodeMapping[userSchoolName];
    const userSchoolLevelValue = userSchoolLevel[userSchool] || 0;

    if (!schoolCode) {
      setError('유효한 학교를 선택하세요.');
      return;
    }

    const userClassCodes = userClasses
      .split(',')
      .map((className) => classGBMap[className.trim()])
      .filter(Boolean)
      .join(',');

    const currentDateTime = formatDateTime(new Date());

    try {
      const checkpassword = password;
      console.log('pass', checkpassword);
      const response = await axios.post(
        '/systemMng/user/userInfo/insertUserInfo',
        {
          USER_ID: userId,
          PASSWORD: password,
          USER_NM: userName,
          USER_EMAIL: userEmail,
          USER_GRADE: userGrade,
          USER_AGE: userAge,
          USER_SCHL_LEVEL: userSchoolLevelValue,
          REG_DT: currentDateTime,
          APRV_YN: 'N',
          USER_ROLE: 'USER_S',
          SCHL_CD: schoolCode,
          PHONE_NUM: userPhoneNumber,
          USER_ADDR_NUM: userAddressNumber,
          USER_ADDR_DTL: userAddressDetail,
          ELEMENT_LIST: userClassCodes,
          PARENT_GB: userParentGB,
          PARENT_PHONE_NUM: userParentPhoneNumber,
          PARENT_NM: userParentName,
          PAY_DATE: '1',
        },
      );

      if (response.data.status === 'success') {
        alert('회원가입에 성공했습니다. 로그인을 해주세요');
        window.location.href = '/auth/Login';
      } else {
        setError(response.data.msg);
      }
    } catch (error) {
      setError('회원가입에 실패했습니다. 다시 시도해 주세요.');
      console.error('Signup error:', error);
    }
  };

  return {
    currentPage,
    handleNext,
    handlePrevious,
    handleSignup,
    setError,
    error,
    userId,
    setUserId,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    userSchoolName,
    setUserSchoolName,
    userSchool,
    setUserSchool,
    userGrade,
    setUserGrade,
    userAge,
    setUserAge,
    userPhoneNumber,
    setUserPhoneNumber,
    userParentPhoneNumber,
    setUserParentPhoneNumber,
    userParentGB,
    setUserParentGB,
    userParentName,
    setUserParentName,
    userAddressNumber,
    setUserAddressNumber,
    userAddressDetail,
    setUserAddressDeatil,
    userClasses,
    setUserClasses,
  };
};

export default useSignup;
