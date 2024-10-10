import { useLocation } from 'react-router-dom';
import LnbButton from './usersInfo/LnbButtons';

function Lnb() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className='w-full bg-gray-800 text-white p-4 flex justify-center shadow-md sticky top-0 z-10'>
      <LnbButton
        to='/manager/usersInfo'
        isSelected={currentPath === '/manager/usersInfo'}
      >
        학생 정보
      </LnbButton>
      <LnbButton
        to='/manager/timeTable'
        isSelected={currentPath === '/manager/timeTable'}
      >
        시간표 생성
      </LnbButton>
      <LnbButton
        to='/manager/notice'
        isSelected={currentPath === '/manager/notice'}
      >
        공지사항 작성
      </LnbButton>
      <LnbButton
        to='/manager/points'
        isSelected={currentPath === '/manager/points'}
      >
        상/벌점 주기
      </LnbButton>
      <LnbButton
        to='/manager/weekTest'
        isSelected={currentPath === '/manager/weekTest'}
      >
        금요평가 성적 입력
      </LnbButton>
    </nav>
  );
}

export default Lnb;
