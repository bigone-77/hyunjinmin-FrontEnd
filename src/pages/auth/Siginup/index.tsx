import axios from 'axios';
import { useState } from 'react';
import loginBg from '@/assets/svgs/bg-login.svg';

import SignupStep1 from './Step1';
import SignupStep2 from './Step2';
import SignupStep3 from './Step3';
import SignupStep4 from './Step4';
import SignupStep5 from './Step5';
import Spacing from '@/components/shared/Spacing';
import {
  schoolCodeMapping,
  userSchoolLevel,
  classGBMap,
} from '@/utils/getCode';

function SiginupPage() {
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

  const [, setError] = useState('');

  const handleNext = () => {
    if (currentPage < 5) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
    // userSchoolName에 해당하는 SCHL_CD 가져오기
    const schoolCode = schoolCodeMapping[userSchoolName];
    const userSchoolLevelValue = userSchoolLevel[userSchool] || 0;

    if (!schoolCode) {
      setError('유효한 학교를 선택하세요.');
      return;
    }

    const userClassCodes = userClasses
      .split(',')
      .map((className) => classGBMap[className.trim()])
      .filter(Boolean) // 유효한 코드만 필터링
      .join(',');

    const currentDateTime = formatDateTime(new Date());

    try {
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
        // const { accessToken } = response.data;
        // localStorage.setItem('accessToken', accessToken);
        alert('회원가입에 성공했습니다. 로그인을 해주세요');
        window.location.href = '/auth/Login';
        if ('USER_T' === response.data.USER_ROLE) {
          window.location.href = '/manager/usersInfo';
        } else {
          window.location.href = '/';
        }
      } else {
        setError(response.data.msg);
      }
    } catch (error) {
      setError('회원가입에 실패했습니다. 다시 시도해 주세요.');
      console.error('Login error:', error);
    }
  };

  // const handleSignup = () => {
  //   // userSchoolName에 해당하는 SCHL_CD 가져오기
  //   const schoolCode = schoolCodeMapping[userSchoolName];

  //   if (!schoolCode) {
  //     setError('유효한 학교를 선택하세요.');
  //     return;
  //   }

  //   console.log({
  //     USER_ID: userId,
  //     PASSWORD: password,
  //     USER_NM: userName,
  //     USER_EMAILL: userEmail,
  //     USER_GRADE: userGrade,
  //     USER_AGE: userAge,
  //     // USER_SCHL_LEVEL: userSchool,
  //     APRV_YN: 'N',
  //     USER_ROLE: 'USER_S',
  //     SCHL_CD: schoolCode,
  //     PHONE_NUM: userPhoneNumber,
  //     USER_ADDR_NUM: userAddressNumber,
  //     USER_ADDR_DTL: userAddressDetail,
  //     USER_CLASSES: userClasses,
  //     PARENT_GB: userParentGB,
  //     PARENT_NM: userParentPhoneNumber,
  //     PARENT_PHONE_NUM: userParentName,
  //     PAY_DATE: '1',
  //   });

  //   console.log('회원가입 데이터가 성공적으로 출력되었습니다.');
  // };

  const progressPercentage = (currentPage / 5) * 100 - 20;

  return (
    <div className='pt-10'>
      <img src={loginBg} alt='login-bg' className='mx-auto' />
      <div className='my-8'>
        <p className='text-2xl text-black'>회원가입</p>
        <Spacing size={12} />

        <div className='w-full bg-gray-200 h-2 rounded '>
          <div
            className='bg-primary h-2 rounded-xl transition-all duration-1000 ease-in-out'
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className='mt-1 flex justify-center'>
          {Math.round(progressPercentage)}% 완료 되었어요!
        </p>
        <Spacing size={12} />

        {currentPage === 1 && (
          <SignupStep1
            userId={userId}
            password={password}
            passwordConfirm={passwordConfirm}
            setUserId={setUserId}
            setPassword={setPassword}
            setPasswordConfirm={setPasswordConfirm}
            onNext={handleNext}
          />
        )}
        {currentPage === 2 && (
          <SignupStep2
            userName={userName}
            userEmail={userEmail}
            userPhoneNumber={userPhoneNumber}
            userAddressNumber={userAddressNumber}
            userAddressDetail={userAddressDetail}
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserPhoneNumber={setUserPhoneNumber}
            setUserAddressNumber={setUserAddressNumber}
            setUserAddressDeatil={setUserAddressDeatil}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
        {currentPage === 3 && (
          <SignupStep3
            userSchoolName={userSchoolName}
            userSchool={userSchool}
            userGrade={userGrade}
            userAge={userAge}
            setUserSchoolName={setUserSchoolName}
            setUserSchool={setUserSchool}
            setUserGrade={setUserGrade}
            setUserAge={setUserAge}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
        {currentPage === 4 && (
          <SignupStep4
            userParentName={userParentName}
            userParentPhoneNumber={userParentPhoneNumber}
            userParentGB={userParentGB}
            setUserParentName={setUserParentName}
            setUserParentPhoneNumber={setUserParentPhoneNumber}
            setUserParentGB={setUserParentGB}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
        {currentPage === 5 && (
          <SignupStep5
            setUserClasses={setUserClasses}
            onPrevious={handlePrevious}
            onNext={handleSignup}
          />
        )}
      </div>
    </div>
  );
}

export default SiginupPage;
