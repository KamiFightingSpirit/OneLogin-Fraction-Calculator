const {
  checkAddSubOverflow,
} = require("../helperfunctions/checkAddSubOverflow");
const {
  checkMultDivOverflow,
} = require("../helperfunctions/checkMultDivOverflow");
const { getLCD } = require("../helperfunctions/getLCD");

class Fraction {
  constructor(isNeg, numerator, denominator) {
    this.isNeg = isNeg;
    this.numerator = numerator;
    this.denominator = denominator;
  }

  static add(f1, f2) {
    if (f1.denominator != f2.denominator) {
      const lcd = getLCD(f1.denominator, f2.denominator);
      f1.numerator *= lcd / f1.denominator;
      f2.numerator *= lcd / f2.denominator;
      f1.denominator = lcd;
      f2.denominator = lcd;
    }
    //check for overflow
    const shouldCheckOverFlow = !(f1.isNeg ^ f2.isNeg);
    if (shouldCheckOverFlow) {
      checkAddSubOverflow(f1.numerator, f2.numerator);
    }

    //if it doesn't create a new fraction object
    let numerator =
      f1.numerator * (f1.isNeg ? -1 : 1) + f2.numerator * (f2.isNeg ? -1 : 1);
    const isNeg = numerator < 0 ? 1 : 0;
    numerator = Math.abs(numerator);

    const currentSum = new Fraction(isNeg, numerator, f1.denominator);
    return currentSum;
  }

  static subtract(f1, f2) {
    if (f1.denominator != f2.denominator) {
      const lcd = getLCD(f1.denominator, f2.denominator);
      f1.numerator *= lcd / f1.denominator;
      f2.numerator *= lcd / f2.denominator;
      f1.denominator = lcd;
      f2.denominator = lcd;
    }
    //check for overflow
    const shouldCheckOverFlow = f1.isNeg ^ f2.isNeg;
    if (shouldCheckOverFlow) {
      checkAddSubOverflow(f1.numerator, f2.numerator);
    }

    let numerator =
      f1.numerator * (f1.isNeg ? -1 : 1) - f2.numerator * (f2.isNeg ? -1 : 1);
    const isNeg = numerator < 0 ? 1 : 0;
    numerator = Math.abs(numerator);
    const currentSum = new Fraction(isNeg, numerator, f1.denominator);
    return currentSum;
  }

  static multiply(f1, f2) {
    //check for overflow
    checkMultDivOverflow(f1.numerator, f2.numerator);
    checkMultDivOverflow(f1.denominator, f2.denominator);
    const isNeg = f1.isNeg ^ f2.isNeg;
    const numerator = f1.numerator * f2.numerator;
    const denominator = f1.denominator * f2.denominator;
    const currentSum = new Fraction(isNeg, numerator, denominator);
    return currentSum;
  }

  static divide(f1, f2) {
    //check for overflow
    checkMultDivOverflow(f1.numerator, f2.denominator);
    checkMultDivOverflow(f1.denominator, f2.numerator);
    const isNeg = f1.isNeg ^ f2.isNeg;
    const numerator = f1.numerator * f2.denominator;
    const denominator = f1.denominator * f2.numerator;
    const currentSum = new Fraction(isNeg, numerator, denominator);
    return currentSum;
  }
}

module.exports.Fraction = Fraction;
