const { validateData } = require("./validateData.js");
const { sanitizeData } = require("./sanitizeData");
const { calculate } = require("./calculate");
const { getOutPutFormat } = require("./helperfunctions/getOutputFormat");

function fractionCalculator(nums) {
  //Select only the arguments passed in by the user
  var input = process.argv.slice(2).length ? process.argv.slice(2) : nums;
  //Checks for any errors in the input data, throws the error if any are found
  validateData(input);
  //Converts the input data into uniform data types
  sanitizeData(input);
  //Recurse through input returning a summed Fraction object
  const currentSum = calculate(input);
  //Format answer
  const answer = getOutPutFormat(currentSum);
  console.log("Answer:", answer);
  return answer;
}

module.exports.fractionCalculator = fractionCalculator;
