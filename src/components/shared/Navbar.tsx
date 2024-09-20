import { Outlet } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

import { flexCenter, flexRowSpaceBetweenCenter } from '@/styles/flex';

function Navbar() {
  return (
    <>
      <nav
        className={`${flexRowSpaceBetweenCenter} fixed w-full max-w-[500px] px-6 py-4 bg-white shadow-inner z-1 border-2`}
      >
        <div className={`${flexCenter} gap-x-2`}>
          <GiHamburgerMenu size={25} />
          <p className='text-sm font-semibold text-grey'>현진민 학원</p>
        </div>
        <p className='text-xs text-grey'>로그아웃</p>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
