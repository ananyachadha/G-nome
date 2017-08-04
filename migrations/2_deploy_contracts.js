const HumanStandardToken = artifacts.require(`./HumanStandardToken.sol`)

module.exports = (deployer, network, accounts) => {
  deployer.deploy(HumanStandardToken, 9999999999, "Kevin Tokens", 18, "KTO").then(function() {
   return HumanStandardToken.deployed()
 }).then(function(instance) {
   console.log("HumanStandardToken Contract Address:", instance.address)
   return instance.transfer("0x0Aa6b15E6dC54155f79BBb536D8C0c9195F1F27D", 77, {from:accounts[0]})
 })
}
