import { Outlet } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <p className='text-xs'>Navbar</p>
      <Outlet />
    </div>
  );
}

export default Navbar;
