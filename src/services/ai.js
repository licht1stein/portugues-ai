// AI service for generating exercises and translations
// Supports multiple providers with fallback
import { getConjugation } from '../data/loadVerbs';

const AI_MODE = import.meta.env.VITE_AI_MODE || 'mock';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Pronouns for sentence generation (excluding vós - not commonly used)
const pronouns = ['eu', 'tu', 'ele/ela', 'nós', 'vocês', 'eles/elas'];
const pronounMap = {
  'eu': 'eu',
  'tu': 'tu', 
  'ele/ela': 'ele',
  'nós': 'nós',
  'vocês': 'eles', // vocês uses 3rd person plural conjugation
  'eles/elas': 'eles'
};

// Mock data for development - SHORT sentences
const mockTemplates = [
  {
    template: "{pronoun} _____ ({verb}) tudo.",
    contexts: ["perder", "fazer", "saber", "querer"]
  },
  {
    template: "{pronoun} _____ ({verb}) muito tarde.",
    contexts: ["chegar", "acordar", "voltar", "sair"]
  },
  {
    template: "{pronoun} _____ ({verb}) a verdade.",
    contexts: ["dizer", "saber", "esconder", "descobrir"]
  },
  {
    template: "{pronoun} _____ ({verb}) sem medo.",
    contexts: ["viver", "falar", "lutar", "continuar"]
  },
  {
    template: "{pronoun} _____ ({verb}) o dinheiro.",
    contexts: ["perder", "encontrar", "gastar", "esconder"]
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
  
  return {
    sentence,
    verb: verb.infinitive,
    answer: answer || 'conjugação',
    translation: `${pronoun} ${answer} something scandalous.`,
    infinitive: verb.infinitive,
    pronoun: pronounKey
  };
}

// Generate exercise using OpenAI
async function generateWithOpenAI(verb, tense) {
  if (!OPENAI_API_KEY) {
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
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a Portuguese language tutor creating fill-in-the-blank exercises.

TASK: Create a SHORT sentence (5-8 words) where the student must conjugate the verb "${verb.infinitive}" for pronoun "${pronoun}" in ${tense}.

FORMAT RULES:
1. Put _____ where the conjugated verb goes
2. IMMEDIATELY after _____ put (${verb.infinitive}) in parentheses
3. The blank must be where the verb naturally belongs in the sentence

CORRECT examples:
- "Ela _____ (fazer) tudo ontem."
- "Nós _____ (ser) muito felizes."
- "Eles _____ (ter) um segredo."

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
export async function generateExercise(verb, tense) {
  switch(AI_MODE) {
    case 'openai':
      return generateWithOpenAI(verb, tense);
    case 'mock':
    default:
      return generateMockExercise(verb, tense);
  }
}

// Generate translation for a sentence
export async function translateSentence(sentence) {
  if (AI_MODE === 'openai' && OPENAI_API_KEY) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
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