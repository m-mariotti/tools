/**
 * Investment Calculator Utility Functions
 * Handles validation and calculations for simple and compound interest
 */

/**
 * Validates investment input values
 * @param {Object} values - Input values to validate
 * @param {string} language - Current language ('en' or 'it')
 * @returns {Object} Object containing validation errors (empty if valid)
 */
export function validateInvestmentInputs(values, language) {
  const errors = {};

  const principal = parseFloat(values.initialInvestment);
  const deposit = parseFloat(values.recurringDeposit);
  const rate = parseFloat(values.interestRate);
  const period = parseInt(values.years);

  if (!principal || principal < 0 || principal > 10000000) {
    errors.initialInvestment = language === 'it'
      ? 'Inserisci un importo tra €0 e €10.000.000'
      : 'Enter an amount between €0 and €10,000,000';
  }

  if (deposit < 0 || deposit > 1000000) {
    errors.recurringDeposit = language === 'it'
      ? 'Inserisci un importo tra €0 e €1.000.000'
      : 'Enter an amount between €0 and €1,000,000';
  }

  if (!rate || rate < 0 || rate > 100) {
    errors.interestRate = language === 'it'
      ? 'Inserisci un tasso tra 0% e 100%'
      : 'Enter a rate between 0% and 100%';
  }

  if (!period || period < 1 || period > 100) {
    errors.years = language === 'it'
      ? 'Inserisci un periodo tra 1 e 100 anni'
      : 'Enter a period between 1 and 100 years';
  }

  return errors;
}

/**
 * Gets deposits per year based on frequency
 * @param {string} frequency - 'weekly', 'monthly', or 'yearly'
 * @returns {number} Number of deposits per year
 */
export function getDepositsPerYear(frequency) {
  switch (frequency) {
    case 'weekly': return 52;
    case 'monthly': return 12;
    case 'yearly': return 1;
    default: return 12;
  }
}

/**
 * Calculates simple interest on investment with recurring deposits
 * @param {number} principal - Initial investment amount
 * @param {number} deposit - Recurring deposit amount
 * @param {number} rate - Annual interest rate (as decimal, e.g., 0.05 for 5%)
 * @param {number} years - Investment period in years
 * @param {number} depositsPerYear - Number of deposits per year
 * @returns {Object} Simple interest calculation results
 */
export function calculateSimpleInterest(principal, deposit, rate, years, depositsPerYear) {
  const totalRecurringDeposits = deposit * depositsPerYear * years;
  const totalDeposits = principal + totalRecurringDeposits;

  // Interest on initial investment
  let interestTotal = principal * rate * years;

  // Interest on recurring deposits
  const totalDepositsCount = depositsPerYear * years;
  for (let i = 1; i <= totalDepositsCount; i++) {
    const yearsRemaining = (totalDepositsCount - i) / depositsPerYear;
    interestTotal += deposit * rate * yearsRemaining;
  }

  const finalAmount = totalDeposits + interestTotal;

  return {
    totalRecurringDeposits,
    totalDeposits,
    interestTotal,
    finalAmount
  };
}

/**
 * Calculates compound interest on investment with recurring deposits
 * @param {number} principal - Initial investment amount
 * @param {number} deposit - Recurring deposit amount
 * @param {number} rate - Annual interest rate (as decimal, e.g., 0.05 for 5%)
 * @param {number} years - Investment period in years
 * @param {number} depositsPerYear - Number of deposits per year
 * @returns {Object} Compound interest calculation results
 */
export function calculateCompoundInterest(principal, deposit, rate, years, depositsPerYear) {
  const periodicRate = rate / depositsPerYear;
  const totalPeriods = depositsPerYear * years;

  // Future value of initial investment
  let finalAmount = principal * Math.pow(1 + periodicRate, totalPeriods);

  // Future value of recurring deposits
  for (let i = 1; i <= totalPeriods; i++) {
    const periodsRemaining = totalPeriods - i;
    finalAmount += deposit * Math.pow(1 + periodicRate, periodsRemaining);
  }

  const totalRecurringDeposits = deposit * depositsPerYear * years;
  const totalDeposits = principal + totalRecurringDeposits;
  const interestTotal = finalAmount - totalDeposits;

  return {
    totalRecurringDeposits,
    totalDeposits,
    interestTotal,
    finalAmount
  };
}

/**
 * Generates chart data points for both simple and compound interest
 * @param {number} principal - Initial investment amount
 * @param {number} deposit - Recurring deposit amount
 * @param {number} rate - Annual interest rate (as decimal, e.g., 0.05 for 5%)
 * @param {number} years - Investment period in years
 * @param {number} depositsPerYear - Number of deposits per year
 * @returns {Array} Array of data points with year, simple, and compound values
 */
export function generateChartData(principal, deposit, rate, years, depositsPerYear) {
  const chartDataPoints = [];

  for (let year = 0; year <= years; year++) {
    // Simple interest for this year
    let simpleYearInterest = principal * rate * year;
    const depositsUpToYear = depositsPerYear * year;

    for (let i = 1; i <= depositsUpToYear; i++) {
      const yearsForThisDeposit = (depositsUpToYear - i) / depositsPerYear;
      simpleYearInterest += deposit * rate * yearsForThisDeposit;
    }

    const simpleAmount = principal + (deposit * depositsUpToYear) + simpleYearInterest;

    // Compound interest for this year
    const periodicRate = rate / depositsPerYear;
    const periodsInYear = depositsPerYear * year;

    let compoundYearTotal = principal * Math.pow(1 + periodicRate, periodsInYear);

    for (let i = 1; i <= periodsInYear; i++) {
      const periodsRemaining = periodsInYear - i;
      compoundYearTotal += deposit * Math.pow(1 + periodicRate, periodsRemaining);
    }

    chartDataPoints.push({
      year,
      simple: Math.round(simpleAmount * 100) / 100,
      compound: Math.round(compoundYearTotal * 100) / 100
    });
  }

  return chartDataPoints;
}

/**
 * Formats currency value based on language
 * @param {number} value - Value to format
 * @param {string} language - Current language ('en' or 'it')
 * @returns {string} Formatted currency string
 */
export function formatCurrency(value, language) {
  return new Intl.NumberFormat(language === 'it' ? 'it-IT' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(value);
}

/**
 * Formats percentage value
 * @param {number} value - Value to format
 * @returns {string} Formatted percentage string
 */
export function formatPercentage(value) {
  return `${value.toFixed(2)}%`;
}
