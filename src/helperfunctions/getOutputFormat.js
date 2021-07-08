const getOutPutFormat = (num) => {
  const isNeg = num.isNeg ? "-" : "";
  const integer = Math.floor(num.numerator / num.denominator);
  const remainder = Math.floor(num.numerator % num.denominator);
  if (remainder === 0) {
    //corner case to avoid a "-0" answer
    if (integer === 0) {
      const answer = 0;
      return answer.toString();
    }
    //integer answer
    return isNeg + integer.toString();
  } else if (integer === 0) {
    //fraction answer
    return isNeg + remainder + "/" + num.denominator;
  } else {
    //integer with fraction
    return isNeg + integer.toString() + "_" + remainder + "/" + num.denominator;
  }
};

module.exports.getOutPutFormat = getOutPutFormat;
