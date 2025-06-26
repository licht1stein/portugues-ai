// Helper functions for Portuguese verb conjugation
// Handles regular and common irregular patterns

const regularConjugations = {
  ar: {
    presente: {
      eu: (stem) => stem + 'o',
      tu: (stem) => stem + 'as',
      ele: (stem) => stem + 'a',
      nós: (stem) => stem + 'amos',
      vós: (stem) => stem + 'ais',
      eles: (stem) => stem + 'am'
    },
    preteritoPerfeito: {
      eu: (stem) => stem + 'ei',
      tu: (stem) => stem + 'aste',
      ele: (stem) => stem + 'ou',
      nós: (stem) => stem + 'amos',
      vós: (stem) => stem + 'astes',
      eles: (stem) => stem + 'aram'
    },
    preteritoImperfeito: {
      eu: (stem) => stem + 'ava',
      tu: (stem) => stem + 'avas',
      ele: (stem) => stem + 'ava',
      nós: (stem) => stem + 'ávamos',
      vós: (stem) => stem + 'áveis',
      eles: (stem) => stem + 'avam'
    },
    futuroPresente: {
      eu: (stem) => stem + 'arei',
      tu: (stem) => stem + 'arás',
      ele: (stem) => stem + 'ará',
      nós: (stem) => stem + 'aremos',
      vós: (stem) => stem + 'areis',
      eles: (stem) => stem + 'arão'
    }
  },
  er: {
    presente: {
      eu: (stem) => stem + 'o',
      tu: (stem) => stem + 'es',
      ele: (stem) => stem + 'e',
      nós: (stem) => stem + 'emos',
      vós: (stem) => stem + 'eis',
      eles: (stem) => stem + 'em'
    },
    preteritoPerfeito: {
      eu: (stem) => stem + 'i',
      tu: (stem) => stem + 'este',
      ele: (stem) => stem + 'eu',
      nós: (stem) => stem + 'emos',
      vós: (stem) => stem + 'estes',
      eles: (stem) => stem + 'eram'
    },
    preteritoImperfeito: {
      eu: (stem) => stem + 'ia',
      tu: (stem) => stem + 'ias',
      ele: (stem) => stem + 'ia',
      nós: (stem) => stem + 'íamos',
      vós: (stem) => stem + 'íeis',
      eles: (stem) => stem + 'iam'
    },
    futuroPresente: {
      eu: (stem) => stem + 'erei',
      tu: (stem) => stem + 'erás',
      ele: (stem) => stem + 'erá',
      nós: (stem) => stem + 'eremos',
      vós: (stem) => stem + 'ereis',
      eles: (stem) => stem + 'erão'
    }
  },
  ir: {
    presente: {
      eu: (stem) => stem + 'o',
      tu: (stem) => stem + 'es',
      ele: (stem) => stem + 'e',
      nós: (stem) => stem + 'imos',
      vós: (stem) => stem + 'is',
      eles: (stem) => stem + 'em'
    },
    preteritoPerfeito: {
      eu: (stem) => stem + 'i',
      tu: (stem) => stem + 'iste',
      ele: (stem) => stem + 'iu',
      nós: (stem) => stem + 'imos',
      vós: (stem) => stem + 'istes',
      eles: (stem) => stem + 'iram'
    },
    preteritoImperfeito: {
      eu: (stem) => stem + 'ia',
      tu: (stem) => stem + 'ias',
      ele: (stem) => stem + 'ia',
      nós: (stem) => stem + 'íamos',
      vós: (stem) => stem + 'íeis',
      eles: (stem) => stem + 'iam'
    },
    futuroPresente: {
      eu: (stem) => stem + 'irei',
      tu: (stem) => stem + 'irás',
      ele: (stem) => stem + 'irá',
      nós: (stem) => stem + 'iremos',
      vós: (stem) => stem + 'ireis',
      eles: (stem) => stem + 'irão'
    }
  }
};

