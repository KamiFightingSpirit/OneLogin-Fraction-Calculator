//returns the Greatest Common Divisor of two numbers
//Derived from: https://www.geeksforgeeks.org/least-common-denominator-lcd/
const getGCD = (num1, num2) => {
  if (parseInt(num1) === 0) {
    return num2;
  }

  return getGCD(num2 % num1, num1);
};

module.exports.getGCD = getGCD;
