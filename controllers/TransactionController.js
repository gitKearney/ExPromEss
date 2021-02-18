function TransactionController(authService, userService, transactionService) {
  this.get = function(transId, bearer) {
    let requires = 'read';

    return authService.decode(bearer)
      .then((user) => userService.userHasPermission(user.data['user_id'], requires))
      .then((user) => transactionService.getTransactions(transId, user));
  };

  this.patch = function(transId, body, bearer) {
    let requires = 'edit';
    let userId = '';

    if(Object.prototype.hasOwnProperty.call(body, 'user_id')) {
      userId = body['user_id'];
    }

    return authService.decode(bearer)
      .then((user) => userService.userHasPermission(user.data['user_id'], requires))
      .then(() => transactionService.updateTransaction(transId, userId));
  };
}

module.exports = TransactionController;
