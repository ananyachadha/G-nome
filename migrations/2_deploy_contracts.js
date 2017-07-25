var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.then(function() {
    return MetaCoin.deployed()
  }).then(function(instance) {
    return instance.sendCoin("0x0Aa6b15E6dC54155f79BBb536D8C0c9195F1F27D", 101, {from:accounts[0]})
  })
};
