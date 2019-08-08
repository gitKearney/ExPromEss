function BaseError(message) {
  Error.call(message);

  this.errorCode = 0;

  this.setErrorCode = (newValue) => {
    this.errorCode = newValue;
    return this;
  };

  this.getErrorCode = () => {
    return this.errorCode;
  };
}

module.exports = BaseError;
