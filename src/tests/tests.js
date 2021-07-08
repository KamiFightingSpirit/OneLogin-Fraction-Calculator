const { fractionCalculator } = require("../fractionCalculator");
const assert = require("assert").strict;
const { failureData: fD, successData: sD } = require("./data/testdata");

const tests = (fD, sD) => {
  //Test AssertionErrors (we expect these to fail)
  for (let test = 0; test < fD.inputFailureData.length; test++) {
    try {
      fractionCalculator(fD.inputFailureData[test]); // this should fail
      assert.fail("expected exception not thrown"); // this throws an AssertionError
    } catch (e) {
      // this catches all errors, thrown by the function under test and those thrown by assert.fail
      assert.strictEqual(e.message, fD.failureAnswers[test]);
      console.log(`TEST SUCCESS: ${fD.failureComments[test]}`);
    }
  }
  //Test the Calculator's Accuracy and functionality
  for (let test = 0; test < sD.inputSuccessData.length; test++) {
    assert.deepStrictEqual(
      fractionCalculator(sD.inputSuccessData[test]),
      sD.successAnswers[test]
    );
    console.log(`TEST SUCCESS: ${sD.successComments[test]}`);
  }
};

tests(fD, sD);
