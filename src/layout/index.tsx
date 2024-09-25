import { Outlet } from 'react-router-dom';

import Footer from '@/layout/Footer';
import Header from '@/layout/Header';

function Layout() {
  return (
    <div className='relative'>
      <Header />
      <Outlet />
      <div className='w-full max-w-[500px] fixed left-0 right-0 bottom-10 px-6'>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
