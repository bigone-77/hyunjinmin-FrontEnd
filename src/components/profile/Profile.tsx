import { Link } from 'react-router-dom';
import { userState } from '@/recoil/atoms/user';
import { useSetRecoilState } from 'recoil';
import { useFetchUserInfo } from '@/components/profile/hooks/useMyInfo';
import Spacing from '@/components/shared/Spacing';

function Profile() {
  const setUser = useSetRecoilState(userState);

  const { userInfo, isLoading, error } = useFetchUserInfo();

  const handleLogout = () => {
    setUser({
      isLoggedIn: false,
      userId: null,
      role: null,
    });

    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    window.location.href = '/auth/login';
  };

  return (
    <div className='flex flex-col items-center min-h-screen p-4'>
      {/* 로딩 중일 때 */}
      {isLoading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p className='text-red-500'>에러가 발생했습니다: {error}</p>
      ) : (
        <>
          {/* 사용자 이름 */}
          <h2 className='text-xl font-bold text-center mb-6'>
            {userInfo?.name || '사용자'} 님
          </h2>

          {/* 메뉴 리스트 */}
          {/* <div className='w-full max-w-md bg-white rounded-lg shadow-md'>
            <Link to='/account' className='flex items-center p-4 border-b'>
              <span className='mr-3 text-gray-600'>👤</span>
              <span className='flex-grow text-gray-800'>내 정보</span>
              <span className='text-gray-600 font-bold text-[16px]'>&gt;</span>
            </Link>
            <Spacing size={16} />
            <Link to='/settings' className='flex items-center p-4 border-b'>
              <span className='mr-3 text-gray-600'>🔧</span>
              <span className='flex-grow text-gray-800'>내 정보 변경</span>
              <span className='text-gray-600 font-bold text-[16px]'>&gt;</span>
            </Link>
            <div className='flex items-center p-4' onClick={handleLogout}>
              <span className='mr-3 text-gray-600'>🚪</span>
              <span className='flex-grow text-gray-800'>로그아웃</span>
              <span className='text-gray-600 font-bold text-[16px]'>&gt;</span>
            </div>
          </div> */}
          <div className='w-full'>
            <div className='w-full max-w-md bg-white rounded-lg shadow-md border-gray-300 border-2'>
              <Link to='/account' className='flex items-center p-4 border-b'>
                <span className='mr-3 text-gray-600'>👤</span>
                <span className='flex-grow text-gray-800'>내 정보</span>
                <span className='text-gray-600 font-bold text-[16px]'>
                  &gt;
                </span>
              </Link>
            </div>
            <Spacing size={24} />
            <div className='w-full max-w-md bg-white rounded-lg shadow-md border-gray-300 border-2'>
              <Link
                to='/change-info'
                className='flex items-center p-4 border-b'
              >
                <span className='mr-3 text-gray-600'>🔧</span>
                <span className='flex-grow text-gray-800'>내 정보 변경</span>
                <span className='text-gray-600 font-bold text-[16px]'>
                  &gt;
                </span>
              </Link>
            </div>
            <Spacing size={24} />
            <div className='w-full max-w-md bg-white rounded-lg shadow-md border-gray-300 border-2'>
              <div className='flex items-center p-4' onClick={handleLogout}>
                <span className='mr-3 text-gray-600'>🚪</span>
                <span className='flex-grow text-gray-800'>로그아웃</span>
                <span className='text-gray-600 font-bold text-[16px]'>
                  &gt;
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
