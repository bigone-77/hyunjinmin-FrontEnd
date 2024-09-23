import { Routes as ReactRouters, Route } from 'react-router-dom';

import Navbar from '@/components/shared/Navbar';

import HomePage from '@/pages/Home';

import LoginPage from '@/pages/auth/Login';

function Routes() {
  return (
    <ReactRouters>
      <Route path='/' element={<Navbar />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route path='/auth'>
        <Route path='login' element={<LoginPage />} />
      </Route>
    </ReactRouters>
  );
}

export default Routes;
