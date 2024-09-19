import Routes from '@/router/Routes';
import { flexCenter } from '@/styles/flex';
import { mobilScreen } from '@/styles/screen';

function App() {
  return (
    <div className={`${mobilScreen} ${flexCenter} bg-green`}>
      <Routes />
    </div>
  );
}

export default App;
