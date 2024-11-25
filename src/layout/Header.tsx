import { flexColumn, flexRow, flexRowSpaceBetweenCenter } from '@/styles/flex';
import Student from '@/assets/svgs/student.svg';

function Header() {
  return (
    <header className='pt-6'>
      <div className={`${flexRowSpaceBetweenCenter}`}>
        <div className={`${flexColumn} gap-y-2`}>
          <span className={`${flexRow} text-lg font-semibold text-grey100`}>
            <h1>안녕하세요</h1>
            <h1 className='ml-1 underline underline-offset-4'>
              우리 모두 현진민에서
            </h1>{' '}
            👋
          </span>
          <h2 className='text-2xl text-primary'>오늘도 열심히 공부해봐요</h2>
        </div>
        <img src={Student} alt='student-svg' />
      </div>
    </header>
  );
}

export default Header;
