const { getGCD } = require("./getGCD");
//returns the Lowest Common Divisor of two numbers
//Derived from: https://www.geeksforgeeks.org/least-common-denominator-lcd/
const getLCD = (num1, num2) => {
  return (num1 * num2) / getGCD(num1, num2);
};

module.exports.getLCD = getLCD;
