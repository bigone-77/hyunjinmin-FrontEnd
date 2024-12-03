import { useFetchUserInfo } from '@/components/profile/hooks/useMyInfo';
import { useNavigate } from 'react-router-dom';

function MyInfoPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const { userInfo, isLoading, error } = useFetchUserInfo();

  return (
    <div className='flex flex-col items-center min-h-screen p-4'>
      {/* 로딩 중일 때 */}
      {isLoading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p className='text-red-500'>에러가 발생했습니다: {error}</p>
      ) : (
        <>
          <h2 className='text-xl font-bold text-center pb-2 mb-6 border-b-2 border-gray-300 '>
            {userInfo?.name || '사용자'} 님
          </h2>

          <div className='flex w-full pb-2 mb-6 border-b-2 border-gray-300 text-left items-center'>
            <h2 className='flex-1 text-xl font-semibold  w-1/4'>이메일 :</h2>
            <h2 className='flex-2 text-l font-semibold w-3/4'>
              {userInfo?.email || 'abcd@naver.com'}
            </h2>
          </div>

          <div className='flex w-full pb-2 mb-6 border-b-2 border-gray-300 text-left items-center'>
            <h2 className='flex-1 text-xl font-semibold  w-1/4'>학교 :</h2>
            <h2 className='flex-2 text-l font-semibold w-3/4'>
              {userInfo?.schoolName || '학교'}
            </h2>
          </div>

          <div className='flex w-full pb-2 mb-6 border-b-2 border-gray-300 text-left items-center'>
            <h2 className='flex-1 text-xl font-semibold  w-1/4'>학년 :</h2>
            <h2 className='flex-2 text-l font-semibold w-3/4'>
              {userInfo?.grade || '0'}
            </h2>
          </div>

          <div className='flex w-full pb-2 mb-6 border-b-2 border-gray-300 text-left items-center'>
            <h2 className='flex-1 text-xl font-semibold  w-1/4'>나이 :</h2>
            <h2 className='flex-2 text-l font-semibold w-3/4'>
              {userInfo?.age || 0}
            </h2>
          </div>

          <div className='flex w-full pb-2 mb-6 border-b-2 border-gray-300 text-left items-center'>
            <h2 className='flex-1 text-xl font-semibold  w-1/4'>상점 :</h2>
            <h2 className='flex-2 text-l font-semibold w-3/4'>
              {userInfo?.rewardPoints || 0}점
            </h2>
          </div>

          <div className='flex w-full pb-2 mb-6 border-b-2 border-gray-300 text-left items-center'>
            <h2 className='flex-1 text-xl font-semibold  w-1/4'>벌점 :</h2>
            <h2 className='flex-2 text-l font-semibold w-3/4'>
              {userInfo?.panaltyPoints || 0}점
            </h2>
          </div>

          <div className='flex w-full pb-2 mb-6 border-b-2 border-gray-300 text-left items-center'>
            <h2 className='flex-1 text-xl font-semibold  w-1/4'>종합 :</h2>
            <h2 className='flex-2 text-l font-semibold w-3/4'>
              {userInfo?.totalPoints || 0}점
            </h2>
          </div>

          <div className='w-1/2 max-w-md bg-white rounded-lg shadow-md border-gray-300 border-2'>
            <div className='flex items-center p-4' onClick={handleBack}>
              <span className='mr-3 text-gray-600'>🔙</span>
              <span className='flex-grow text-gray-800'>뒤로 가기</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MyInfoPage;
