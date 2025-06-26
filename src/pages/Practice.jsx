import { createSignal, createEffect, onMount, onCleanup } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import ExerciseCard from '../components/ExerciseCard';
import Feedback from '../components/Feedback';
import ProgressBar from '../components/ProgressBar';
import '../styles/Practice.css';
import { generateExercise } from '../services/ai';
import { selectNextVerb } from '../services/practice';
import { ensureVerbsLoaded } from '../data/loadVerbs';

function Practice() {
  const navigate = useNavigate();
  
  // Get settings from session storage
  const settings = JSON.parse(sessionStorage.getItem('practiceSettings') || '{}');
  
  if (!settings.tense) {
    navigate('/settings');
    return null;
  }
  
  // Practice state
  const [currentExercise, setCurrentExercise] = createSignal(null);
  const [userAnswer, setUserAnswer] = createSignal('');
  const [showFeedback, setShowFeedback] = createSignal(false);
  const [isCorrect, setIsCorrect] = createSignal(false);
  const [loading, setLoading] = createSignal(true);
  
  // Session stats
  const [exerciseCount, setExerciseCount] = createSignal(0);
  const [correctCount, setCorrectCount] = createSignal(0);
  const [streak, setStreak] = createSignal(0);
  const [ankiCards, setAnkiCards] = createSignal([]);
  
  // Load next exercise
  const loadNextExercise = async () => {
    setLoading(true);
    setShowFeedback(false);
    setUserAnswer('');
    
    try {
      const nextVerb = selectNextVerb(settings);
      console.log('Selected verb:', nextVerb);
      
      if (!nextVerb) {
        throw new Error('No verb selected');
      }
      
      // Pass the current mode state to generateExercise
      const exercise = await generateExercise(nextVerb, settings.tense, !isAiEnabled());
      console.log('Generated exercise:', exercise);
      setCurrentExercise(exercise);
    } catch (error) {
      console.error('Failed to generate exercise:', error);
      
      // Check if it's an API key error
      if (error.message && error.message.includes('Invalid API key')) {
        setIsAiEnabled(false);
        setApiKeyInvalidNotice(true);
        setTimeout(() => setApiKeyInvalidNotice(false), 5000);
        // Generate using mock mode instead
        const mockExercise = await generateExercise(nextVerb, settings.tense, true);
        setCurrentExercise(mockExercise);
      } else {
        // Other errors - use fallback
        setCurrentExercise({
          sentence: "Ele _____ (fazer) tudo para salvar o casamento.",
          verb: "fazer",
          answer: "fez",
          translation: "He did everything to save the marriage.",
          infinitive: "fazer"
        });
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Check answer
  const checkAnswer = () => {
    const correct = userAnswer().toLowerCase().trim() === currentExercise().answer.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Update stats
    setExerciseCount(exerciseCount() + 1);
    if (correct) {
      setCorrectCount(correctCount() + 1);
      setStreak(streak() + 1);
    } else {
      setStreak(0);
      // Add to Anki cards
      const card = {
        front: currentExercise().sentence,
        back: currentExercise().answer,
        translation: currentExercise().translation
      };
      setAnkiCards([...ankiCards(), card]);
    }
    
    // Update error tracking
    const errorTracking = JSON.parse(localStorage.getItem('errorTracking') || '{}');
    const key = `${currentExercise().verb}_${settings.tense}`;
    
    if (!errorTracking[key]) {
      errorTracking[key] = { errors: 0, attempts: 0, lastSeen: Date.now() };
    }
    
    errorTracking[key].attempts++;
    if (!correct) {
      errorTracking[key].errors++;
    }
    errorTracking[key].lastSeen = Date.now();
    
    localStorage.setItem('errorTracking', JSON.stringify(errorTracking));
  };
  
  // Handle enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (!showFeedback()) {
        checkAnswer();
      }
    }
  };
  
  // Handle continue after feedback
  const handleContinue = () => {
    if (settings.sessionLength === Infinity || exerciseCount() < settings.sessionLength) {
      loadNextExercise();
    } else {
      // Save session results
      const results = {
        correct: correctCount(),
        total: exerciseCount(),
        accuracy: accuracy(),
        ankiCards: ankiCards()
      };
      sessionStorage.setItem('practiceResults', JSON.stringify(results));
      navigate('/results');
    }
  };
  
  // Initialize
  onMount(async () => {
    await ensureVerbsLoaded();
    loadNextExercise();
    
    // No global handler needed anymore
  });
  
  // Calculate accuracy
  const accuracy = () => {
    if (exerciseCount() === 0) return 0;
    return Math.round((correctCount() / exerciseCount()) * 100);
  };
  
  // Format tense name properly
  const tenseDisplayNames = {
    'presente': 'Presente',
    'preteritoPerfeito': 'Pretérito Perfeito',
    'preteritoImperfeito': 'Pretérito Imperfeito',
    'futuro': 'Futuro do Presente'
  };
  
  const verbTypeDisplay = {
    'regular': 'Regular',
    'irregular': 'Irregular',
    'both': 'All'
  };
  
  // Get verb count based on difficulty
  const getVerbCount = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return 100;
      case 'intermediate': return 250;
      case 'advanced': return 500;
      case 'expert': return 1000;
      default: return 100;
    }
  };
  
  const verbCount = getVerbCount(settings.difficulty || 'beginner');
  const sessionLength = settings.sessionLength === Infinity ? '∞' : settings.sessionLength;
  
  // AI mode state
  const [isAiEnabled, setIsAiEnabled] = createSignal(!!localStorage.getItem('openai_api_key'));
  const [showApiKeyModal, setShowApiKeyModal] = createSignal(false);
  const [tempApiKey, setTempApiKey] = createSignal('');
  const [apiKeyInvalidNotice, setApiKeyInvalidNotice] = createSignal(false);
  
  // Toggle AI mode
  const toggleAiMode = (e) => {
    const existingKey = localStorage.getItem('openai_api_key');
    
    if (isAiEnabled()) {
      // Switching to offline mode (but keeping the key)
      setIsAiEnabled(false);
    } else {
      // Switching to AI mode
      if (existingKey) {
        setIsAiEnabled(true);
      } else {
        // No key available, show modal
        e.preventDefault();
        e.target.checked = false;
        setShowApiKeyModal(true);
      }
    }
  };
  
  // Save API key from modal
  const [validatingKey, setValidatingKey] = createSignal(false);
  const [keyError, setKeyError] = createSignal('');
  
  const validateApiKey = async (key) => {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${key}`
        }
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };
  
  const saveApiKey = async () => {
    if (!tempApiKey()) return;
    
    setValidatingKey(true);
    setKeyError('');
    
    const isValid = await validateApiKey(tempApiKey());
    
    if (isValid) {
      localStorage.setItem('openai_api_key', tempApiKey());
      setIsAiEnabled(true);
      setShowApiKeyModal(false);
      setTempApiKey('');
    } else {
      setKeyError('Invalid API key. Please check and try again.');
    }
    
    setValidatingKey(false);
  };

  return (
    <div class="practice-container">
      <div class="practice-header">
        <div class="practice-mode">
          <div>
            <span class="tense-name">{tenseDisplayNames[settings.tense] || settings.tense}</span>
          </div>
          <div class="right-controls">
            <div class="mode-toggle-container">
              <span class="mode-label offline">Offline</span>
              <label class="mode-toggle">
                <input
                  type="checkbox"
                  checked={isAiEnabled()}
                  onChange={toggleAiMode}
                />
                <span class="toggle-slider"></span>
              </label>
              <span class="mode-label ai">AI</span>
            </div>
            <button class="settings-icon" onClick={() => navigate('/settings')}>⚙️</button>
          </div>
        </div>
        
        <div class="stats-bar">
          <div class="stat">
            <span class="stat-label">Score:</span>
            <span class="stat-value">{correctCount()}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Streak:</span>
            <span class="stat-value">{streak()}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Accuracy:</span>
            <span class="stat-value">{accuracy()}%</span>
          </div>
        </div>
        
        <div class="mode-info">
          <span class="mode-detail">{verbCount} verbs</span>
          <span class="mode-separator">•</span>
          <span class="mode-detail">{sessionLength} exercises</span>
        </div>
      </div>
      
      <ProgressBar current={exerciseCount()} total={settings.sessionLength} />
      
      <div class="practice-content">
        {loading() ? (
          <div class="loading">Generating exercise...</div>
        ) : (
          <>
            <ExerciseCard
              exercise={currentExercise()}
              userAnswer={userAnswer()}
              setUserAnswer={setUserAnswer}
              showFeedback={showFeedback()}
              isCorrect={isCorrect()}
              onSubmit={checkAnswer}
              onKeyDown={handleKeyPress}
            />
            
            {showFeedback() && (
              <Feedback
                exercise={currentExercise()}
                userAnswer={userAnswer()}
                isCorrect={isCorrect()}
                onContinue={handleContinue}
              />
            )}
          </>
        )}
      </div>
      
      {/* API Key Modal */}
      {showApiKeyModal() && (
        <div class="modal-overlay" onClick={() => {
          setShowApiKeyModal(false);
          setTempApiKey('');
        }}>
          <div class="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Enable AI Mode</h2>
            <p>Enter your OpenAI API key to generate dynamic, contextual exercises.</p>
            <p class="api-key-help">
              Don't have an API key? <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">Get one here →</a>
            </p>
            <input
              type="password"
              class={`api-key-modal-input ${keyError() ? 'error' : ''}`}
              placeholder="sk-..."
              value={tempApiKey()}
              onInput={(e) => {
                setTempApiKey(e.target.value);
                setKeyError('');
              }}
              onKeyDown={(e) => e.key === 'Enter' && !validatingKey() && saveApiKey()}
            />
            {keyError() && (
              <p class="error-message">{keyError()}</p>
            )}
            <div class="modal-actions">
              <button class="modal-cancel" onClick={() => {
                setShowApiKeyModal(false);
                setTempApiKey('');
                setKeyError('');
              }}>
                Cancel
              </button>
              <button 
                class="modal-save" 
                onClick={saveApiKey}
                disabled={!tempApiKey() || validatingKey()}
              >
                {validatingKey() ? 'Validating...' : 'Enable AI'}
              </button>
            </div>
            <div class="privacy-notice">
              <p class="modal-note">
                🔒 <strong>100% Private:</strong> This app runs entirely in your browser. Your API key is stored only on this device and is never sent to our servers (we don't have any!). The key is only used to communicate directly with OpenAI.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* API Key Invalid Notification */}
      {apiKeyInvalidNotice() && (
        <div class="notification error">
          Invalid API key detected. Switched to offline mode. Please update your key in settings.
        </div>
      )}
    </div>
  );
}

export default Practice;