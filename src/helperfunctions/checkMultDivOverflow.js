const { AssertionError } = require("assert");

const checkMultDivOverflow = (a, b) => {
  //avoid dividing by zero
  if (a === 0 || b === 0) {
    return;
  }
  const c = a * b;
  if (a !== c / b || b !== c / a) {
    throw new AssertionError({
      message: "Overflow Error",
    });
  }
};
module.exports.checkMultDivOverflow = checkMultDivOverflow;
