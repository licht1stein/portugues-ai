import { useNavigate } from '@solidjs/router';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div class="home-container">
      <div class="hero">
        <h1>Portuguese with Myke</h1>
        <p class="tagline">Master Portuguese verb conjugations with AI-generated practice</p>
        
        <button class="cta-button" onClick={() => navigate('/settings')}>
          Start Learning
        </button>
        
        <div class="features">
          <div class="feature">
            <div class="feature-icon">📚</div>
            <h3>300 Most Common Verbs</h3>
            <p>Learn the verbs that matter most</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🤖</div>
            <h3>AI-Generated Exercises</h3>
            <p>Unique, contextual sentences every time</p>
          </div>
          <div class="feature">
            <div class="feature-icon">📈</div>
            <h3>Adaptive Learning</h3>
            <p>Focus on verbs you struggle with</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🔒</div>
            <h3>100% Private</h3>
            <p>Runs entirely in your browser. No servers, no tracking.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;