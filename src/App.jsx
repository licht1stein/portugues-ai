import { Route } from '@solidjs/router';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Practice from './pages/Practice';
import Results from './pages/Results';

function App() {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/settings" component={Settings} />
      <Route path="/practice" component={Practice} />
      <Route path="/results" component={Results} />
    </>
  );
}

export default App;