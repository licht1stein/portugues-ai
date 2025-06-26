# Portuguese AI Language Learning App - Plan

## Overview
A SolidJS-based language learning app focused on Portuguese verb conjugation practice with AI-powered features.

## Core Features

### 1. Settings/Configuration Page
- **Tense Selection** (all Portuguese tenses)
  - Presente
  - Pretérito perfeito simples
  - Pretérito imperfeito
  - Pretérito mais-que-perfeito
  - Futuro do presente
  - Futuro do pretérito
  - Presente do subjuntivo
  - Imperfeito do subjuntivo
  - Futuro do subjuntivo
  
- **Verb Type Filter**
  - Regular verbs only
  - Irregular verbs only
  - Both (mixed practice)

- **Practice Configuration**
  - Number of exercises per session
  - Starting frequency tier (beginner/intermediate/advanced)
  - Progression speed (how quickly to advance to less frequent verbs)

### 2. Practice Component
- **Exercise Format**
  - Fill-in-the-blank sentences
  - AI-generated exercises and translations in real-time
  - Focus on high-frequency Portuguese words
  - Emotionally memorable contexts (dramatic scenarios)
  
- **AI Integration**
  - Generate contextual sentences on-the-fly
  - Provide accurate, contextual translations
  - Adapt difficulty based on user performance
  - Ensure variety while maintaining focus on problem areas
  
- **User Flow**
  1. AI generates sentence with verb blank: "Ela _____ (fazer) tudo para salvar o casamento"
  2. User types conjugated form
  3. Submit answer
  4. Show feedback:
     - If correct: Show AI translation, move to next
     - If incorrect: Show correction, explanation, AI translation
  5. Generate Anki card for mistakes
  6. Track progress

### 3. Feedback System
- **Immediate Correction**
  - Show correct answer
  - Explain why (especially for irregular verbs)
  - Display full conjugation pattern if needed
  
- **Translation Display**
  - Show English translation after each answer
  - Help reinforce meaning with grammar

### 4. Anki Integration
- **Card Generation**
  - Auto-generate cards from mistakes
  - Format: Front (sentence with blank) / Back (answer)
  - Export option for Anki import

### 5. Progress Tracking
- **Session Stats**
  - Correct/incorrect count
  - Accuracy percentage
  - Common mistake patterns
  
- **Long-term Progress**
  - Track performance by tense
  - Track performance by verb type
  - Identify problem areas

### 6. Adaptive Learning Algorithm
- **Error-Based Frequency Adjustment**
  - Track errors per verb/tense combination
  - Increase probability of appearing for problem verbs
  - Implement "cooling period" to avoid repetition
  
- **Smart Selection Algorithm**
  ```javascript
  // Pseudocode for exercise selection
  function selectNextVerb() {
    // Base selection on frequency (most to least frequent)
    // Modified by error rate:
    // - Problem verbs get boosted priority
    // - Successfully mastered verbs progress to next frequency tier
    
    // Algorithm:
    // 1. Start with highest frequency verbs (e.g., ser, ter, fazer)
    // 2. If error rate > 30%, keep in rotation
    // 3. If error rate < 10%, move to next frequency tier
    // 4. Always exclude last 5-10 shown verbs
    // 5. Ensure mix of regular/irregular based on settings
  }
  ```
  
- **Spaced Repetition Light**
  - Problem verbs appear more frequently
  - Successfully answered verbs have reduced frequency
  - Minimum gap between same verb (e.g., 5 exercises)
  - Maximum streak prevention (no more than 2 errors in a row for same verb)

## Technical Architecture

### Data Structure
```javascript
// data/verbs.js
export const verbs = {
  regular: {
    falar: { infinitive: "falar", frequency: 100, /* conjugations */ },
    comer: { infinitive: "comer", frequency: 89, /* conjugations */ }
  },
  irregular: {
    fazer: { infinitive: "fazer", frequency: 15, /* conjugations */ },
    ter: { infinitive: "ter", frequency: 18, /* conjugations */ }
  }
}

// services/ai.js
export async function generateExercise(verb, tense, context) {
  // Call AI API to generate sentence
  const prompt = `Generate a Portuguese sentence using ${verb} in ${tense}...`
  return {
    sentence: "AI generated sentence with _____ blank",
    answer: "correct conjugation",
    translation: "AI generated contextual translation"
  }
}

// No pre-written sentences - all generated dynamically by AI

// stores/practice.js
export const practiceStore = {
  errorTracking: {
    "fazer_preterito_perfeito": { errors: 2, attempts: 3, lastSeen: Date },
    "ter_preterito_perfeito": { errors: 0, attempts: 1, lastSeen: Date }
  },
  recentVerbs: ["fazer", "ter", "estar"], // last 5-10 verbs
  currentStreak: { verb: null, errors: 0 }
}
```

