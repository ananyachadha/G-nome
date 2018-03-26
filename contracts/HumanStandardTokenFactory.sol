pragma solidity ^0.4.18;

import "./HumanStandardToken.sol";

contract HumanStandardTokenFactory {

  //Registry
  mapping(address => address[]) public tokenRegistry;
  //Quick check
  mapping(address => bool) public isToken;

  //Event when new token is created
  event Created(address tokenAddr);

  //Function to create new tokens by calling the HumanStandardToken contract
  function create(uint256 _initialAmount, string _tokenName, uint8 _decimalUnits, string _tokenSymbol) returns (address) {
    address tokenAddr = new HumanStandardToken(_initialAmount, _tokenName, _decimalUnits, _tokenSymbol);
    HumanStandardToken(tokenAddr).transfer(msg.sender, _initialAmount); //This might need to change to reflect the actual owner instead of the contract
    tokenRegistry[msg.sender].push(tokenAddr);
    isToken[tokenAddr] = true;
    Created(tokenAddr);
    return tokenAddr;
  }

  //Checks to see if token contract exists in the registry
  function isValidToken(address tokenAddr) constant returns (bool) {
  	return isToken[tokenAddr];
  }
}
