var S_Coin = artifacts.require("./S_Coin.sol");

contract('S_Coin', function(accounts) {
  it("should put 100000 SCoin in the first account", function() {
    return S_Coin.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 100000, "100000 wasn't in the first account");
    });
  });
  it("should call a function that depends on a linked library", function() {
    var s_c;
    var SCoinBalance;
    var SCoinEthBalance;

    return S_Coin.deployed().then(function(instance) {
      s_c = instance;
      return s_c.getBalance.call(accounts[0]);
    }).then(function(outCoinBalance) {
      SCoinBalance = outCoinBalance.toNumber();
      return s_c.getBalanceInEth.call(accounts[0]);
    }).then(function(outCoinBalanceEth) {
      SCoinEthBalance = outCoinBalanceEth.toNumber();
    }).then(function() {
      assert.equal(SCoinEthBalance, 2 * SCoinBalance, "Library function returned unexpected function, linkage may be broken");
    });
  });
  it("should send coin correctly", function() {
    var s_c;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return S_Coin.deployed().then(function(instance) {
      s_c = instance;
      return s_c.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return s_c.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return s_c.sendCoin(account_two, amount, {from: account_one});
    }).then(function() {
      return s_c.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return s_c.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
});
