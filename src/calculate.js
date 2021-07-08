const { Fraction } = require("./classes/Fraction");
const {
  helpPreventOverflow,
} = require("./helperfunctions/helpPreventOverflow");

/* NOTES ON THIS ALGORITHM:
 * As I increased the functionality of OneLogin's request (build a fractional calculator that could handle a single
 * math operation [*, /, +, or -]); having an algorithm that could accurately handle mathematical order of operations is required.
 * The algorithm is a two pass solution that uses a queue. On the first pass numbers that will be used in a [+, -] operation
 * are added to the queue while those used in a [*, /] operation are calculated with the result being added to the queue when necessary.
 * Once the original array is traversed, the queue is then summed together during the second traversal.
 */

const calculate = (input) => {
  const pointer = 1;
  const addSubArr = [];
  doMultDiv(input, pointer, addSubArr, 0);
  const result = doAddSub(addSubArr, pointer, 0);
  return result;
};

/* In this function we store temporary summation results in a variable called currSum. Depending on the order of the mathematical
 * operators in our input, currSum is sometimes added into our queue array and reset.
 */

const doMultDiv = (input, pointer, addSubArr, currSum) => {
  //If only one argument was entered, exit
  if (input.length === 1) {
    addSubArr.push(input[0]);
    return;
  }
  //If we are out of bounds...
  if (pointer >= input.length) {
    //Check if we have any non-consumed numbers...
    currSum ? addSubArr.push(currSum) : void 0;
    input[pointer - 2] === "+" || input[pointer - 2] === "-"
      ? addSubArr.push(input[pointer - 1])
      : void 0;
    //and exit
    return;
  }
  //If our pointer sees [*, /], if we already have a currSum available, use it in the calculation, else use the number found at [point-1]
  if (input[pointer] === "*") {
    currSum = Fraction.multiply(
      currSum ? currSum : input[pointer - 1],
      input[pointer + 1]
    );
  } else if (input[pointer] === "/") {
    currSum = Fraction.divide(
      currSum ? currSum : input[pointer - 1],
      input[pointer + 1]
    );
  } else {
    //Else if our pointer sees a [+, -], if there is a currSum, it should be pushed onto our array to be used in the second pass.
    //If there isn't, then the number found at [pointer-1] as well as our [+, -] math operater, should be pushed onto our array
    //WE AREN":T RESETTING CURRSUM, IS THIS RIGHT??? CHECK IN THE AM
    currSum
      ? (addSubArr.push(currSum), (currSum = 0))
      : addSubArr.push(input[pointer - 1]);
    addSubArr.push(input[pointer]);
  }
  //At each step we should reduce our fraction to help prevent an overflow from occurring
  currSum = currSum ? helpPreventOverflow(currSum) : currSum;
  //Recursively call our function until our pointer is outside of our input arrays bounds
  doMultDiv(input, pointer + 2, addSubArr, currSum);
};

const doAddSub = (addSubArr, pointer, currSum) => {
  currSum = currSum ? currSum : addSubArr[0];
  currSum = helpPreventOverflow(currSum);
  //If we are out of bounds return our sum
  if (pointer >= addSubArr.length) {
    return currSum;
  }
  //If we see a [+], add our numbers, else subtract our numbers
  currSum =
    addSubArr[pointer] === "+"
      ? Fraction.add(currSum, addSubArr[pointer + 1])
      : Fraction.subtract(currSum, addSubArr[pointer + 1]);
  //recursively call our function until our pointer is outside of our arrays bounds
  return doAddSub(addSubArr, pointer + 2, currSum);
};

module.exports.calculate = calculate;
