const { AssertionError } = require("assert");

const checkAddSubOverflow = (a, b) => {
  const c = a + b;
  if (a !== c - b || b !== c - a) {
    throw new AssertionError({
      message: "Overflow Error",
    });
  }
};

module.exports.checkAddSubOverflow = checkAddSubOverflow;
