import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import '../styles/Settings.css';

function Settings() {
  const navigate = useNavigate();
  
  // Default settings
  const [selectedTense, setSelectedTense] = createSignal('preteritoPerfeito');
  const [verbType, setVerbType] = createSignal('both');
  const [sessionLength, setSessionLength] = createSignal(20);
  const [difficulty, setDifficulty] = createSignal('beginner');

  const tenses = [
    { id: 'presente', name: 'Presente', example: 'eu falo' },
    { id: 'preteritoPerfeito', name: 'Pretérito Perfeito', example: 'eu falei' },
    { id: 'preteritoImperfeito', name: 'Pretérito Imperfeito', example: 'eu falava' },
    { id: 'futuroPresente', name: 'Futuro', example: 'eu falarei' }
  ];

  const handleStartPractice = () => {
    // Save settings to session storage
    const settings = {
      tense: selectedTense(),
      verbType: verbType(),
      sessionLength: sessionLength(),
      difficulty: difficulty()
    };
    sessionStorage.setItem('practiceSettings', JSON.stringify(settings));
    
    // Navigate to practice page
    navigate('/practice');
  };

  return (
    <div class="settings-container">
      <h1>Configure Your Practice</h1>
      
      <div class="settings-section">
        <h2>Select Tense</h2>
        <div class="tense-grid">
          {tenses.map(tense => (
            <button
              class={`tense-button ${selectedTense() === tense.id ? 'selected' : ''}`}
              onClick={() => setSelectedTense(tense.id)}
            >
              <div class="tense-name">{tense.name}</div>
              <div class="tense-example">{tense.example}</div>
            </button>
          ))}
        </div>
      </div>

      <div class="settings-section">
        <h2>Verb Type</h2>
        <div class="verb-type-buttons">
          <button
            class={`option-button ${verbType() === 'regular' ? 'selected' : ''}`}
            onClick={() => setVerbType('regular')}
          >
            Regular Only
          </button>
          <button
            class={`option-button ${verbType() === 'irregular' ? 'selected' : ''}`}
            onClick={() => setVerbType('irregular')}
          >
            Irregular Only
          </button>
          <button
            class={`option-button ${verbType() === 'both' ? 'selected' : ''}`}
            onClick={() => setVerbType('both')}
          >
            Both
          </button>
        </div>
      </div>

      <div class="settings-section">
        <h2>Session Length</h2>
        <div class="session-length">
          <input
            type="range"
            min="10"
            max="50"
            step="5"
            value={sessionLength()}
            onInput={(e) => setSessionLength(parseInt(e.target.value))}
          />
          <span class="session-value">{sessionLength()} exercises</span>
        </div>
      </div>

      <div class="settings-section">
        <h2>Starting Level</h2>
        <div class="difficulty-buttons">
          <button
            class={`option-button ${difficulty() === 'beginner' ? 'selected' : ''}`}
            onClick={() => setDifficulty('beginner')}
          >
            Beginner
            <span class="difficulty-desc">Top 100 verbs</span>
          </button>
          <button
            class={`option-button ${difficulty() === 'intermediate' ? 'selected' : ''}`}
            onClick={() => setDifficulty('intermediate')}
          >
            Intermediate
            <span class="difficulty-desc">Top 200 verbs</span>
          </button>
          <button
            class={`option-button ${difficulty() === 'advanced' ? 'selected' : ''}`}
            onClick={() => setDifficulty('advanced')}
          >
            Advanced
            <span class="difficulty-desc">All 300 verbs</span>
          </button>
        </div>
      </div>

      <button class="start-button" onClick={handleStartPractice}>
        Start Practice
      </button>
    </div>
  );
}

export default Settings;