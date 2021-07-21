class OverflowError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports.OverflowError = OverflowError;
