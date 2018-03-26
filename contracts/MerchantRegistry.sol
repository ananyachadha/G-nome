pragma solidity ^0.4.18;

contract MerchantRegistry {

  //Registry
  mapping(address => bool) public tokenRegistry;

  //Event when new token is created
  event Added(address tokenAddr);

  //Function to create new tokens by calling the HumanStandardToken contract
  function add(address _merchant) returns (address) {
    tokenRegistry[_merchant] = true;
    Added(_merchant);
    return _merchant;
  }

  //Checks to see if token contract exists in the registry
  function isInRegistry(address addr) constant returns (bool) {
  	return tokenRegistry[addr];
  }
}