// Common irregular verbs patterns
const irregularPatterns = {
  ser: {
    presente: { eu: 'sou', tu: 'és', ele: 'é', nós: 'somos', vós: 'sois', eles: 'são' },
    preteritoPerfeito: { eu: 'fui', tu: 'foste', ele: 'foi', nós: 'fomos', vós: 'fostes', eles: 'foram' },
    preteritoImperfeito: { eu: 'era', tu: 'eras', ele: 'era', nós: 'éramos', vós: 'éreis', eles: 'eram' },
    futuroPresente: { eu: 'serei', tu: 'serás', ele: 'será', nós: 'seremos', vós: 'sereis', eles: 'serão' }
  },
  ter: {
    presente: { eu: 'tenho', tu: 'tens', ele: 'tem', nós: 'temos', vós: 'tendes', eles: 'têm' },
    preteritoPerfeito: { eu: 'tive', tu: 'tiveste', ele: 'teve', nós: 'tivemos', vós: 'tivestes', eles: 'tiveram' },
    preteritoImperfeito: { eu: 'tinha', tu: 'tinhas', ele: 'tinha', nós: 'tínhamos', vós: 'tínheis', eles: 'tinham' },
    futuroPresente: { eu: 'terei', tu: 'terás', ele: 'terá', nós: 'teremos', vós: 'tereis', eles: 'terão' }
  },
  fazer: {
    presente: { eu: 'faço', tu: 'fazes', ele: 'faz', nós: 'fazemos', vós: 'fazeis', eles: 'fazem' },
    preteritoPerfeito: { eu: 'fiz', tu: 'fizeste', ele: 'fez', nós: 'fizemos', vós: 'fizestes', eles: 'fizeram' },
    preteritoImperfeito: { eu: 'fazia', tu: 'fazias', ele: 'fazia', nós: 'fazíamos', vós: 'fazíeis', eles: 'faziam' },
    futuroPresente: { eu: 'farei', tu: 'farás', ele: 'fará', nós: 'faremos', vós: 'fareis', eles: 'farão' }
  },
  estar: {
    presente: { eu: 'estou', tu: 'estás', ele: 'está', nós: 'estamos', vós: 'estais', eles: 'estão' },
    preteritoPerfeito: { eu: 'estive', tu: 'estiveste', ele: 'esteve', nós: 'estivemos', vós: 'estivestes', eles: 'estiveram' },
    preteritoImperfeito: { eu: 'estava', tu: 'estavas', ele: 'estava', nós: 'estávamos', vós: 'estáveis', eles: 'estavam' },
    futuroPresente: { eu: 'estarei', tu: 'estarás', ele: 'estará', nós: 'estaremos', vós: 'estareis', eles: 'estarão' }
  },
  ir: {
    presente: { eu: 'vou', tu: 'vais', ele: 'vai', nós: 'vamos', vós: 'ides', eles: 'vão' },
    preteritoPerfeito: { eu: 'fui', tu: 'foste', ele: 'foi', nós: 'fomos', vós: 'fostes', eles: 'foram' },
    preteritoImperfeito: { eu: 'ia', tu: 'ias', ele: 'ia', nós: 'íamos', vós: 'íeis', eles: 'iam' },
    futuroPresente: { eu: 'irei', tu: 'irás', ele: 'irá', nós: 'iremos', vós: 'ireis', eles: 'irão' }
  },
  cair: {
    presente: { eu: 'caio', tu: 'cais', ele: 'cai', nós: 'caímos', vós: 'caís', eles: 'caem' },
    preteritoPerfeito: { eu: 'caí', tu: 'caíste', ele: 'caiu', nós: 'caímos', vós: 'caístes', eles: 'caíram' },
    preteritoImperfeito: { eu: 'caía', tu: 'caías', ele: 'caía', nós: 'caíamos', vós: 'caíeis', eles: 'caíam' },
    futuroPresente: { eu: 'cairei', tu: 'cairás', ele: 'cairá', nós: 'cairemos', vós: 'caireis', eles: 'cairão' }
  },
  // Add more irregular verbs as needed
};

export function conjugateVerb(infinitive, tense, person, type = 'regular') {
  // Check if it's an irregular verb with stored conjugations
  if (irregularPatterns[infinitive]) {
    return irregularPatterns[infinitive][tense]?.[person] || null;
  }
  
  // For regular verbs, apply pattern
  if (type === 'regular') {
    const ending = infinitive.slice(-2);
    const stem = infinitive.slice(0, -2);
    
    if (regularConjugations[ending] && regularConjugations[ending][tense]) {
      return regularConjugations[ending][tense][person](stem);
    }
  }
  
  // Return null if conjugation not found
  return null;
}

export function getVerbEnding(infinitive) {
  return infinitive.slice(-2);
}

export function getVerbStem(infinitive) {
  return infinitive.slice(0, -2);
}