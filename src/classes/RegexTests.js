//REGEXES FOR PERMITTED INPUTS:
class RegexPackage {
  constructor() {
    //Follows the same pattern as: 12_231/2424
    this.fractionWIntRegex = new RegExp(
      /^-?[1-9][0-9]*_[1-9][0-9]*\/[1-9][0-9]*$/
    );
    //Follows the same pattern as: 52/1002
    this.fractionRegex = new RegExp(/^-?[1-9][0-9]*\/[1-9][0-9]*$/);
    //A whole number
    this.intRegex = new RegExp(/^-?[0-9][0-9]*$/);
    //Only allows the math operators: * / + -
    this.operatorRegex = new RegExp(/^[*\/+-]?$/);
  }
}

module.exports.RegexPackage = RegexPackage;
