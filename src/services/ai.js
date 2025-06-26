// AI service for generating exercises and translations
// Supports multiple providers with fallback
import { getConjugation } from '../data/loadVerbs';

// Get API key from localStorage
const getApiKey = () => localStorage.getItem('openai_api_key');

// Determine if we should use AI mode based on API key availability
const isAiEnabled = () => !!getApiKey();

// Pronouns for sentence generation (excluding vós - not commonly used)
const pronouns = ['eu', 'tu', 'ele', 'ela', 'nós', 'vocês', 'eles', 'elas'];
const pronounMap = {
  'eu': 'eu',
  'tu': 'tu', 
  'ele': 'ele',
  'ela': 'ele', // ela uses same conjugation as ele
  'nós': 'nós',
  'vocês': 'eles', // vocês uses 3rd person plural conjugation
  'eles': 'eles',
  'elas': 'eles' // elas uses same conjugation as eles
};

// Mock data for development - emotionally charged sentences
const mockTemplates = [
  {
    template: "{pronoun} _____ ({verb}) o amante secreto.",
    contexts: ["esconder", "encontrar", "beijar", "desejar"]
  },
  {
    template: "{pronoun} _____ ({verb}) com ciúmes doentios.",
    contexts: ["sofrer", "viver", "morrer", "lutar"]
  },
  {
    template: "{pronoun} _____ ({verb}) a traição dele.",
    contexts: ["descobrir", "esconder", "revelar", "planear"]
  },
  {
    template: "{pronoun} _____ ({verb}) vingança no escuro.",
    contexts: ["preparar", "querer", "executar", "sonhar"]
  },
  {
    template: "{pronoun} _____ ({verb}) os segredos proibidos.",
    contexts: ["guardar", "revelar", "descobrir", "escrever"]
  },
  {
    template: "{pronoun} _____ ({verb}) pelo poder absoluto.",
    contexts: ["lutar", "matar", "vender", "sacrificar"]
  },
  {
    template: "{pronoun} _____ ({verb}) na cama alheia.",
    contexts: ["dormir", "acordar", "chorar", "morrer"]
  },
  {
    template: "{pronoun} _____ ({verb}) o corpo no porão.",
    contexts: ["esconder", "encontrar", "enterrar", "queimar"]
  }
];

// Generate mock exercise
function generateMockExercise(verb, tense) {
  const template = mockTemplates[Math.floor(Math.random() * mockTemplates.length)];
  const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
  const pronounKey = pronounMap[pronoun];
  
  // Get the answer from conjugation
  const answer = getConjugation(verb.infinitive, tense, pronounKey);
  
  const sentence = template.template
    .replace('{pronoun}', pronoun.charAt(0).toUpperCase() + pronoun.slice(1))
    .replace('{verb}', verb.infinitive);
  
  // Create a more interesting translation based on the template
  const translations = {
    "o amante secreto": "the secret lover",
    "com ciúmes doentios": "with sick jealousy",
    "a traição dele": "his betrayal",
    "vingança no escuro": "revenge in the dark",
    "os segredos proibidos": "the forbidden secrets",
    "pelo poder absoluto": "for absolute power",
    "na cama alheia": "in someone else's bed",
    "o corpo no porão": "the body in the basement"
  };
  
  const contextPhrase = template.template.split('_____')[1].replace(' ({verb})', '').trim();
  const translation = translations[contextPhrase] || "something dark";
  
  return {
    sentence,
    verb: verb.infinitive,
    answer: answer || 'conjugação',
    translation: `${pronoun} ${answer} ${translation}`,
    infinitive: verb.infinitive,
    pronoun: pronounKey
  };
}

// Generate exercise using OpenAI
async function generateWithOpenAI(verb, tense) {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn('OpenAI API key not found, falling back to mock');
    return generateMockExercise(verb, tense);
  }
  
  const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
  const pronounKey = pronounMap[pronoun];
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a Portuguese language tutor creating emotionally charged, provocative fill-in-the-blank exercises.

TASK: Create a SHORT sentence (5-8 words) where the student must conjugate the verb "${verb.infinitive}" for pronoun "${pronoun}" in ${tense}.

TONE: Use dark, intense, emotionally loaded themes like:
- Forbidden desires and secret affairs
- Betrayal, jealousy, and revenge
- Obsession and dangerous attraction
- Power dynamics and manipulation
- Existential crises and dark thoughts
- Scandalous confessions
- Morally ambiguous situations

FORMAT RULES:
1. Put _____ where the conjugated verb goes
2. IMMEDIATELY after _____ put (${verb.infinitive}) in parentheses
3. The blank must be where the verb naturally belongs in the sentence
4. Keep it edgy but educational

EXAMPLES of the tone you should aim for:
- "Ela _____ (trair) o marido ontem."
- "Nós _____ (esconder) corpos no porão."
- "Tu _____ (desejar) a tua cunhada."
- "Eles _____ (mentir) sobre o assassinato."

Return JSON with:
{
  "sentence": "The sentence with _____ (${verb.infinitive}) format",
  "answer": "The conjugated form",
  "translation": "English translation"
}`
          },
          {
            role: 'user',
            content: `Generate exercise for verb "${verb.infinitive}" with pronoun "${pronoun}" in ${tense}`
          }
        ],
        temperature: 0.7
      })
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        // Invalid API key - clear it and notify
        localStorage.removeItem('openai_api_key');
        throw new Error('Invalid API key. Please add a valid key in settings.');
      }
      throw new Error('OpenAI API request failed');
    }
    
    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);
    
    // Validate that the sentence has the correct format
    if (!result.sentence.includes(`_____ (${verb.infinitive})`)) {
      console.warn('AI generated invalid format, falling back to mock');
      return generateMockExercise(verb, tense);
    }
    
    return {
      sentence: result.sentence,
      verb: verb.infinitive,
      answer: result.answer,
      translation: result.translation,
      infinitive: verb.infinitive,
      pronoun: pronounKey
    };
  } catch (error) {
    console.error('OpenAI generation failed:', error);
    return generateMockExercise(verb, tense);
  }
}

// Main export function
export async function generateExercise(verb, tense, forceOffline = false) {
  // Check if AI should be used (key exists AND not forced offline)
  if (isAiEnabled() && !forceOffline) {
    return generateWithOpenAI(verb, tense);
  } else {
    return generateMockExercise(verb, tense);
  }
}

// Generate translation for a sentence
export async function translateSentence(sentence) {
  const apiKey = getApiKey();
  if (apiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Translate this Portuguese sentence to English accurately and naturally.'
            },
            {
              role: 'user',
              content: sentence
            }
          ],
          temperature: 0.3
        })
      });
      
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Translation failed:', error);
    }
  }
  
  return "AI would translate this sentence contextually and accurately.";
}