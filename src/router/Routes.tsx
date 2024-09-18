import { Routes as ReactRouters, Route } from 'react-router-dom';

import Navbar from '@shared/Navbar';

import HomePage from '@pages/Home';

function Routes() {
  return (
    <ReactRouters>
      <Route path='/' element={<Navbar />}>
        <Route index element={<HomePage />} />
      </Route>
    </ReactRouters>
  );
}

export default Routes;
