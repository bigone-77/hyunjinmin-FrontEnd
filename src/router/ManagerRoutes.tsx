import { Routes as ReactRouters, Route } from 'react-router-dom';

import UsersInfoPage from '@/pages/Manager/UsersInfo';
import TimeTablePage from '@/pages/Manager/TimeTable';
import NoticePage from '@/pages/Manager/Notice';
import PointsPage from '@/pages/Manager/Points';
import WeekTestPage from '@/pages/Manager/WeekTest';

function ManagerRoutes() {
  return (
    <ReactRouters>
      <Route path='/manager'>
        <Route index element={<UsersInfoPage />} />
        <Route path='usersInfo' element={<UsersInfoPage />} />
        <Route path='timeTable' element={<TimeTablePage />} />
        <Route path='notice' element={<NoticePage />} />
        <Route path='points' element={<PointsPage />} />
        <Route path='weekTest' element={<WeekTestPage />} />
      </Route>
    </ReactRouters>
  );
}

export default ManagerRoutes;
