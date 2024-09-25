import { Routes as ReactRouters, Route } from 'react-router-dom';

import Layout from '@/layout';

import HomePage from '@/pages/Home';

import LoginPage from '@/pages/auth/Login';

function Routes() {
  return (
    <ReactRouters>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route path='/auth'>
        <Route path='login' element={<LoginPage />} />
      </Route>
    </ReactRouters>
  );
}

export default Routes;
