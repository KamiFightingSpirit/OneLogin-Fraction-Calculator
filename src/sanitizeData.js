/*
 * Assumption -- There are 4 valid forms of input data, e.g:
 *   1. 25_25/25    -> whole number with fraction
 *   2. 29/25       -> proper or improper fractions
 *   3. 25          -> integers
 *   4. + - * or /  -> math operators
 *
 * This function converts the first three into tractable Fraction objects; replacing the original values in the input array.
 *    newFractionObj = {
 *        isNeg : boolean (0 or 1),
 *        numerator : int,
 *        denominator : int
 *    }
 */
const { RegexPackage } = require("./classes/RegexTests.js");
const { Fraction } = require("./classes/Fraction");

const sanitizeData = (input) => {
  const regexTests = new RegexPackage();

  for (let i = 0; i < input.length; i++) {
    const currentArg = input[i];
    const isNeg = currentArg[0] === "-" ? 1 : 0;
    const splitStart = isNeg ? 1 : 0;
    const denominator = parseInt(currentArg.split("/").pop());
    //PARSE INTEGERS
    if (regexTests.intRegex.test(currentArg)) {
      const numerator = isNeg
        ? parseInt(currentArg.slice(1))
        : parseInt(currentArg);
      input[i] = new Fraction(isNeg, numerator, 1);
    }
    //PARSE FRACTIONS
    if (regexTests.fractionRegex.test(currentArg)) {
      let numerator = parseInt(
        currentArg.substring(splitStart, currentArg.indexOf("/"))
      );
      input[i] = new Fraction(isNeg, numerator, denominator);
    }
    //PARSE INTEGERS WITH FRACTIONS
    if (regexTests.fractionWIntRegex.test(currentArg)) {
      let int = parseInt(
        currentArg.substring(splitStart, currentArg.indexOf("_"))
      );
      let numerator = parseInt(
        currentArg.substring(
          currentArg.indexOf("_") + 1,
          currentArg.indexOf("/")
        )
      );
      numerator = int * denominator + numerator;
      input[i] = new Fraction(isNeg, numerator, denominator);
    }
  }
};

module.exports.sanitizeData = sanitizeData;
