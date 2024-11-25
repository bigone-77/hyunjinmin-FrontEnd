import axios from 'axios';
import { ChangeEvent } from 'react';
//////////////////////////////AXIOS함수////////////////////////////////////////
export const checkUserIdAvailability = async (
  userId: string,
): Promise<boolean> => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.post(
      '/systemMng/user/userInfo/selectUserCnt',
      { USER_ID: userId },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );

    // 응답의 cntStatus 속성에서 status를 확인
    const cntStatus = response.data.cntStatus;
    if (cntStatus && cntStatus.status === 'success') {
      return true; // 아이디 사용 가능
    } else {
      return false; // 아이디 중복
    }
  } catch (error) {
    console.error('Error checking user ID availability:', error);
    throw new Error('서버 요청 중 오류가 발생했습니다.');
  }
};
//////////////////////////////일반함수////////////////////////////////////////
// Step1 //
export const checkPasswordValidity = (password: string): string | null => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password) return null;
  if (!passwordRegex.test(password)) {
    return '비밀번호는 최소 8자, 대문자, 소문자, 숫자 및 특수문자를 포함해야 합니다.';
  }
  return null;
};

//비밀번호 변경시 조건검사 함수
export const handlePasswordChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setPassword: (value: string) => void,
  setPasswordError: (value: string | null) => void,
  checkPasswordValidity: (password: string) => string | null,
) => {
  const newPassword = e.target.value;
  setPassword(newPassword);

  // 비밀번호 조건 검사
  const error = checkPasswordValidity(newPassword);
  setPasswordError(error);
};

//비밀번호 환인 함수
export const handlePasswordConfirmChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  password: string,
  setPasswordConfirm: (value: string) => void,
  setConfirmError: (value: string | null) => void,
) => {
  const confirmValue = e.target.value;
  setPasswordConfirm(confirmValue);

  // 비밀번호 일치 검사
  if (password !== confirmValue) {
    setConfirmError('비밀번호가 일치하지 않습니다.');
  } else {
    setConfirmError(null);
  }
};

// Step2 //
// Daum 우편번호 API
export const loadDaumPostcode = (
  setUserAddressNumber: (value: string) => void,
  setUserAddressDetail: (value: string) => void,
) => {
  const script = document.createElement('script');
  script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  script.async = true;
  document.body.appendChild(script);

  script.onload = () => {
    new (window as any).daum.Postcode({
      oncomplete: function (data: any) {
        const fullAddress = data.roadAddress; // 도로명 주소
        const zoneCode = data.zonecode; // 우편번호

        setUserAddressNumber(zoneCode);
        setUserAddressDetail(fullAddress);
      },
    }).open();
  };
};

// Daum 우편번호 서비스 로드 함수
export const handleAddressSearch = (
  loadDaumPostcode: (
    setAddressNumber: (value: string) => void,
    setAddressDetail: (value: string) => void,
  ) => void,
  setUserAddressNumber: (value: string) => void,
  setUserAddressDeatil: (value: string) => void,
) => {
  loadDaumPostcode(setUserAddressNumber, setUserAddressDeatil);
};

// 이메일 로컬 파트 변경 함수
export const handleEmailLocalChange = (
  e: ChangeEvent<HTMLInputElement>,
  setUserEmail: (value: string) => void,
  customDomain: string,
  emailDomain: string,
) => {
  const localPart = e.target.value;
  setUserEmail(`${localPart}@${customDomain || emailDomain}`);
};

// 전화번호 변경 및 형식 검사 함수
export const handlePhoneNumberChange = (
  e: ChangeEvent<HTMLInputElement>,
  setUserPhoneNumber: (value: string) => void,
  setPhoneError: (value: string | null) => void,
) => {
  const formattedPhoneNumber = e.target.value
    .replace(/[^0-9-]/g, '')
    .replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
  setUserPhoneNumber(formattedPhoneNumber);

  // 전화번호 형식 검사
  if (!formattedPhoneNumber.match(/^\d{3}-\d{4}-\d{4}$/)) {
    setPhoneError('올바른 전화번호 형식이 아닙니다. (010-1234-5678)');
  } else {
    setPhoneError(null);
  }
};

// 우편번호 변경 및 형식 검사 함수
export const handleAddressNumberChange = (
  e: ChangeEvent<HTMLInputElement>,
  setUserAddressNumber: (value: string) => void,
  setAddressError: (value: string | null) => void,
) => {
  const address = e.target.value;
  setUserAddressNumber(address);

  // 우편번호 형식 검사 (수동 입력에만 적용)
  if (address && !address.match(/^\d{5}$/)) {
    setAddressError('우편번호는 5자리 숫자여야 합니다.');
  } else {
    setAddressError(null);
  }
};

// Step3 //
//학교 변경 함수
export const handleSchoolChange = (
  e: ChangeEvent<HTMLSelectElement>,
  setUserSchool: (value: string) => void,
  updateAge: (school: string, grade: number) => void,
  grade: number,
) => {
  const school = e.target.value as '초' | '중' | '고';
  setUserSchool(school);
  updateAge(school, grade);
};

//학년 변경 함수
export const handleGradeChange = (
  e: ChangeEvent<HTMLSelectElement>,
  setGrade: (value: number) => void,
  setUserGrade: (value: number) => void,
  userSchool: '초' | '중' | '고' | string,
  updateAge: (school: string, grade: number) => void,
) => {
  const selectedGrade = parseInt(e.target.value, 10);
  setGrade(selectedGrade);
  setUserGrade(selectedGrade);
  updateAge(userSchool as '초' | '중' | '고', selectedGrade);
};

//나이 반영 함수
export const updateAge = (
  school: string,
  grade: number,
  setUserAge: (value: number) => void,
) => {
  try {
    const calculatedAge = calculateAge(school, grade);
    setUserAge(calculatedAge);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('알 수 없는 오류가 발생했습니다.');
    }
  }
};

//나이 도출 함수
export function calculateAge(school: string, grade: number): number {
  let baseAge = 0;

  switch (school) {
    case '초':
      baseAge = 8; // 초등학교는 8살부터 시작
      break;
    case '중':
      baseAge = 14; // 중학교는 14살부터 시작
      break;
    case '고':
      baseAge = 17; // 고등학교는 17살부터 시작
      break;
    default:
      throw new Error('유효하지 않은 학교 유형입니다.');
  }

  return baseAge + (grade - 1);
}

// Step4 //
// 부모님 전화번호 변경 및 형식 검사 함수
export const handleParentPhoneNumberChange = (
  e: ChangeEvent<HTMLInputElement>,
  setUserParentPhoneNumber: (value: string) => void,
  setParentPhoneError: (value: string | null) => void,
) => {
  const formattedPhoneNumber = e.target.value
    .replace(/[^0-9-]/g, '')
    .replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
  setUserParentPhoneNumber(formattedPhoneNumber);

  // 전화번호 형식 검사
  if (!formattedPhoneNumber.match(/^\d{3}-\d{4}-\d{4}$/)) {
    setParentPhoneError('올바른 전화번호 형식이 아닙니다. (010-1234-5678)');
  } else {
    setParentPhoneError(null);
  }
};
// Step5 //
export const handleClassChange = (
  e: ChangeEvent<HTMLInputElement>,
  selectedClasses: string[],
  setSelectedClasses: (classes: string[]) => void,
) => {
  const { value, checked } = e.target;
  if (checked) {
    setSelectedClasses([...selectedClasses, value]);
  } else {
    setSelectedClasses(selectedClasses.filter((item) => item !== value));
  }
};
