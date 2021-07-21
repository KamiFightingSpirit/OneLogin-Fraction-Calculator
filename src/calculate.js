const { Fraction } = require("./classes/Fraction");
const {
  helpPreventOverflow,
} = require("./helperfunctions/helpPreventOverflow");

/* NOTES ON THIS ALGORITHM:
 * As I increased the functionality of OneLogin's request (build a fractional calculator that could handle a single
 * math operation [*, /, +, or -]); having an algorithm that could accurately handle mathematical order of operations is required.
 * The algorithm is a two pass solution that uses an array to hold the [+, -] operations for the second traversel.
 * On the first pass numbers that will be used in a [+, -] operation are added to the new array while those used in a [*, /] operation
 * are calculated with the result being added to the queue when necessary.
 * Once the original array is traversed, the second array is summed together during the second traversal.
 */

const calculate = (input) => {
  const addSubArr = [];
  let pointer = 1;
  let currSum = helpPreventOverflow(input[0]);
  // If only one argument was entered, exit
  if (input.length === 1) {
    return currSum;
  }
  while (pointer <= input.length) {
    if (input[pointer] === "*") {
      currSum = Fraction.multiply(currSum, input[pointer + 1]);
    } else if (input[pointer] === "/") {
      currSum = Fraction.divide(currSum, input[pointer + 1]);
    } else {
      //Else if our pointer sees a [+, -], if there is a currSum, it should be pushed onto our array to be used in the second pass.
      //If there isn't, then the number found at [pointer-1] as well as our [+, -] math operater, should be pushed onto our array
      currSum
        ? (addSubArr.push(currSum), (currSum = 0))
        : addSubArr.push(input[pointer - 1]);
      input[pointer] ? addSubArr.push(input[pointer]) : void 0;
    }
    //At each step we should reduce our fraction to help prevent an overflow from occurring
    currSum = currSum ? helpPreventOverflow(currSum) : currSum;
    //Recursively call our function until our pointer is outside of our input arrays bounds
    pointer += 2;
  }
  if (addSubArr.length === 1) {
    return addSubArr[0];
  }

  //reset our pointer & currSum
  pointer = 1;
  currSum = 0;
  while (pointer < addSubArr.length) {
    currSum = currSum ? currSum : addSubArr[0];
    currSum = helpPreventOverflow(currSum);
    //If we see a [+], add our numbers, else subtract our numbers
    currSum =
      addSubArr[pointer] === "+"
        ? Fraction.add(currSum, addSubArr[pointer + 1])
        : Fraction.subtract(currSum, addSubArr[pointer + 1]);
    pointer += 2;
  }
  return currSum;
};

module.exports.calculate = calculate;