### Component Structure
```
src/
  components/
    Settings.jsx      - Tense and verb type selection
    Practice.jsx      - Main practice interface
    ExerciseCard.jsx  - Individual exercise display
    Feedback.jsx      - Correction and explanation display
    AnkiCard.jsx      - Flashcard display/export
    Progress.jsx      - Statistics and tracking
  
  pages/
    Home.jsx          - Landing page with start button
    Settings.jsx      - Configuration page
    Practice.jsx      - Practice session page
    Results.jsx       - Session results and Anki export
  
  data/
    verbs.js          - Verb database with conjugations
    tenses.js         - Tense rules and patterns
    frequency.js      - Word frequency data
  
  services/
    ai.js             - AI sentence generation and translation
    practice.js       - Exercise selection algorithm
```

### State Management
- Current settings (tense, verb type)
- Session data (exercises, answers, score)
- User progress history
- Generated Anki cards
- Error tracking per verb/tense combination

## MVP Scope
1. Start with most frequently used tenses:
   - Presente (present)
   - Pretérito perfeito simples (simple past)
   - Pretérito imperfeito (imperfect past)
   - Futuro do presente (simple future)
2. Include top 300 most frequent Portuguese verbs (ordered by frequency)
3. Separate tracking for regular vs irregular verbs
4. AI-generated sentences using high-frequency vocabulary
5. Basic Anki export (copy/paste format)
6. Frequency-based progression system

## UI Design Specifications

### Color Scheme
- Background: Dark navy (#1a1f2e to #2d3748)
- Card backgrounds: Slightly lighter (#2d3748)
- Primary accent: Bright blue (#4299e1)
- Success: Green (#48bb78)
- Error: Red (#f56565)
- Text: White/light gray

### Layout Components
1. **Header**
   - Title: "AI Portuguese Verbs"
   - Practice mode indicator with settings icon
   - Score/Streak/Accuracy stats bar

2. **Exercise Card**
   - Sentence with color-coded elements
   - Pronoun in white
   - Incorrect answer in red box
   - Correct answer in green box
   - Verb infinitive in parentheses
   - Rest of sentence in white

3. **Input Section**
   - Large text input with blue border
   - Blue "Enter" button
   - Keyboard shortcuts support

4. **Feedback Panel**
   - Red border for errors
   - "The correct answer is: [answer]" in red
   - Translation in gray italics
   - Keyboard shortcuts reminder

### Interactions
- Enter to submit/continue
- Ctrl+C to copy Anki card
- Focus automatically on input field
- Smooth transitions between exercises

## AI Integration Options

### 1. OpenAI API (Recommended for MVP)
```javascript
// .env
OPENAI_API_KEY=your-key-here

// services/ai.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // For client-side, or use server endpoint
});

export async function generateExercise(verb, tense, errorContext) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "system",
      content: "You are a Portuguese language tutor. Generate dramatic, memorable sentences."
    }, {
      role: "user", 
      content: `Create a Portuguese sentence using "${verb}" in ${tense}. Use high-frequency words. Make it emotional/dramatic.`
    }],
    temperature: 0.8
  });
  
  // Parse response to extract sentence and translation
  return parseAIResponse(response);
}
```

### 2. Anthropic Claude API
```javascript
// Using Claude for more nuanced language understanding
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
```

### 3. Local LLM Options
- **Ollama** - Run models locally (privacy-focused)
- **LM Studio** - Desktop app for local models
- **Browser-based** - WebLLM for in-browser inference

### 4. Hybrid Approach (Recommended)
```javascript
// services/ai.js
class AIService {
  constructor() {
    this.mode = import.meta.env.VITE_AI_MODE || 'openai';
    this.initializeProvider();
  }
  
  async generateExercise(verb, tense, context) {
    switch(this.mode) {
      case 'openai':
        return this.generateWithOpenAI(verb, tense, context);
      case 'anthropic':
        return this.generateWithClaude(verb, tense, context);
      case 'local':
        return this.generateWithLocalLLM(verb, tense, context);
      case 'mock':
        return this.generateMockExercise(verb, tense, context);
    }
  }
}
```

### API Endpoints Structure
```javascript
// Option 1: Direct client-side calls (simpler, less secure)
// Option 2: Backend API proxy (recommended for production)

// api/generate-exercise.js (serverless function)
export async function POST(request) {
  const { verb, tense, context } = await request.json();
  
  // Call AI provider
  const exercise = await aiService.generateExercise(verb, tense, context);
  
  // Cache frequently used combinations
  await cacheExercise(verb, tense, exercise);
  
  return Response.json(exercise);
}
```

### Cost Optimization
1. **Caching Strategy**
   - Cache generated exercises by verb/tense
   - Reuse with slight variations
   - Refresh cache periodically

2. **Batch Generation**
   - Pre-generate exercises during off-peak
   - Store in database for quick access

3. **Model Selection**
   - GPT-3.5 for simple sentences
   - GPT-4 for complex/subjunctive moods
   - Local models for offline mode

## Future Enhancements
- Enhanced spaced repetition algorithm
- User accounts and cloud sync
- Mobile app version
- Export progress statistics
- Custom verb lists
- Difficulty progression system
- Phrase and expression practice
- Subjunctive mood focus mode