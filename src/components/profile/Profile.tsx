import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div className='flex flex-col items-center min-h-screen p-4'>
      {/* 프로필 이미지 */}
      <div className='w-24 h-24 rounded-full bg-gray-200 mb-4'>
        <img
          src='https://via.placeholder.com/150'
          alt='Profile'
          className='w-full h-full rounded-full object-cover'
        />
      </div>

      {/* 사용자 이름 */}
      <h2 className='text-xl font-bold text-center mb-6'>Isro Abdillah</h2>

      {/* 메뉴 리스트 */}
      <div className='w-full max-w-md bg-white rounded-lg shadow-md'>
        <Link to='/account' className='flex items-center p-4 border-b'>
          <span className='mr-3 text-gray-600'>👤</span>
          <span className='flex-grow text-gray-800'>계정</span>
          <span className='text-gray-600 font-bold text-[16px]'>&gt;</span>
        </Link>
        <Link to='/settings' className='flex items-center p-4 border-b'>
          <span className='mr-3 text-gray-600'>🔧</span>
          <span className='flex-grow text-gray-800'>설정</span>
          <span className='text-gray-600 font-bold text-[16px]'>&gt;</span>
        </Link>
        <Link to='/logout' className='flex items-center p-4'>
          <span className='mr-3 text-gray-600'>🚪</span>
          <span className='flex-grow text-gray-800'>로그아웃</span>
          <span className='text-gray-600 font-bold text-[16px]'>&gt;</span>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
