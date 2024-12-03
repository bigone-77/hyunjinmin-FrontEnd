import useSignup from '@/hooks/useSignup';

import loginBg from '@/assets/svgs/bg-login.svg';

import SignupStep1 from './Step1';
import SignupStep2 from './Step2';
import SignupStep3 from './Step3';
import SignupStep4 from './Step4';
import SignupStep5 from './Step5';

import Spacing from '@/components/shared/Spacing';

function SiginupPage() {
  const {
    currentPage,
    handleNext,
    handlePrevious,
    handleSignup,
    // error,
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
    userPhoneNumber,
    setUserPhoneNumber,
    userAddressNumber,
    setUserAddressNumber,
    userAddressDetail,
    setUserAddressDeatil,
    userSchoolName,
    setUserSchoolName,
    userSchool,
    setUserSchool,
    userGrade,
    setUserGrade,
    userAge,
    setUserAge,
    userParentName,
    setUserParentName,
    userParentPhoneNumber,
    setUserParentPhoneNumber,
    userParentGB,
    setUserParentGB,
    // userClasses,
    setUserClasses,
  } = useSignup();

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
