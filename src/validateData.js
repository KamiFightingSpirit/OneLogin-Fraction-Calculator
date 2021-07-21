const { getOrdinalSuffix } = require("./helperfunctions/getOrdinalSuffix");
const { RegexPackage } = require("./classes/RegexTests.js");
const { SyntaxError } = require("./classes/SyntaxError");

//If no arguments, exit immediately
const validateData = (input) => {
  if (!input) {
    throw new SyntaxError("Kindly provide numbers to calculate");
  }

  const regexTests = new RegexPackage();

  //Loop through our input performing the necessary sanitization checks
  for (let i = 0; i < input.length; i++) {
    const indexOfError = getOrdinalSuffix(i + 1);
    const currentArg = input[i];
    const nextArg = i + 1 < input.length ? input[i + 1] : null;
    //Run regex tests on the current and next arguments
    const operatorRegexTest = regexTests.operatorRegex.test(currentArg);
    const nextOperatorRegexTest = regexTests.operatorRegex.test(nextArg);
    const numTests =
      !regexTests.fractionWIntRegex.test(currentArg) &&
      !regexTests.fractionRegex.test(currentArg) &&
      !regexTests.intRegex.test(currentArg);
    const nextNumTests =
      regexTests.fractionWIntRegex.test(nextArg) ||
      regexTests.fractionRegex.test(nextArg) ||
      regexTests.intRegex.test(nextArg);

    //Make sure nothing is divided by zero
    if (parseInt(input[i]) === 0) {
      if (input[i - 1] === "/") {
        throw new SyntaxError(
          `Error: Cannot divide by zero. The error was found in the ${indexOfError} argument: ${currentArg}`
        );
      }
      //Make sure there are no leading zeros
    } else if (parseInt(input[i][0]) === 0) {
      throw new SyntaxError(
        `Error: Inputs should not start with zero. The error was found in the ${indexOfError} argument: ${currentArg}`
      );
    }
    //Check the first argument to make it isn't a math operator
    if (i === 0 && operatorRegexTest) {
      throw new SyntaxError(
        `Error: Your input starts with a ${currentArg}, your first argument should be a number`
      );
    }
    //Check to make sure the last argument isn't a math operator
    if (i === input.length - 1 && operatorRegexTest) {
      throw new SyntaxError(
        `Error: Your input ends with a ${currentArg}, your last argument should be a number`
      );
    }
    //Check to make sure that the arguments passed in follow the pattern of number - operator - number etc.
    //Check two operators in a row
    if (operatorRegexTest && nextOperatorRegexTest) {
      throw new SyntaxError(
        `Error: Your input has two or more math operators in a row. The error was found starting with the ${indexOfError} argument: ${currentArg}`
      );
    }
    //Check two numbers in a row
    if (!numTests && nextNumTests) {
      throw new SyntaxError(
        `Error: Your input has two or more numbers in a row. The error was found starting with the ${indexOfError} argument: ${currentArg}`
      );
    }
    //Tests all the regexes, if none pass then there is an invalid input
    if (numTests && !operatorRegexTest) {
      throw new SyntaxError(
        `Error: Your input contains a syntax error. The error was found in the ${indexOfError} argument: ${currentArg}`
      );
    }
  }
  return void 0;
};

module.exports.validateData = validateData;
