import { useNavigate } from '@solidjs/router';
import { onMount, createSignal } from 'solid-js';
import '../styles/Results.css';

function Results() {
  const navigate = useNavigate();
  const [results, setResults] = createSignal(null);
  const [ankiText, setAnkiText] = createSignal('');
  
  onMount(() => {
    const sessionResults = sessionStorage.getItem('practiceResults');
    if (!sessionResults) {
      navigate('/');
      return;
    }
    
    const data = JSON.parse(sessionResults);
    setResults(data);
    
    // Generate Anki text in org-mode format
    if (data.ankiCards && data.ankiCards.length > 0) {
      const ankiContent = data.ankiCards
        .map(card => `#+begin_anki :deck Portugues :type Basic
  * Front
    ${card.front}
  * Back
    ${card.back}
#+end_anki`)
        .join('\n\n');
      setAnkiText(ankiContent);
    }
  });
  
  const handleCopyAnki = () => {
    navigator.clipboard.writeText(ankiText());
    alert('Anki cards copied to clipboard!');
  };
  
  const handleNewSession = () => {
    sessionStorage.removeItem('practiceResults');
    navigate('/settings');
  };
  
  const handleContinuePractice = () => {
    sessionStorage.removeItem('practiceResults');
    navigate('/practice');
  };
  
  if (!results()) return null;
  
  return (
    <div class="results-container">
      <h1>Practice Complete!</h1>
      
      <div class="results-summary">
        <div class="result-stat">
          <div class="stat-number">{results().correct}</div>
          <div class="stat-label">Correct</div>
        </div>
        <div class="result-stat">
          <div class="stat-number">{results().total}</div>
          <div class="stat-label">Total</div>
        </div>
        <div class="result-stat">
          <div class="stat-number">{results().accuracy}%</div>
          <div class="stat-label">Accuracy</div>
        </div>
      </div>
      
      {ankiText() && (
        <div class="anki-section">
          <h2>Anki Cards from Mistakes</h2>
          <p class="anki-help">
            Copy these cards and import them into Anki to practice your mistakes
          </p>
          <textarea 
            class="anki-textarea" 
            value={ankiText()} 
            readOnly
            rows={Math.min(10, results().ankiCards.length * 2)}
          />
          <button class="copy-button" onClick={handleCopyAnki}>
            Copy to Clipboard
          </button>
        </div>
      )}
      
      <div class="action-buttons">
        <button class="secondary-button" onClick={handleNewSession}>
          New Session
        </button>
        <button class="primary-button" onClick={handleContinuePractice}>
          Continue Practice
        </button>
      </div>
    </div>
  );
}

export default Results;