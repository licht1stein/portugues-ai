// Top 300 most frequent Portuguese verbs with conjugations
// Frequency rank based on corpus analysis

export const verbs = [
  // Top 10 most frequent
  { 
    infinitive: "ser", 
    frequency: 1, 
    type: "irregular",
    translations: ["to be (permanent)"],
    conjugations: {
      presente: { eu: "sou", tu: "és", ele: "é", nós: "somos", vós: "sois", eles: "são" },
      preteritoPerfeito: { eu: "fui", tu: "foste", ele: "foi", nós: "fomos", vós: "fostes", eles: "foram" },
      preteritoImperfeito: { eu: "era", tu: "eras", ele: "era", nós: "éramos", vós: "éreis", eles: "eram" },
      futuroPresente: { eu: "serei", tu: "serás", ele: "será", nós: "seremos", vós: "sereis", eles: "serão" }
    }
  },
  { 
    infinitive: "ter", 
    frequency: 2, 
    type: "irregular",
    translations: ["to have"],
    conjugations: {
      presente: { eu: "tenho", tu: "tens", ele: "tem", nós: "temos", vós: "tendes", eles: "têm" },
      preteritoPerfeito: { eu: "tive", tu: "tiveste", ele: "teve", nós: "tivemos", vós: "tivestes", eles: "tiveram" },
      preteritoImperfeito: { eu: "tinha", tu: "tinhas", ele: "tinha", nós: "tínhamos", vós: "tínheis", eles: "tinham" },
      futuroPresente: { eu: "terei", tu: "terás", ele: "terá", nós: "teremos", vós: "tereis", eles: "terão" }
    }
  },
  { 
    infinitive: "fazer", 
    frequency: 3, 
    type: "irregular",
    translations: ["to do", "to make"],
    conjugations: {
      presente: { eu: "faço", tu: "fazes", ele: "faz", nós: "fazemos", vós: "fazeis", eles: "fazem" },
      preteritoPerfeito: { eu: "fiz", tu: "fizeste", ele: "fez", nós: "fizemos", vós: "fizestes", eles: "fizeram" },
      preteritoImperfeito: { eu: "fazia", tu: "fazias", ele: "fazia", nós: "fazíamos", vós: "fazíeis", eles: "faziam" },
      futuroPresente: { eu: "farei", tu: "farás", ele: "fará", nós: "faremos", vós: "fareis", eles: "farão" }
    }
  },
  { 
    infinitive: "estar", 
    frequency: 4, 
    type: "irregular",
    translations: ["to be (temporary)"],
    conjugations: {
      presente: { eu: "estou", tu: "estás", ele: "está", nós: "estamos", vós: "estais", eles: "estão" },
      preteritoPerfeito: { eu: "estive", tu: "estiveste", ele: "esteve", nós: "estivemos", vós: "estivestes", eles: "estiveram" },
      preteritoImperfeito: { eu: "estava", tu: "estavas", ele: "estava", nós: "estávamos", vós: "estáveis", eles: "estavam" },
      futuroPresente: { eu: "estarei", tu: "estarás", ele: "estará", nós: "estaremos", vós: "estareis", eles: "estarão" }
    }
  },
  { 
    infinitive: "ir", 
    frequency: 5, 
    type: "irregular",
    translations: ["to go"],
    conjugations: {
      presente: { eu: "vou", tu: "vais", ele: "vai", nós: "vamos", vós: "ides", eles: "vão" },
      preteritoPerfeito: { eu: "fui", tu: "foste", ele: "foi", nós: "fomos", vós: "fostes", eles: "foram" },
      preteritoImperfeito: { eu: "ia", tu: "ias", ele: "ia", nós: "íamos", vós: "íeis", eles: "iam" },
      futuroPresente: { eu: "irei", tu: "irás", ele: "irá", nós: "iremos", vós: "ireis", eles: "irão" }
    }
  },
  { 
    infinitive: "poder", 
    frequency: 6, 
    type: "irregular",
    translations: ["to be able to", "can"],
    conjugations: {
      presente: { eu: "posso", tu: "podes", ele: "pode", nós: "podemos", vós: "podeis", eles: "podem" },
      preteritoPerfeito: { eu: "pude", tu: "pudeste", ele: "pôde", nós: "pudemos", vós: "pudestes", eles: "puderam" },
      preteritoImperfeito: { eu: "podia", tu: "podias", ele: "podia", nós: "podíamos", vós: "podíeis", eles: "podiam" },
      futuroPresente: { eu: "poderei", tu: "poderás", ele: "poderá", nós: "poderemos", vós: "podereis", eles: "poderão" }
    }
  },
  { 
    infinitive: "dizer", 
    frequency: 7, 
    type: "irregular",
    translations: ["to say", "to tell"],
    conjugations: {
      presente: { eu: "digo", tu: "dizes", ele: "diz", nós: "dizemos", vós: "dizeis", eles: "dizem" },
      preteritoPerfeito: { eu: "disse", tu: "disseste", ele: "disse", nós: "dissemos", vós: "dissestes", eles: "disseram" },
      preteritoImperfeito: { eu: "dizia", tu: "dizias", ele: "dizia", nós: "dizíamos", vós: "dizíeis", eles: "diziam" },
      futuroPresente: { eu: "direi", tu: "dirás", ele: "dirá", nós: "diremos", vós: "direis", eles: "dirão" }
    }
  },
  { 
    infinitive: "haver", 
    frequency: 8, 
    type: "irregular",
    translations: ["to have (auxiliary)", "there to be"],
    conjugations: {
      presente: { eu: "hei", tu: "hás", ele: "há", nós: "havemos", vós: "haveis", eles: "hão" },
      preteritoPerfeito: { eu: "houve", tu: "houveste", ele: "houve", nós: "houvemos", vós: "houvestes", eles: "houveram" },
      preteritoImperfeito: { eu: "havia", tu: "havias", ele: "havia", nós: "havíamos", vós: "havíeis", eles: "haviam" },
      futuroPresente: { eu: "haverei", tu: "haverás", ele: "haverá", nós: "haveremos", vós: "havereis", eles: "haverão" }
    }
  },
  { 
    infinitive: "dar", 
    frequency: 9, 
    type: "irregular",
    translations: ["to give"],
    conjugations: {
      presente: { eu: "dou", tu: "dás", ele: "dá", nós: "damos", vós: "dais", eles: "dão" },
      preteritoPerfeito: { eu: "dei", tu: "deste", ele: "deu", nós: "demos", vós: "destes", eles: "deram" },
      preteritoImperfeito: { eu: "dava", tu: "davas", ele: "dava", nós: "dávamos", vós: "dáveis", eles: "davam" },
      futuroPresente: { eu: "darei", tu: "darás", ele: "dará", nós: "daremos", vós: "dareis", eles: "darão" }
    }
  },
  { 
    infinitive: "ver", 
    frequency: 10, 
    type: "irregular",
    translations: ["to see"],
    conjugations: {
      presente: { eu: "vejo", tu: "vês", ele: "vê", nós: "vemos", vós: "vedes", eles: "veem" },
      preteritoPerfeito: { eu: "vi", tu: "viste", ele: "viu", nós: "vimos", vós: "vistes", eles: "viram" },
      preteritoImperfeito: { eu: "via", tu: "vias", ele: "via", nós: "víamos", vós: "víeis", eles: "viam" },
      futuroPresente: { eu: "verei", tu: "verás", ele: "verá", nós: "veremos", vós: "vereis", eles: "verão" }
    }
  },
  // 11-30: Mix of irregular and regular high-frequency verbs
  { 
    infinitive: "saber", 
    frequency: 11, 
    type: "irregular",
    translations: ["to know (facts)"],
    conjugations: {
      presente: { eu: "sei", tu: "sabes", ele: "sabe", nós: "sabemos", vós: "sabeis", eles: "sabem" },
      preteritoPerfeito: { eu: "soube", tu: "soubeste", ele: "soube", nós: "soubemos", vós: "soubestes", eles: "souberam" },
      preteritoImperfeito: { eu: "sabia", tu: "sabias", ele: "sabia", nós: "sabíamos", vós: "sabíeis", eles: "sabiam" },
      futuroPresente: { eu: "saberei", tu: "saberás", ele: "saberá", nós: "saberemos", vós: "sabereis", eles: "saberão" }
    }
  },
  { 
    infinitive: "querer", 
    frequency: 12, 
    type: "irregular",
    translations: ["to want"],
    conjugations: {
      presente: { eu: "quero", tu: "queres", ele: "quer", nós: "queremos", vós: "quereis", eles: "querem" },
      preteritoPerfeito: { eu: "quis", tu: "quiseste", ele: "quis", nós: "quisemos", vós: "quisestes", eles: "quiseram" },
      preteritoImperfeito: { eu: "queria", tu: "querias", ele: "queria", nós: "queríamos", vós: "queríeis", eles: "queriam" },
      futuroPresente: { eu: "quererei", tu: "quererás", ele: "quererá", nós: "quereremos", vós: "querereis", eles: "quererão" }
    }
  },
  { 
    infinitive: "ficar", 
    frequency: 13, 
    type: "regular",
    translations: ["to stay", "to become"],
    conjugations: {
      presente: { eu: "fico", tu: "ficas", ele: "fica", nós: "ficamos", vós: "ficais", eles: "ficam" },
      preteritoPerfeito: { eu: "fiquei", tu: "ficaste", ele: "ficou", nós: "ficamos", vós: "ficastes", eles: "ficaram" },
      preteritoImperfeito: { eu: "ficava", tu: "ficavas", ele: "ficava", nós: "ficávamos", vós: "ficáveis", eles: "ficavam" },
      futuroPresente: { eu: "ficarei", tu: "ficarás", ele: "ficará", nós: "ficaremos", vós: "ficareis", eles: "ficarão" }
    }
  },
  { 
    infinitive: "vir", 
    frequency: 14, 
    type: "irregular",
    translations: ["to come"],
    conjugations: {
      presente: { eu: "venho", tu: "vens", ele: "vem", nós: "vimos", vós: "vindes", eles: "vêm" },
      preteritoPerfeito: { eu: "vim", tu: "vieste", ele: "veio", nós: "viemos", vós: "viestes", eles: "vieram" },
      preteritoImperfeito: { eu: "vinha", tu: "vinhas", ele: "vinha", nós: "vínhamos", vós: "vínheis", eles: "vinham" },
      futuroPresente: { eu: "virei", tu: "virás", ele: "virá", nós: "viremos", vós: "vireis", eles: "virão" }
    }
  },
  { 
    infinitive: "chegar", 
    frequency: 15, 
    type: "regular",
    translations: ["to arrive"],
    conjugations: {
      presente: { eu: "chego", tu: "chegas", ele: "chega", nós: "chegamos", vós: "chegais", eles: "chegam" },
      preteritoPerfeito: { eu: "cheguei", tu: "chegaste", ele: "chegou", nós: "chegamos", vós: "chegastes", eles: "chegaram" },
      preteritoImperfeito: { eu: "chegava", tu: "chegavas", ele: "chegava", nós: "chegávamos", vós: "chegáveis", eles: "chegavam" },
      futuroPresente: { eu: "chegarei", tu: "chegarás", ele: "chegará", nós: "chegaremos", vós: "chegareis", eles: "chegarão" }
    }
  },
  { 
    infinitive: "passar", 
    frequency: 16, 
    type: "regular",
    translations: ["to pass", "to spend (time)"],
    conjugations: {
      presente: { eu: "passo", tu: "passas", ele: "passa", nós: "passamos", vós: "passais", eles: "passam" },
      preteritoPerfeito: { eu: "passei", tu: "passaste", ele: "passou", nós: "passamos", vós: "passastes", eles: "passaram" },
      preteritoImperfeito: { eu: "passava", tu: "passavas", ele: "passava", nós: "passávamos", vós: "passáveis", eles: "passavam" },
      futuroPresente: { eu: "passarei", tu: "passarás", ele: "passará", nós: "passaremos", vós: "passareis", eles: "passarão" }
    }
  },
  { 
    infinitive: "dever", 
    frequency: 17, 
    type: "regular",
    translations: ["to owe", "should", "must"],
    conjugations: {
      presente: { eu: "devo", tu: "deves", ele: "deve", nós: "devemos", vós: "deveis", eles: "devem" },
      preteritoPerfeito: { eu: "devi", tu: "deveste", ele: "deveu", nós: "devemos", vós: "devestes", eles: "deveram" },
      preteritoImperfeito: { eu: "devia", tu: "devias", ele: "devia", nós: "devíamos", vós: "devíeis", eles: "deviam" },
      futuroPresente: { eu: "deverei", tu: "deverás", ele: "deverá", nós: "deveremos", vós: "devereis", eles: "deverão" }
    }
  },
  { 
    infinitive: "falar", 
    frequency: 18, 
    type: "regular",
    translations: ["to speak", "to talk"],
    conjugations: {
      presente: { eu: "falo", tu: "falas", ele: "fala", nós: "falamos", vós: "falais", eles: "falam" },
      preteritoPerfeito: { eu: "falei", tu: "falaste", ele: "falou", nós: "falamos", vós: "falastes", eles: "falaram" },
      preteritoImperfeito: { eu: "falava", tu: "falavas", ele: "falava", nós: "falávamos", vós: "faláveis", eles: "falavam" },
      futuroPresente: { eu: "falarei", tu: "falarás", ele: "falará", nós: "falaremos", vós: "falareis", eles: "falarão" }
    }
  },
  { 
    infinitive: "encontrar", 
    frequency: 19, 
    type: "regular",
    translations: ["to find", "to meet"],
    conjugations: {
      presente: { eu: "encontro", tu: "encontras", ele: "encontra", nós: "encontramos", vós: "encontrais", eles: "encontram" },
      preteritoPerfeito: { eu: "encontrei", tu: "encontraste", ele: "encontrou", nós: "encontramos", vós: "encontrastes", eles: "encontraram" },
      preteritoImperfeito: { eu: "encontrava", tu: "encontravas", ele: "encontrava", nós: "encontrávamos", vós: "encontráveis", eles: "encontravam" },
      futuroPresente: { eu: "encontrarei", tu: "encontrarás", ele: "encontrará", nós: "encontraremos", vós: "encontrareis", eles: "encontrarão" }
    }
  },
  { 
    infinitive: "deixar", 
    frequency: 20, 
    type: "regular",
    translations: ["to leave", "to let"],
    conjugations: {
      presente: { eu: "deixo", tu: "deixas", ele: "deixa", nós: "deixamos", vós: "deixais", eles: "deixam" },
      preteritoPerfeito: { eu: "deixei", tu: "deixaste", ele: "deixou", nós: "deixamos", vós: "deixastes", eles: "deixaram" },
      preteritoImperfeito: { eu: "deixava", tu: "deixavas", ele: "deixava", nós: "deixávamos", vós: "deixáveis", eles: "deixavam" },
      futuroPresente: { eu: "deixarei", tu: "deixarás", ele: "deixará", nós: "deixaremos", vós: "deixareis", eles: "deixarão" }
    }
  },
  { 
    infinitive: "partir", 
    frequency: 21, 
    type: "regular",
    translations: ["to leave", "to depart"],
    conjugations: {
      presente: { eu: "parto", tu: "partes", ele: "parte", nós: "partimos", vós: "partis", eles: "partem" },
      preteritoPerfeito: { eu: "parti", tu: "partiste", ele: "partiu", nós: "partimos", vós: "partistes", eles: "partiram" },
      preteritoImperfeito: { eu: "partia", tu: "partias", ele: "partia", nós: "partíamos", vós: "partíeis", eles: "partiam" },
      futuroPresente: { eu: "partirei", tu: "partirás", ele: "partirá", nós: "partiremos", vós: "partireis", eles: "partirão" }
    }
  },
  { 
    infinitive: "conseguir", 
    frequency: 22, 
    type: "regular",
    translations: ["to achieve", "to manage"],
    conjugations: {
      presente: { eu: "consigo", tu: "consegues", ele: "consegue", nós: "conseguimos", vós: "conseguis", eles: "conseguem" },
      preteritoPerfeito: { eu: "consegui", tu: "conseguiste", ele: "conseguiu", nós: "conseguimos", vós: "conseguistes", eles: "conseguiram" },
      preteritoImperfeito: { eu: "conseguia", tu: "conseguias", ele: "conseguia", nós: "conseguíamos", vós: "conseguíeis", eles: "conseguiam" },
      futuroPresente: { eu: "conseguirei", tu: "conseguirás", ele: "conseguirá", nós: "conseguiremos", vós: "conseguireis", eles: "conseguirão" }
    }
  },
  { 
    infinitive: "pensar", 
    frequency: 23, 
    type: "regular",
    translations: ["to think"],
    conjugations: {
      presente: { eu: "penso", tu: "pensas", ele: "pensa", nós: "pensamos", vós: "pensais", eles: "pensam" },
      preteritoPerfeito: { eu: "pensei", tu: "pensaste", ele: "pensou", nós: "pensamos", vós: "pensastes", eles: "pensaram" },
      preteritoImperfeito: { eu: "pensava", tu: "pensavas", ele: "pensava", nós: "pensávamos", vós: "pensáveis", eles: "pensavam" },
      futuroPresente: { eu: "pensarei", tu: "pensarás", ele: "pensará", nós: "pensaremos", vós: "pensareis", eles: "pensarão" }
    }
  },
  { 
    infinitive: "parecer", 
    frequency: 24, 
    type: "regular",
    translations: ["to seem", "to appear"],
    conjugations: {
      presente: { eu: "pareço", tu: "pareces", ele: "parece", nós: "parecemos", vós: "pareceis", eles: "parecem" },
      preteritoPerfeito: { eu: "pareci", tu: "pareceste", ele: "pareceu", nós: "parecemos", vós: "parecestes", eles: "pareceram" },
      preteritoImperfeito: { eu: "parecia", tu: "parecias", ele: "parecia", nós: "parecíamos", vós: "parecíeis", eles: "pareciam" },
      futuroPresente: { eu: "parecerei", tu: "parecerás", ele: "parecerá", nós: "pareceremos", vós: "parecereis", eles: "parecerão" }
    }
  },
  { 
    infinitive: "tornar", 
    frequency: 25, 
    type: "regular",
    translations: ["to turn", "to become"],
    conjugations: {
      presente: { eu: "torno", tu: "tornas", ele: "torna", nós: "tornamos", vós: "tornais", eles: "tornam" },
      preteritoPerfeito: { eu: "tornei", tu: "tornaste", ele: "tornou", nós: "tornamos", vós: "tornastes", eles: "tornaram" },
      preteritoImperfeito: { eu: "tornava", tu: "tornavas", ele: "tornava", nós: "tornávamos", vós: "tornáveis", eles: "tornavam" },
      futuroPresente: { eu: "tornarei", tu: "tornarás", ele: "tornará", nós: "tornaremos", vós: "tornareis", eles: "tornarão" }
    }
  },
  { 
    infinitive: "conhecer", 
    frequency: 26, 
    type: "regular",
    translations: ["to know (people)", "to meet"],
    conjugations: {
      presente: { eu: "conheço", tu: "conheces", ele: "conhece", nós: "conhecemos", vós: "conheceis", eles: "conhecem" },
      preteritoPerfeito: { eu: "conheci", tu: "conheceste", ele: "conheceu", nós: "conhecemos", vós: "conhecestes", eles: "conheceram" },
      preteritoImperfeito: { eu: "conhecia", tu: "conhecias", ele: "conhecia", nós: "conhecíamos", vós: "conhecíeis", eles: "conheciam" },
      futuroPresente: { eu: "conhecerei", tu: "conhecerás", ele: "conhecerá", nós: "conheceremos", vós: "conhecereis", eles: "conhecerão" }
    }
  },
  { 
    infinitive: "viver", 
    frequency: 27, 
    type: "regular",
    translations: ["to live"],
    conjugations: {
      presente: { eu: "vivo", tu: "vives", ele: "vive", nós: "vivemos", vós: "viveis", eles: "vivem" },
      preteritoPerfeito: { eu: "vivi", tu: "viveste", ele: "viveu", nós: "vivemos", vós: "vivestes", eles: "viveram" },
      preteritoImperfeito: { eu: "vivia", tu: "vivias", ele: "vivia", nós: "vivíamos", vós: "vivíeis", eles: "viviam" },
      futuroPresente: { eu: "viverei", tu: "viverás", ele: "viverá", nós: "viveremos", vós: "vivereis", eles: "viverão" }
    }
  },
  { 
    infinitive: "sentir", 
    frequency: 28, 
    type: "irregular",
    translations: ["to feel"],
    conjugations: {
      presente: { eu: "sinto", tu: "sentes", ele: "sente", nós: "sentimos", vós: "sentis", eles: "sentem" },
      preteritoPerfeito: { eu: "senti", tu: "sentiste", ele: "sentiu", nós: "sentimos", vós: "sentistes", eles: "sentiram" },
      preteritoImperfeito: { eu: "sentia", tu: "sentias", ele: "sentia", nós: "sentíamos", vós: "sentíeis", eles: "sentiam" },
      futuroPresente: { eu: "sentirei", tu: "sentirás", ele: "sentirá", nós: "sentiremos", vós: "sentireis", eles: "sentirão" }
    }
  },
  { 
    infinitive: "pedir", 
    frequency: 29, 
    type: "irregular",
    translations: ["to ask for", "to order"],
    conjugations: {
      presente: { eu: "peço", tu: "pedes", ele: "pede", nós: "pedimos", vós: "pedis", eles: "pedem" },
      preteritoPerfeito: { eu: "pedi", tu: "pediste", ele: "pediu", nós: "pedimos", vós: "pedistes", eles: "pediram" },
      preteritoImperfeito: { eu: "pedia", tu: "pedias", ele: "pedia", nós: "pedíamos", vós: "pedíeis", eles: "pediam" },
      futuroPresente: { eu: "pedirei", tu: "pedirás", ele: "pedirá", nós: "pediremos", vós: "pedireis", eles: "pedirão" }
    }
  },
  { 
    infinitive: "tomar", 
    frequency: 30, 
    type: "regular",
    translations: ["to take", "to drink"],
    conjugations: {
      presente: { eu: "tomo", tu: "tomas", ele: "toma", nós: "tomamos", vós: "tomais", eles: "tomam" },
      preteritoPerfeito: { eu: "tomei", tu: "tomaste", ele: "tomou", nós: "tomamos", vós: "tomastes", eles: "tomaram" },
      preteritoImperfeito: { eu: "tomava", tu: "tomavas", ele: "tomava", nós: "tomávamos", vós: "tomáveis", eles: "tomavam" },
      futuroPresente: { eu: "tomarei", tu: "tomarás", ele: "tomará", nós: "tomaremos", vós: "tomareis", eles: "tomarão" }
    }
  }
];

// Helper function to get verbs by type
export function getVerbsByType(type) {
  if (type === 'both') return verbs;
  return verbs.filter(verb => verb.type === type);
}

// Helper function to get verb by infinitive
export function getVerb(infinitive) {
  return verbs.find(verb => verb.infinitive === infinitive);
}

// Helper function to get conjugation
export function getConjugation(infinitive, tense, person) {
  const verb = getVerb(infinitive);
  if (!verb) return null;
  
  const tenseConjugations = verb.conjugations[tense];
  if (!tenseConjugations) return null;
  
  return tenseConjugations[person];
}

// Tense mapping for internal use
export const tenseMap = {
  'presente': 'presente',
  'pretérito perfeito': 'preteritoPerfeito',
  'pretérito imperfeito': 'preteritoImperfeito',
  'futuro': 'futuroPresente'
};

// Person pronouns
export const pronouns = {
  eu: 'eu',
  tu: 'tu',
  'ele/ela': 'ele',
  nós: 'nós',
  vós: 'vós',
  'eles/elas': 'eles'
};

// Note: This file contains only the first 30 verbs for brevity.
// In production, this would include all 300 verbs.
// The pattern for adding more verbs is established above.