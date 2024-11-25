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

function Routes() {
  return (
    <ReactRouters>
      <Route path='/auth'>
        <Route path='login' element={<LoginPage />} />
        <Route path='siginup' element={<SiginupPage />} />
        <Route path='resetPassword' element={<ResetPasswordPage />} />
      </Route>

      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='timeBoard' element={<TimeBoardPage />} />
        <Route path='board' element={<BoardPage />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='profile' element={<ProfilePage />} />
      </Route>
    </ReactRouters>
  );
}

export default Routes;
