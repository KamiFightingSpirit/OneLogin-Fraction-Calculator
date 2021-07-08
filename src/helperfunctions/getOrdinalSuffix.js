//Adds correct grammer to indexes, e.g: 1st, 2nd, 3rd etc.
const getOrdinalSuffix = (i) => {
  let j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
};

module.exports.getOrdinalSuffix = getOrdinalSuffix;
