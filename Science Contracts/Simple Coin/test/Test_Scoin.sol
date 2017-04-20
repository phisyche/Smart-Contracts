pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/S_Coin.sol";

contract Test_Scoin {

  function testInitialBalanceUsingDeployedContract() {
    S_Coin s_c = S_Coin(DeployedAddresses.S_Coin());

    uint expected = 10000;

    Assert.equal(s_c.getBalance(tx.origin), expected, "Owner should have 10000 SCoins initially");
  }

  function testInitialBalanceWithNewSCoin() {
    S_Coin s_c = new S_Coin();

    uint expected = 10000;

    Assert.equal(s_c.getBalance(tx.origin), expected, "Owner should have 10000 SCoin initially");
  }

}
