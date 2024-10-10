import { useLocation } from 'react-router-dom';
import ManagerRoutes from '@/router/ManagerRoutes';
import Routes from '@/router/Routes';
import { mobilScreen } from '@/styles/screen';

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
    </div>
  );
}

export default App;
