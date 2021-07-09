class SyntaxError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports.SyntaxError = SyntaxError;
