const { getGCD } = require("./getGCD");

//Reduces fractions so that they are less likely to overflow
const helpPreventOverflow = (num) => {
  const gcd = getGCD(num.numerator, num.denominator);
  num.numerator /= gcd;
  num.denominator /= gcd;
  return num;
};

module.exports.helpPreventOverflow = helpPreventOverflow;
