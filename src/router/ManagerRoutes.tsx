import { Routes as ReactRouters, Route } from 'react-router-dom';

import UsersInfoPage from '@/pages/Manager/UsersInfo';
import TimeTablePage from '@/pages/Manager/TimeTable';
import NoticePage from '@/pages/Manager/Notice';
import PointsPage from '@/pages/Manager/Points';
import UserProvPage from '@/pages/Manager/UserProv';
import AdminLoginPage from '@/pages/auth/Login/AdminLogin';

function ManagerRoutes() {
  return (
    <ReactRouters>
      <Route path='manager/auth'>
        <Route path='adminLogin' element={<AdminLoginPage />} />
      </Route>

      <Route path='/manager'>
        <Route index element={<UsersInfoPage />} />
        <Route path='usersInfo' element={<UsersInfoPage />} />
        <Route path='timeTable' element={<TimeTablePage />} />
        <Route path='notice' element={<NoticePage />} />
        <Route path='points' element={<PointsPage />} />
        <Route path='userProv' element={<UserProvPage />} />
      </Route>
    </ReactRouters>
  );
}

export default ManagerRoutes;
