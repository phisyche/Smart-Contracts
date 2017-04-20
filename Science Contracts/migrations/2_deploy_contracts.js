var ConvertLib = artifacts.require("./ConvertLib.sol");
var S_Coin = artifacts.require("./S_Coin.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, S_Coin);
  deployer.deploy(S_Coin);
};
