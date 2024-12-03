import { Routes as ReactRouters, Route } from 'react-router-dom';

import UsersInfoPage from '@/pages/Manager/UsersInfo';
import TimeTablePage from '@/pages/Manager/TimeTable';
import NoticePage from '@/pages/Manager/Notice';
import PointsPage from '@/pages/Manager/Points';
import UserProvPage from '@/pages/Manager/UserProv';
import AdminLoginPage from '@/pages/auth/Login/AdminLogin';
import TeacherPage from '@/pages/Manager/Teacher';

function ManagerRoutes() {
  return (
    <ReactRouters>
      <Route path='manager/auth'>
        <Route path='admin-login' element={<AdminLoginPage />} />
      </Route>

      <Route path='/manager'>
        <Route index element={<UsersInfoPage />} />
        <Route path='users-info' element={<UsersInfoPage />} />
        <Route path='time-table' element={<TimeTablePage />} />
        <Route path='notice' element={<NoticePage />} />
        <Route path='points' element={<PointsPage />} />
        <Route path='user-prov' element={<UserProvPage />} />
        <Route path='teacher' element={<TeacherPage />} />
      </Route>
    </ReactRouters>
  );
}

export default ManagerRoutes;
