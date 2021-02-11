function CheckoutService(transactions, cart) {
  this.checkout = function(userId) {
    let transId = '';
    return transactions.addTransaction({user_id: userId, })
      .then(id => {
        transId = id;
        return cart.getCart(userId);
      })
      .then(items => {
        let insertValues = [];
        for (let row of items) {
          let tmp = [ transId, row['product_id'], row['price'], ];
          insertValues.push(tmp);
        }

        return transactions.addTransactionProducts(insertValues);
      })
      .then((result) => {
        if (result.affectedRows > 0) {
          console.log('INSERT GOOD');
        }

        cart.clearCart(userId);
      })
  };
}
module.exports = CheckoutService;
