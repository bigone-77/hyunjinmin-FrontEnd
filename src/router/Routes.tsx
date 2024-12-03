import { Routes as ReactRouters, Route } from 'react-router-dom';

import Layout from '@/layout';

import LoginPage from '@/pages/auth/Login';

import HomePage from '@/pages/Home';
import TimeBoardPage from '@/pages/TimeBoard';
import BoardPage from '@/pages/Board';
import ProfilePage from '@/pages/Profile';
import PostPage from '@/pages/Post';
import SiginupPage from '@/pages/auth/Siginup';
import ResetPasswordPage from '@/pages/auth/ResetPassword';
import MyInfoPage from '@/pages/MyInfo';
import ChangeInfoPage from '@/pages/ChangeInfo';

function Routes() {
  return (
    <ReactRouters>
      <Route path='/auth'>
        <Route path='login' element={<LoginPage />} />
        <Route path='siginup' element={<SiginupPage />} />
        <Route path='reset-password' element={<ResetPasswordPage />} />
      </Route>

      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='time-board' element={<TimeBoardPage />} />
        <Route path='board' element={<BoardPage />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='account' element={<MyInfoPage />} />
        <Route path='change-info' element={<ChangeInfoPage />} />
      </Route>
    </ReactRouters>
  );
}

export default Routes;
