import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { GiHamburgerMenu } from 'react-icons/gi';

import { flexCenter, flexRowSpaceBetweenCenter } from '@/styles/flex';

function Navbar() {
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  return (
    <>
      <nav
        className={`${flexRowSpaceBetweenCenter} fixed w-full max-w-[500px] px-6 py-4 bg-white shadow-inner z-10 border-2`}
        ref={navRef}
      >
        <div className={`${flexCenter} gap-x-2`}>
          <GiHamburgerMenu size={25} onClick={() => {}} />
          <p className='text-sm font-semibold text-grey'>현진민 학원</p>
        </div>
        <p className='text-xs text-grey'>로그아웃</p>
      </nav>

      <div
        className='flex-grow w-full overflow-auto'
        style={{ paddingTop: `${navHeight}px` }}
      >
        <Outlet />
      </div>
    </>
  );
}

export default Navbar;
