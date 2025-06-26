import { createSignal, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import '../styles/Settings.css';

function Settings() {
  const navigate = useNavigate();
  
  // Default settings
  const [selectedTense, setSelectedTense] = createSignal('preteritoPerfeito');
  const [verbType, setVerbType] = createSignal('both');
  const [sessionLength, setSessionLength] = createSignal(20);
  const [isInfiniteSession, setIsInfiniteSession] = createSignal(false);
  const [difficulty, setDifficulty] = createSignal('beginner');
  const [apiKey, setApiKey] = createSignal('');
  const [showApiKey, setShowApiKey] = createSignal(false);
  
  // Load API key from localStorage on mount
  onMount(() => {
    const savedApiKey = localStorage.getItem('openai_api_key') || '';
    setApiKey(savedApiKey);
  });
  
  // Save API key to localStorage
  const handleApiKeyChange = (value) => {
    setApiKey(value);
    if (value) {
      localStorage.setItem('openai_api_key', value);
    } else {
      localStorage.removeItem('openai_api_key');
    }
  };

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
      sessionLength: isInfiniteSession() ? Infinity : sessionLength(),
      difficulty: difficulty()
    };
    sessionStorage.setItem('practiceSettings', JSON.stringify(settings));
    
    // Navigate to practice page
    navigate('/practice');
  };

  return (
    <div class="settings-container">
      <h1>Configure Your Practice</h1>
      
      <button class="start-button" onClick={handleStartPractice}>
        Start Practice
      </button>
      
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
            min="20"
            max="150"
            step="10"
            value={sessionLength()}
            onInput={(e) => setSessionLength(parseInt(e.target.value))}
            disabled={isInfiniteSession()}
          />
          <span class="session-value">
            {isInfiniteSession() ? '∞ Infinite' : `${sessionLength()} exercises`}
          </span>
          <label class="infinite-checkbox">
            <input
              type="checkbox"
              checked={isInfiniteSession()}
              onChange={(e) => setIsInfiniteSession(e.target.checked)}
            />
            <span>Infinite session</span>
          </label>
        </div>
      </div>

      <div class="settings-section">
        <h2>Difficulty Level</h2>
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
            <span class="difficulty-desc">Top 250 verbs</span>
          </button>
          <button
            class={`option-button ${difficulty() === 'advanced' ? 'selected' : ''}`}
            onClick={() => setDifficulty('advanced')}
          >
            Advanced
            <span class="difficulty-desc">Top 500 verbs</span>
          </button>
          <button
            class={`option-button ${difficulty() === 'expert' ? 'selected' : ''}`}
            onClick={() => setDifficulty('expert')}
          >
            Expert
            <span class="difficulty-desc">All 1000 verbs</span>
          </button>
        </div>
      </div>

      <div class="settings-section">
        <h2>OpenAI API Key</h2>
        <p class="section-description">
          Add your OpenAI API key to generate dynamic, contextual sentences. Without it, the app uses pre-defined templates.
          <br /><br />
          🔒 <strong>Privacy:</strong> This app runs entirely in your browser. Your key is stored only on this device.
        </p>
        <div class="api-key-section">
          {apiKey() ? (
            <>
              <div class="api-key-status-card">
                <div class="status-info">
                  <span class="status-active">✓ API Key Configured</span>
                  <p class="status-description">
                    You can switch between AI and Offline modes using the toggle in the practice screen.
                  </p>
                </div>
                <button
                  class="delete-key-button"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete your API key?')) {
                      handleApiKeyChange('');
                    }
                  }}
                >
                  Delete Key
                </button>
              </div>
            </>
          ) : (
            <>
              <div class="api-key-input-wrapper">
                <input
                  type={showApiKey() ? "text" : "password"}
                  class="api-key-input"
                  placeholder="sk-..."
                  value={apiKey()}
                  onInput={(e) => handleApiKeyChange(e.target.value)}
                />
                <button
                  class="toggle-visibility"
                  onClick={() => setShowApiKey(!showApiKey())}
                >
                  {showApiKey() ? '🙈' : '👁️'}
                </button>
              </div>
              <div class="api-key-status">
                <span class="status-inactive">No API Key - Offline Mode Only</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;