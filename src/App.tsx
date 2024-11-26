import { useLocation } from 'react-router-dom';

import ManagerRoutes from '@/router/ManagerRoutes';
import Routes from '@/router/Routes';
import { mobilScreen } from '@/styles/screen';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  const location = useLocation();
  const isManagerPage = location.pathname.startsWith('/manager');

  return (
    <div>
      {isManagerPage ? (
        <div>
          <ManagerRoutes />
        </div>
      ) : (
        <div className={`${mobilScreen}`}>
          <Routes />
        </div>
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default App;
