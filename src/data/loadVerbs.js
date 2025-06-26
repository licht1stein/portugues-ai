// Load and process verbs from CSV
import { conjugateVerb } from './verbConjugations';

let verbsData = [];

// Parse CSV data
export async function loadVerbs() {
  try {
    const response = await fetch('/verbs.csv');
    const csvText = await response.text();
    
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    verbsData = lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.split(',');
        return {
          infinitive: values[0],
          frequency: parseInt(values[1]),
          type: values[2],
          translation: values[3]
        };
      });
    
    return verbsData;
  } catch (error) {
    console.error('Failed to load verbs:', error);
    return [];
  }
}

// Get all verbs
export function getAllVerbs() {
  return verbsData;
}

// Get verbs by type
export function getVerbsByType(type) {
  if (type === 'both') return verbsData;
  return verbsData.filter(verb => verb.type === type);
}

// Get verbs by frequency range
export function getVerbsByFrequencyRange(start, end) {
  return verbsData.filter(verb => verb.frequency >= start && verb.frequency <= end);
}

// Get verbs by difficulty
export function getVerbsByDifficulty(difficulty) {
  switch(difficulty) {
    case 'beginner':
      return getVerbsByFrequencyRange(1, 100);
    case 'intermediate':
      return getVerbsByFrequencyRange(1, 200);
    case 'advanced':
      return verbsData;
    default:
      return verbsData;
  }
}

// Get specific verb
export function getVerb(infinitive) {
  return verbsData.find(verb => verb.infinitive === infinitive);
}

// Get conjugation for a verb
export function getConjugation(infinitive, tense, person) {
  const verb = getVerb(infinitive);
  if (!verb) return null;
  
  return conjugateVerb(infinitive, tense, person, verb.type);
}

// Initialize on import
let loadingPromise = null;
if (typeof window !== 'undefined') {
  loadingPromise = loadVerbs();
}

export async function ensureVerbsLoaded() {
  if (loadingPromise) {
    await loadingPromise;
  } else if (verbsData.length === 0) {
    await loadVerbs();
  }
}