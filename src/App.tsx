import Routes from '@/router/Routes';

import { mobilScreen } from '@/styles/screen';

function App() {
  return (
    <div className={`${mobilScreen}`}>
      <Routes />
    </div>
  );
}

export default App;
