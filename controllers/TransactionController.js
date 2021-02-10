function TransactionController(authService, userService, transactionService) {
  this.get = function(transId = '') {
    return transactionService.getTransactions(transId);
  };

  this.patch = function(transId, body) {
    let userId = '';
    if(Object.prototype.hasOwnProperty.call(body, 'user_id')) {
      userId = body['user_id'];
    }

    return transactionService.updateTransaction(transId, userId);
  };
}

module.exports = TransactionController;
