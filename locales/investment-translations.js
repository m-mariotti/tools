export const investmentTranslations = {
  en: {
    backToHome: "Back to Home",
    title: "Investment Interest Calculator",
    subtitle: "Calculate Simple and Compound Interest on Your Investments",
    
    // SEO Meta
    metaTitle: "Investment Interest Calculator - Simple & Compound Interest",
    metaDescription: "Free online calculator for simple and compound interest. Calculate your investment growth with recurring deposits and visualize returns over time.",
    
    // Introduction
    intro: {
      title: "What is This Tool?",
      description: "This calculator helps you estimate the growth of your investments over time using both simple and compound interest calculations. Input your initial investment, recurring contributions, and expected interest rate to see how your money can grow.",
      
      simpleInterest: {
        title: "Simple Interest",
        description: "Simple interest is calculated only on the principal amount (initial investment). The interest earned does not earn additional interest. It's calculated using the formula:",
        formula: "Interest = Principal × Rate × Time"
      },
      
      compoundInterest: {
        title: "Compound Interest",
        description: "Compound interest is calculated on both the principal amount and the accumulated interest from previous periods. This creates exponential growth as your earnings generate additional earnings. The formula is:",
        formula: "Final Amount = Principal × (1 + Rate)^Time"
      }
    },
    
    // Disclaimer
    disclaimer: {
      title: "Important Disclaimer",
      text: "These calculations provide estimates for educational purposes only. Actual investment returns may vary significantly due to market conditions, fees, taxes, and other factors. This tool does not constitute financial advice. For personalized investment guidance, please consult a qualified financial advisor."
    },
    
    // Form
    form: {
      initialInvestment: "Initial Investment (€)",
      initialInvestmentPlaceholder: "Enter initial amount",
      recurringDeposit: "Recurring Deposit Amount (€)",
      recurringDepositPlaceholder: "Enter recurring amount",
      frequency: "Deposit Frequency",
      frequencies: {
        weekly: "Weekly",
        monthly: "Monthly",
        yearly: "Yearly"
      },
      interestRate: "Annual Interest Rate (%)",
      interestRatePlaceholder: "Enter rate",
      years: "Investment Period (Years)",
      yearsPlaceholder: "Number of years",
      calculate: "Calculate"
    },
    
    // Results
    results: {
      title: "Investment Summary",
      parameters: "Parameters Used",
      statistics: "Statistics",
      
      initialInvestment: "Initial Investment",
      totalRecurringDeposits: "Total Recurring Deposits",
      totalDeposits: "Total Deposits",
      
      simpleInterest: {
        title: "Simple Interest",
        totalInterest: "Total Interest (Simple)",
        averageRate: "Average Interest Rate",
        finalAmount: "Final Amount (Simple)",
        explanation: "Simple interest is calculated on the initial principal only. Each period earns the same fixed amount of interest.",
        formula: "Interest = Principal × Rate × Time",
        formulaDetailed: {
          title: "Simple Interest Formula Explained",
          mainFormula: "Total Interest = (P × r × t) + Σ(PMT × r × t_remaining)",
          where: "Where:",
          params: {
            p: "P = Principal (initial investment)",
            r: "r = Annual interest rate (as decimal, e.g., 5% = 0.05)",
            t: "t = Time in years",
            pmt: "PMT = Recurring deposit amount",
            tRemaining: "t_remaining = Time remaining for each deposit to earn interest"
          },
          example: "Example: €10,000 at 5% for 10 years = €10,000 × 0.05 × 10 = €5,000 interest on principal. Plus interest on each recurring deposit calculated for its remaining time."
        }
      },
      
      compoundInterest: {
        title: "Compound Interest",
        totalInterest: "Total Interest (Compound)",
        averageRate: "Effective Interest Rate",
        finalAmount: "Final Amount (Compound)",
        explanation: "Compound interest is calculated on the principal plus all accumulated interest. Your earnings generate additional earnings, creating exponential growth.",
        formula: "FV = P(1+r/n)^(n×t) + Σ[PMT × (1+r/n)^remaining_periods]",
        formulaDetailed: {
          title: "Compound Interest Formula Explained",
          mainFormula: "FV = P(1+r/n)^(n×t) + Σ[PMT × (1+r/n)^remaining_periods]",
          where: "Where:",
          params: {
            fv: "FV = Future Value (final amount)",
            p: "P = Principal (initial investment amount)",
            r: "r = Annual interest rate (as decimal, 5% = 0.05)",
            n: "n = Number of compounding periods per year (12 for monthly, 52 for weekly, 1 for yearly)",
            t: "t = Time in years",
            pmt: "PMT = Recurring payment/deposit amount",
            remainingPeriods: "remaining_periods = Number of periods left for each deposit to compound",
            sigma: "Σ (Sigma) = Sum of all recurring deposits, each compounded for its remaining time"
          },
          breakdown: {
            title: "Formula Breakdown:",
            part1: {
              title: "Part 1: P(1+r/n)^(n×t)",
              desc: "This calculates how the initial principal grows with compound interest"
            },
            part2: {
              title: "Part 2: Σ[PMT × (1+r/n)^remaining_periods]",
              desc: "This adds the future value of all recurring deposits. Each deposit compounds only for the periods from when it was made until the end"
            }
          },
          example: {
            title: "Example Calculation:",
            scenario: "€10,000 initial + €500 monthly at 5% annual for 10 years",
            steps: [
              "Monthly rate = 5% ÷ 12 = 0.4167% (0.004167)",
              "Total periods = 12 × 10 = 120 months",
              "Initial principal after 10 years: €10,000 × (1.004167)^120 = €16,470",
              "First €500 deposit compounds for 119 periods: €500 × (1.004167)^119",
              "Second €500 deposit compounds for 118 periods: €500 × (1.004167)^118",
              "... and so on for all 120 monthly deposits",
              "Sum all deposits with their compound interest",
              "Result: Principal growth + All deposits compounded = Total"
            ]
          },
          note: "The key difference: in compound interest, each period's interest is added to the principal, so the next period earns interest on a larger amount. This creates exponential growth."
        }
      },
      
      chart: {
        title: "Investment Growth Over Time",
        simpleInterest: "Simple Interest",
        compoundInterest: "Compound Interest",
        year: "Year",
        amount: "Amount (€)",
        exportCSV: "Export CSV",
        exportPDF: "Export PDF"
      }
    },
    
    // Explanations
    explanations: {
      initialInvestment: {
        title: "Initial Investment",
        text: "The starting amount you invest at the beginning. This is your principal amount."
      },
      totalRecurringDeposits: {
        title: "Total Recurring Deposits",
        text: "Sum of all additional deposits made over the investment period.",
        formula: "Deposits per year × Number of years × Deposit amount"
      },
      totalDeposits: {
        title: "Total Deposits",
        text: "Combined total of your initial investment and all recurring deposits.",
        formula: "Initial Investment + Total Recurring Deposits"
      }
    }
  },
  
  it: {
    backToHome: "Torna alla Home",
    title: "Calcolatore Interessi Investimento",
    subtitle: "Calcola Interessi Semplici e Composti sui Tuoi Investimenti",
    
    // SEO Meta
    metaTitle: "Calcolatore Interessi Investimento - Interesse Semplice e Composto",
    metaDescription: "Calcolatore gratuito online per interesse semplice e composto. Calcola la crescita del tuo investimento con depositi ricorrenti e visualizza i rendimenti nel tempo.",
    
    // Introduction
    intro: {
      title: "Cos'è Questo Strumento?",
      description: "Questo calcolatore ti aiuta a stimare la crescita dei tuoi investimenti nel tempo utilizzando sia il calcolo dell'interesse semplice che quello composto. Inserisci il tuo investimento iniziale, i contributi ricorrenti e il tasso di interesse previsto per vedere come il tuo denaro può crescere.",
      
      simpleInterest: {
        title: "Interesse Semplice",
        description: "L'interesse semplice viene calcolato solo sull'importo principale (investimento iniziale). Gli interessi maturati non generano ulteriori interessi. Si calcola con la formula:",
        formula: "Interesse = Capitale × Tasso × Tempo"
      },
      
      compoundInterest: {
        title: "Interesse Composto",
        description: "L'interesse composto viene calcolato sia sull'importo principale che sugli interessi accumulati nei periodi precedenti. Questo crea una crescita esponenziale poiché i tuoi guadagni generano ulteriori guadagni. La formula è:",
        formula: "Importo Finale = Capitale × (1 + Tasso)^Tempo"
      }
    },
    
    // Disclaimer
    disclaimer: {
      title: "Disclaimer Importante",
      text: "Questi calcoli forniscono stime a solo scopo educativo. I rendimenti effettivi degli investimenti possono variare significativamente a causa delle condizioni di mercato, commissioni, tasse e altri fattori. Questo strumento non costituisce consulenza finanziaria. Per una guida personalizzata sugli investimenti, consulta un consulente finanziario qualificato."
    },
    
    // Form
    form: {
      initialInvestment: "Investimento Iniziale (€)",
      initialInvestmentPlaceholder: "Inserisci importo iniziale",
      recurringDeposit: "Importo Deposito Ricorrente (€)",
      recurringDepositPlaceholder: "Inserisci importo ricorrente",
      frequency: "Frequenza Deposito",
      frequencies: {
        weekly: "Settimanale",
        monthly: "Mensile",
        yearly: "Annuale"
      },
      interestRate: "Tasso di Interesse Annuo (%)",
      interestRatePlaceholder: "Inserisci tasso",
      years: "Periodo di Investimento (Anni)",
      yearsPlaceholder: "Numero di anni",
      calculate: "Calcola"
    },
    
    // Results
    results: {
      title: "Riepilogo Investimento",
      parameters: "Parametri Utilizzati",
      statistics: "Statistiche",
      
      initialInvestment: "Investimento Iniziale",
      totalRecurringDeposits: "Totale Versamenti Ricorrenti",
      totalDeposits: "Totale Depositi",
      
      simpleInterest: {
        title: "Interesse Semplice",
        totalInterest: "Totale Interessi (Semplice)",
        averageRate: "Tasso di Interesse Medio",
        finalAmount: "Importo Finale (Semplice)",
        explanation: "L'interesse semplice viene calcolato solo sul capitale iniziale. Ogni periodo genera lo stesso importo fisso di interessi.",
        formula: "Interesse = Capitale × Tasso × Tempo",
        formulaDetailed: {
          title: "Formula dell'Interesse Semplice Spiegata",
          mainFormula: "Interesse Totale = (P × r × t) + Σ(PMT × r × t_rimanente)",
          where: "Dove:",
          params: {
            p: "P = Capitale (investimento iniziale)",
            r: "r = Tasso di interesse annuo (in decimale, es. 5% = 0,05)",
            t: "t = Tempo in anni",
            pmt: "PMT = Importo del versamento ricorrente",
            tRemaining: "t_rimanente = Tempo rimanente per ogni versamento per maturare interessi"
          },
          example: "Esempio: €10.000 al 5% per 10 anni = €10.000 × 0,05 × 10 = €5.000 di interessi sul capitale. Più gli interessi su ogni versamento ricorrente calcolati per il tempo rimanente."
        }
      },
      
      compoundInterest: {
        title: "Interesse Composto",
        totalInterest: "Totale Interessi (Composto)",
        averageRate: "Tasso di Interesse Effettivo",
        finalAmount: "Importo Finale (Composto)",
        explanation: "L'interesse composto viene calcolato sul capitale più tutti gli interessi accumulati. I tuoi guadagni generano ulteriori guadagni, creando una crescita esponenziale.",
        formula: "VF = P(1+r/n)^(n×t) + Σ[PMT × (1+r/n)^periodi_rimanenti]",
        formulaDetailed: {
          title: "Formula dell'Interesse Composto Spiegata",
          mainFormula: "VF = P(1+r/n)^(n×t) + Σ[PMT × (1+r/n)^periodi_rimanenti]",
          where: "Dove:",
          params: {
            fv: "VF = Valore Futuro (importo finale)",
            p: "P = Capitale (importo dell'investimento iniziale)",
            r: "r = Tasso di interesse annuo (in decimale, 5% = 0,05)",
            n: "n = Numero di periodi di capitalizzazione all'anno (12 per mensile, 52 per settimanale, 1 per annuale)",
            t: "t = Tempo in anni",
            pmt: "PMT = Importo del pagamento/deposito ricorrente",
            remainingPeriods: "periodi_rimanenti = Numero di periodi rimanenti per ogni deposito da capitalizzare",
            sigma: "Σ (Sigma) = Somma di tutti i depositi ricorrenti, ciascuno capitalizzato per il tempo rimanente"
          },
          breakdown: {
            title: "Scomposizione della Formula:",
            part1: {
              title: "Parte 1: P(1+r/n)^(n×t)",
              desc: "Calcola come cresce il capitale iniziale con l'interesse composto"
            },
            part2: {
              title: "Parte 2: Σ[PMT × (1+r/n)^periodi_rimanenti]",
              desc: "Aggiunge il valore futuro di tutti i versamenti ricorrenti. Ogni deposito viene capitalizzato solo per i periodi dal momento in cui è stato effettuato fino alla fine"
            }
          },
          example: {
            title: "Esempio di Calcolo:",
            scenario: "€10.000 iniziali + €500 mensili al 5% annuo per 10 anni",
            steps: [
              "Tasso mensile = 5% ÷ 12 = 0,4167% (0,004167)",
              "Periodi totali = 12 × 10 = 120 mesi",
              "Capitale iniziale dopo 10 anni: €10.000 × (1,004167)^120 = €16.470",
              "Primo deposito di €500 si capitalizza per 119 periodi: €500 × (1,004167)^119",
              "Secondo deposito di €500 si capitalizza per 118 periodi: €500 × (1,004167)^118",
              "... e così via per tutti i 120 depositi mensili",
              "Sommare tutti i depositi con i loro interessi composti",
              "Risultato: Crescita del capitale + Tutti i depositi capitalizzati = Totale"
            ]
          },
          note: "La differenza chiave: nell'interesse composto, gli interessi di ogni periodo vengono aggiunti al capitale, quindi il periodo successivo guadagna interessi su un importo maggiore. Questo crea una crescita esponenziale."
        }
      },
      
      chart: {
        title: "Crescita dell'Investimento nel Tempo",
        simpleInterest: "Interesse Semplice",
        compoundInterest: "Interesse Composto",
        year: "Anno",
        amount: "Importo (€)",
        exportCSV: "Esporta CSV",
        exportPDF: "Esporta PDF"
      }
    },
    
    // Explanations
    explanations: {
      initialInvestment: {
        title: "Investimento Iniziale",
        text: "L'importo di partenza che investi all'inizio. Questo è il tuo capitale principale."
      },
      totalRecurringDeposits: {
        title: "Totale Versamenti Ricorrenti",
        text: "Somma di tutti i depositi aggiuntivi effettuati durante il periodo di investimento.",
        formula: "Depositi annui × Numero di anni × Importo deposito"
      },
      totalDeposits: {
        title: "Totale Depositi",
        text: "Totale combinato del tuo investimento iniziale e di tutti i depositi ricorrenti.",
        formula: "Investimento Iniziale + Totale Versamenti Ricorrenti"
      }
    }
  }
};