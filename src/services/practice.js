// Practice service - handles verb selection algorithm
import { getVerbsByType, getVerbsByDifficulty } from '../data/loadVerbs';

// Track recent verbs to avoid repetition
let recentVerbs = [];
const RECENT_VERB_LIMIT = 10;

// Get error tracking data
function getErrorTracking() {
  const data = localStorage.getItem('errorTracking');
  return data ? JSON.parse(data) : {};
}

// Calculate error rate for a verb/tense combination
function getErrorRate(verb, tense) {
  const errorTracking = getErrorTracking();
  const key = `${verb}_${tense}`;
  const data = errorTracking[key];
  
  if (!data || data.attempts === 0) return 0;
  return data.errors / data.attempts;
}

// Check if verb was recently shown
function isRecentVerb(verb) {
  return recentVerbs.includes(verb);
}

// Add verb to recent list
function addToRecentVerbs(verb) {
  recentVerbs.push(verb);
  if (recentVerbs.length > RECENT_VERB_LIMIT) {
    recentVerbs.shift();
  }
}

// Select next verb based on algorithm
export function selectNextVerb(settings) {
  const { tense, verbType, difficulty } = settings;
  
  // Get candidate verbs based on settings
  let candidateVerbs = getVerbsByDifficulty(difficulty);
  candidateVerbs = candidateVerbs.filter(v => 
    verbType === 'both' || v.type === verbType
  );
  
  // Filter out recent verbs
  const availableVerbs = candidateVerbs.filter(v => !isRecentVerb(v.infinitive));
  
  // If all verbs are recent, reset the list
  if (availableVerbs.length === 0) {
    recentVerbs = [];
    return selectNextVerb(settings);
  }
  
  // Categorize verbs by error rate
  const problemVerbs = [];
  const normalVerbs = [];
  const masteredVerbs = [];
  
  availableVerbs.forEach(verb => {
    const errorRate = getErrorRate(verb.infinitive, tense);
    
    if (errorRate > 0.3) {
      problemVerbs.push(verb);
    } else if (errorRate < 0.1) {
      masteredVerbs.push(verb);
    } else {
      normalVerbs.push(verb);
    }
  });
  
  // Selection algorithm
  let selectedVerb;
  const random = Math.random();
  
  if (random < 0.4 && problemVerbs.length > 0) {
    // 40% chance: select from problem verbs
    selectedVerb = problemVerbs[Math.floor(Math.random() * problemVerbs.length)];
  } else if (random < 0.8 && normalVerbs.length > 0) {
    // 40% chance: select from normal verbs (frequency-based)
    // Higher frequency verbs have higher chance
    const weightedVerbs = normalVerbs.map(v => ({
      verb: v,
      weight: 1 / v.frequency
    }));
    
    const totalWeight = weightedVerbs.reduce((sum, v) => sum + v.weight, 0);
    let randomWeight = Math.random() * totalWeight;
    
    for (const item of weightedVerbs) {
      randomWeight -= item.weight;
      if (randomWeight <= 0) {
        selectedVerb = item.verb;
        break;
      }
    }
  } else {
    // 20% chance: random selection for variety
    const allAvailable = [...problemVerbs, ...normalVerbs, ...masteredVerbs];
    selectedVerb = allAvailable[Math.floor(Math.random() * allAvailable.length)];
  }
  
  // Fallback if no verb selected
  if (!selectedVerb) {
    selectedVerb = availableVerbs[0];
  }
  
  // Add to recent verbs
  addToRecentVerbs(selectedVerb.infinitive);
  
  return selectedVerb;
}

// Get practice statistics
export function getPracticeStats() {
  const errorTracking = getErrorTracking();
  const stats = {
    totalAttempts: 0,
    totalErrors: 0,
    verbStats: []
  };
  
  Object.entries(errorTracking).forEach(([key, data]) => {
    stats.totalAttempts += data.attempts;
    stats.totalErrors += data.errors;
    
    const [verb, tense] = key.split('_');
    stats.verbStats.push({
      verb,
      tense,
      attempts: data.attempts,
      errors: data.errors,
      errorRate: data.attempts > 0 ? data.errors / data.attempts : 0,
      lastSeen: new Date(data.lastSeen)
    });
  });
  
  // Sort by error rate (highest first)
  stats.verbStats.sort((a, b) => b.errorRate - a.errorRate);
  
  return stats;
}

// Reset practice data
export function resetPracticeData() {
  localStorage.removeItem('errorTracking');
  recentVerbs = [];
}