/**
 * Validates input values for proportion calculation
 * @param {Array} values - Array of 4 values (a, b, c, d)
 * @returns {Object} { isValid, error }
 */
export function validateProportionInputs(values) {
  const emptyCount = values.filter(v => v === '' || v === null || v === undefined).length;

  if (emptyCount !== 1) {
    return {
      isValid: false,
      error: 'needThreeValues'
    };
  }

  const numericValues = values.map(v => v === '' ? null : parseFloat(v));
  const definedValues = numericValues.filter(v => v !== null);

  if (definedValues.some(v => isNaN(v))) {
    return {
      isValid: false,
      error: 'invalidValues'
    };
  }

  return { isValid: true, error: null };
}

/**
 * Calculates the missing value in a proportion a:b = c:d
 * Uses the fundamental property: a × d = b × c
 * @param {number|null} a - First value
 * @param {number|null} b - Second value
 * @param {number|null} c - Third value
 * @param {number|null} d - Fourth value
 * @returns {Object} { unknown, solution, calculationSteps, error }
 */
export function calculateProportion(a, b, c, d) {
  let unknown = '';
  let solution = 0;
  let calculationSteps = '';

  // Find missing value using fundamental property: a × d = b × c
  if (a === null) {
    // a = (b × c) / d
    if (d === 0) {
      return { error: 'divisionByZero' };
    }
    solution = (b * c) / d;
    unknown = 'a';
    calculationSteps = `a × ${d} = ${b} × ${c}\na = (${b} × ${c}) / ${d}\na = ${solution}`;
  } else if (b === null) {
    // b = (a × d) / c
    if (c === 0) {
      return { error: 'divisionByZero' };
    }
    solution = (a * d) / c;
    unknown = 'b';
    calculationSteps = `${a} × ${d} = b × ${c}\nb = (${a} × ${d}) / ${c}\nb = ${solution}`;
  } else if (c === null) {
    // c = (a × d) / b
    if (b === 0) {
      return { error: 'divisionByZero' };
    }
    solution = (a * d) / b;
    unknown = 'c';
    calculationSteps = `${a} × ${d} = ${b} × c\nc = (${a} × ${d}) / ${b}\nc = ${solution}`;
  } else if (d === null) {
    // d = (b × c) / a
    if (a === 0) {
      return { error: 'divisionByZero' };
    }
    solution = (b * c) / a;
    unknown = 'd';
    calculationSteps = `${a} × d = ${b} × ${c}\nd = (${b} × ${c}) / ${a}\nd = ${solution}`;
  }

  return {
    unknown,
    solution,
    calculationSteps,
    error: null
  };
}

/**
 * Formats the complete proportion result with verification
 * @param {Object} values - Object with a, b, c, d values
 * @param {string} unknown - Which value was calculated
 * @param {number} solution - Calculated value
 * @param {string} calculationSteps - Steps string
 * @returns {Object} Formatted result object
 */
export function formatProportionResult(values, unknown, solution, calculationSteps) {
  const finalValues = {
    a: values.a !== null ? values.a : solution,
    b: values.b !== null ? values.b : solution,
    c: values.c !== null ? values.c : solution,
    d: values.d !== null ? values.d : solution
  };

  // Cross-multiplication verification
  const leftProduct = finalValues.a * finalValues.d;
  const rightProduct = finalValues.b * finalValues.c;

  return {
    unknown,
    solution: solution.toFixed(4),
    proportion: `${finalValues.a.toFixed(2)} : ${finalValues.b.toFixed(2)} = ${finalValues.c.toFixed(2)} : ${finalValues.d.toFixed(2)}`,
    calculation: calculationSteps,
    verification: `${finalValues.a.toFixed(2)} × ${finalValues.d.toFixed(2)} = ${leftProduct.toFixed(4)}\n${finalValues.b.toFixed(2)} × ${finalValues.c.toFixed(2)} = ${rightProduct.toFixed(4)}`
  };
}
