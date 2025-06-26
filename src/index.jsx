import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import App from './App';
import './index.css';
import { loadVerbs } from './data/loadVerbs';

// Load verbs data on startup
loadVerbs().then(() => {
  console.log('Verbs loaded successfully');
});

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root')
);