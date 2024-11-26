import TextInput from '@/components/shared/TextInput';
import Spacing from '@/components/shared/Spacing';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { IoMdMail } from 'react-icons/io';
import { FaPhone } from 'react-icons/fa';
import { FaAddressBook } from 'react-icons/fa';

import { SignupStep2Props } from './SignupInter';
import {
  loadDaumPostcode,
  handleAddressSearch,
  handleEmailLocalChange,
  handlePhoneNumberChange,
  handleAddressNumberChange,
} from './SiginupFunc';
import { useEffect, useState } from 'react';

// 사용자의 개인 정보
function SignupStep2({
  userName,
  userEmail,
  userPhoneNumber,
  userAddressNumber,
  userAddressDetail,
  setUserName,
  setUserEmail,
  setUserPhoneNumber,
  setUserAddressNumber,
  setUserAddressDeatil,
  onPrevious,
  onNext,
}: SignupStep2Props) {
  const [emailDomain, setEmailDomain] = useState('naver.com');
  const [customDomain, setCustomDomain] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null); //전화번호 조건 에러
  const [addressError, setAddressError] = useState<string | null>(null); //우편번호 조건 에러
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleAddressSearchClick = () => {
    handleAddressSearch(
      loadDaumPostcode,
      setUserAddressNumber,
      setUserAddressDeatil,
    );
  };

  useEffect(() => {
    const isFormValid =
      userName &&
      userEmail.includes('@') &&
      !phoneError &&
      !addressError &&
      userPhoneNumber.match(/^\d{3}-\d{4}-\d{4}$/) &&
      userAddressNumber &&
      userAddressDetail;

    setIsButtonDisabled(!isFormValid);
  }, [
    userName,
    userEmail,
    userPhoneNumber,
    userAddressNumber,
    userAddressDetail,
    phoneError,
    addressError,
  ]);

  return (
    <div>
      <TextInput
        icon={MdDriveFileRenameOutline}
        placeholder='이름'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Spacing size={10} />
      <div className='flex items-center'>
        <TextInput
          icon={IoMdMail}
          placeholder='이메일'
          value={userEmail.split('@')[0]}
          onChange={(e) =>
            handleEmailLocalChange(e, setUserEmail, customDomain, emailDomain)
          }
        />
        <select
          onChange={(e) => {
            const value = e.target.value;
            setEmailDomain(value);
            if (value === 'custom') {
              setCustomDomain('');
            } else {
              setUserEmail(`${userEmail.split('@')[0]}@${value}`);
            }
          }}
          className='p-1 border rounded ml-2 w-1/2'
        >
          <option value='naver.com'>@naver.com</option>
          <option value='gmail.com'>@gmail.com</option>
          <option value='daum.net'>@daum.net</option>
          <option value='custom'>직접입력</option>
        </select>
      </div>
      {emailDomain === 'custom' && (
        <input
          type='text'
          placeholder='직접 입력'
          onChange={(e) => setCustomDomain(e.target.value)}
          className='p-2 border rounded mt-2 w-full'
        />
      )}
      <Spacing size={10} />
      <TextInput
        icon={FaPhone}
        placeholder='휴대폰 번호 (000-0000-0000)'
        value={userPhoneNumber}
        onChange={(e) =>
          handlePhoneNumberChange(e, setUserPhoneNumber, setPhoneError)
        }
      />
      {phoneError && <p className='pl-7 text-red text-sm'>{phoneError}</p>}
      <Spacing size={10} />
      <TextInput
        icon={FaAddressBook}
        placeholder='우편번호'
        value={userAddressNumber}
        onChange={(e) =>
          handleAddressNumberChange(e, setUserAddressNumber, setAddressError)
        }
      />
      {addressError && <p className='pl-7 text-red text-sm'>{addressError}</p>}
      <div className='flex justify-end'>
        <button
          onClick={handleAddressSearchClick}
          className='bg-primary text-white p-2 rounded w-1/3 my-2'
        >
          우편번호 검색
        </button>
      </div>
      <Spacing size={5} />
      <TextInput
        icon={FaAddressBook}
        placeholder='상세 주소'
        value={userAddressDetail}
        onChange={(e) => setUserAddressDeatil(e.target.value)}
      />

      <Spacing size={10} />
      <div className='absolute bottom-8 left-0 right-0 flex justify-between'>
        <button
          onClick={onPrevious}
          className='bg-gray-300 p-2 rounded-xl w-[45%] ml-4'
        >
          이전
        </button>
        <button
          onClick={onNext}
          className={`bg-primary text-white p-2 rounded-xl w-[45%] mr-4 ${
            isButtonDisabled ? 'opacity-25 cursor-not-allowed' : ''
          }`}
          disabled={isButtonDisabled}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default SignupStep2;
