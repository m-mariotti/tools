export const proportionTranslations = {
  en: {
    backToHome: "Back to Home",
    title: "Proportion Calculator",
    subtitle: "Solve Mathematical Proportions Quickly and Easily",

    // SEO Meta
    metaTitle: "Proportion Calculator - Solve Proportions Online",
    metaDescription: "Free online proportion calculator. Solve proportions and find the missing value in equations of the form a:b = c:d. Includes explanations and practical examples.",

    // Calculator
    calculator: {
      title: "Calculate Proportion",
      description: "Enter three known values and leave the unknown value empty. The calculator will find the missing value.",
      inputA: "First value (a)",
      inputB: "Second value (b)",
      inputC: "Third value (c)",
      inputD: "Fourth value (d)",
      placeholderKnown: "Enter value",
      placeholderUnknown: "Leave empty (unknown)",
      calculate: "Calculate",
      reset: "Reset",
      error: {
        needThreeValues: "You must enter exactly 3 values and leave 1 empty",
        invalidValues: "All values must be valid numbers",
        divisionByZero: "Cannot calculate: one of the denominators would be zero"
      }
    },

    // Results
    results: {
      title: "Result",
      proportion: "Proportion",
      solution: "Solution",
      calculation: "Calculation",
      verification: "Verification",
      verificationFormula: "Cross-multiplication verification",
      explanation: "The missing value was found using the fundamental property of proportions: the product of the extremes equals the product of the means."
    },

    // Introduction
    intro: {
      title: "What is a Proportion?",
      description: "A proportion is an equality between two ratios. It expresses that two fractions have the same value. A proportion is written as:",
      formula: "a : b = c : d",
      formulaAlt: "or equivalently as",
      formulaFraction: "a/b = c/d",
      explanation: "This reads as 'a is to b as c is to d'. The terms a and d are called extremes, while b and c are called means."
    },

    // Properties
    properties: {
      title: "Properties of Proportions",
      fundamental: {
        title: "1. Fundamental Property",
        description: "The product of the extremes equals the product of the means:",
        formula: "a × d = b × c",
        explanation: "This is the most important property and is used to solve proportions by finding the unknown term."
      },
      invertendo: {
        title: "2. Invertendo Property",
        description: "If you swap the means or the extremes, the proportion remains valid:",
        formula: "a : b = c : d  →  b : a = d : c",
        explanation: "You can invert both ratios and the equality is maintained."
      },
      componendo: {
        title: "3. Componendo Property",
        description: "Adding the consequent to the antecedent in both ratios:",
        formula: "a : b = c : d  →  (a+b) : b = (c+d) : d",
        explanation: "The sum of numerator and denominator maintains the same ratio."
      },
      scomponendo: {
        title: "4. Scomponendo Property",
        description: "Subtracting the consequent from the antecedent:",
        formula: "a : b = c : d  →  (a-b) : b = (c-d) : d",
        explanation: "The difference also maintains the proportional relationship."
      }
    },

    // Examples
    examples: {
      title: "Practical Examples",
      example1: {
        title: "Example 1: Recipe Scaling",
        problem: "A recipe for 4 people requires 300g of flour. How much flour is needed for 10 people?",
        setup: "We set up the proportion: 4 : 300 = 10 : x",
        solution: "Using the fundamental property: 4 × x = 300 × 10",
        calculation: "4x = 3000  →  x = 750g",
        answer: "Answer: 750 grams of flour are needed for 10 people."
      },
      example2: {
        title: "Example 2: Scale and Distances",
        problem: "On a map with scale 1:50,000, two cities are 8cm apart. What is the actual distance?",
        setup: "We set up: 1 : 50,000 = 8 : x",
        solution: "Applying the property: 1 × x = 50,000 × 8",
        calculation: "x = 400,000 cm = 4,000 meters = 4 km",
        answer: "Answer: The actual distance is 4 kilometers."
      },
      example3: {
        title: "Example 3: Speed and Time",
        problem: "A car travels 180 km in 2 hours. How long will it take to travel 450 km at the same speed?",
        setup: "We set up: 180 : 2 = 450 : x",
        solution: "Using proportions: 180 × x = 2 × 450",
        calculation: "180x = 900  →  x = 5 hours",
        answer: "Answer: It will take 5 hours to travel 450 km."
      },
      example4: {
        title: "Example 4: Percentage and Discounts",
        problem: "A store offers 15% discount on an item. If you save €30, what was the original price?",
        setup: "We set up: 15 : 100 = 30 : x",
        solution: "Applying the property: 15 × x = 100 × 30",
        calculation: "15x = 3000  →  x = 200€",
        answer: "Answer: The original price was €200."
      }
    },

    // Applications
    applications: {
      title: "Real-World Applications",
      description: "Proportions are used in many everyday situations:",
      list: [
        "Cooking and Recipes: Scaling ingredient quantities",
        "Construction and Architecture: Working with scales and plans",
        "Finance: Calculating interest, discounts, and percentages",
        "Science: Dilutions, concentrations, chemical formulas",
        "Geography: Map scales and distances",
        "Physics: Speed, density, and other physical quantities",
        "Commerce: Price conversions, unit costs",
        "Arts: Proportions in drawing and design"
      ]
    },

    // Tips
    tips: {
      title: "Tips for Solving Proportions",
      tip1: "Clearly identify the known and unknown terms",
      tip2: "Check that the units of measurement are consistent",
      tip3: "Use the fundamental property: multiply the extremes and the means",
      tip4: "Always verify your result by substituting it back into the proportion",
      tip5: "Pay attention to the order of terms when setting up the proportion"
    }
  },

  it: {
    backToHome: "Torna alla Home",
    title: "Calcolatore di Proporzioni",
    subtitle: "Risolvi Proporzioni Matematiche Velocemente e Facilmente",

    // SEO Meta
    metaTitle: "Calcolatore di Proporzioni - Risolvi Proporzioni Online",
    metaDescription: "Calcolatore gratuito di proporzioni online. Risolvi proporzioni e trova il valore mancante in equazioni della forma a:b = c:d. Include spiegazioni ed esempi pratici.",

    // Calculator
    calculator: {
      title: "Calcola Proporzione",
      description: "Inserisci tre valori conosciuti e lascia vuoto il valore incognito. Il calcolatore troverà il valore mancante.",
      inputA: "Primo valore (a)",
      inputB: "Secondo valore (b)",
      inputC: "Terzo valore (c)",
      inputD: "Quarto valore (d)",
      placeholderKnown: "Inserisci valore",
      placeholderUnknown: "Lascia vuoto (incognito)",
      calculate: "Calcola",
      reset: "Reimposta",
      error: {
        needThreeValues: "Devi inserire esattamente 3 valori e lasciarne 1 vuoto",
        invalidValues: "Tutti i valori devono essere numeri validi",
        divisionByZero: "Impossibile calcolare: uno dei denominatori sarebbe zero"
      }
    },

    // Results
    results: {
      title: "Risultato",
      proportion: "Proporzione",
      solution: "Soluzione",
      calculation: "Calcolo",
      verification: "Verifica",
      verificationFormula: "Verifica con prodotto in croce",
      explanation: "Il valore mancante è stato trovato usando la proprietà fondamentale delle proporzioni: il prodotto degli estremi è uguale al prodotto dei medi."
    },

    // Introduction
    intro: {
      title: "Cos'è una Proporzione?",
      description: "Una proporzione è un'uguaglianza tra due rapporti. Esprime che due frazioni hanno lo stesso valore. Una proporzione si scrive come:",
      formula: "a : b = c : d",
      formulaAlt: "oppure equivalentemente come",
      formulaFraction: "a/b = c/d",
      explanation: "Si legge 'a sta a b come c sta a d'. I termini a e d sono chiamati estremi, mentre b e c sono chiamati medi."
    },

    // Properties
    properties: {
      title: "Proprietà delle Proporzioni",
      fundamental: {
        title: "1. Proprietà Fondamentale",
        description: "Il prodotto degli estremi è uguale al prodotto dei medi:",
        formula: "a × d = b × c",
        explanation: "Questa è la proprietà più importante e viene usata per risolvere le proporzioni trovando il termine incognito."
      },
      invertendo: {
        title: "2. Proprietà dell'Invertire",
        description: "Scambiando i medi o gli estremi, la proporzione rimane valida:",
        formula: "a : b = c : d  →  b : a = d : c",
        explanation: "Si possono invertire entrambi i rapporti e l'uguaglianza si mantiene."
      },
      componendo: {
        title: "3. Proprietà del Comporre",
        description: "Sommando il conseguente all'antecedente in entrambi i rapporti:",
        formula: "a : b = c : d  →  (a+b) : b = (c+d) : d",
        explanation: "La somma di numeratore e denominatore mantiene lo stesso rapporto."
      },
      scomponendo: {
        title: "4. Proprietà dello Scomporre",
        description: "Sottraendo il conseguente dall'antecedente:",
        formula: "a : b = c : d  →  (a-b) : b = (c-d) : d",
        explanation: "Anche la differenza mantiene la relazione proporzionale."
      }
    },

    // Examples
    examples: {
      title: "Esempi Pratici",
      example1: {
        title: "Esempio 1: Ridimensionamento Ricette",
        problem: "Una ricetta per 4 persone richiede 300g di farina. Quanta farina serve per 10 persone?",
        setup: "Impostiamo la proporzione: 4 : 300 = 10 : x",
        solution: "Usando la proprietà fondamentale: 4 × x = 300 × 10",
        calculation: "4x = 3000  →  x = 750g",
        answer: "Risposta: Servono 750 grammi di farina per 10 persone."
      },
      example2: {
        title: "Esempio 2: Scala e Distanze",
        problem: "Su una mappa in scala 1:50.000, due città distano 8cm. Qual è la distanza reale?",
        setup: "Impostiamo: 1 : 50.000 = 8 : x",
        solution: "Applicando la proprietà: 1 × x = 50.000 × 8",
        calculation: "x = 400.000 cm = 4.000 metri = 4 km",
        answer: "Risposta: La distanza reale è 4 chilometri."
      },
      example3: {
        title: "Esempio 3: Velocità e Tempo",
        problem: "Un'auto percorre 180 km in 2 ore. Quanto tempo impiegherà per percorrere 450 km alla stessa velocità?",
        setup: "Impostiamo: 180 : 2 = 450 : x",
        solution: "Usando le proporzioni: 180 × x = 2 × 450",
        calculation: "180x = 900  →  x = 5 ore",
        answer: "Risposta: Impiegherà 5 ore per percorrere 450 km."
      },
      example4: {
        title: "Esempio 4: Percentuale e Sconti",
        problem: "Un negozio offre uno sconto del 15% su un articolo. Se risparmi €30, qual era il prezzo originale?",
        setup: "Impostiamo: 15 : 100 = 30 : x",
        solution: "Applicando la proprietà: 15 × x = 100 × 30",
        calculation: "15x = 3000  →  x = 200€",
        answer: "Risposta: Il prezzo originale era €200."
      }
    },

    // Applications
    applications: {
      title: "Applicazioni nel Mondo Reale",
      description: "Le proporzioni vengono utilizzate in molte situazioni quotidiane:",
      list: [
        "Cucina e Ricette: Ridimensionamento quantità ingredienti",
        "Edilizia e Architettura: Lavoro con scale e progetti",
        "Finanza: Calcolo interessi, sconti e percentuali",
        "Scienze: Diluizioni, concentrazioni, formule chimiche",
        "Geografia: Scale di mappe e distanze",
        "Fisica: Velocità, densità e altre grandezze fisiche",
        "Commercio: Conversioni di prezzo, costi unitari",
        "Arte: Proporzioni nel disegno e design"
      ]
    },

    // Tips
    tips: {
      title: "Consigli per Risolvere le Proporzioni",
      tip1: "Identifica chiaramente i termini noti e incogniti",
      tip2: "Verifica che le unità di misura siano coerenti",
      tip3: "Usa la proprietà fondamentale: moltiplica gli estremi e i medi",
      tip4: "Verifica sempre il risultato sostituendolo nella proporzione",
      tip5: "Fai attenzione all'ordine dei termini quando imposti la proporzione"
    }
  }
};
