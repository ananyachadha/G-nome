pragma solidity ^0.4.18;

import "./Token.sol";
import "./MerchantRegistry.sol";

contract NonFungibleToken is Token {

    function transfer(address _to, uint256 _value, address _merchantRegistry) returns (bool success) {
        //instantiate an instance of the MerchantRegistry and check if the recipient is a merchant
        if (balances[msg.sender] >= _value && MerchantRegistry(_merchantRegistry).isInRegistry(_to)) {
            balances[msg.sender] -= _value;
            balances[_to] += _value;
            Transfer(msg.sender, _to, _value);
            return true;
        } else { revert(); }
    }

    function transferFrom(address _from, address _to, uint256 _value, address _merchantRegistry) returns (bool success) {
        //instantiate an instance of the MerchantRegistry and check if the recipient is a merchant
        if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && MerchantRegistry(_merchantRegistry).isInRegistry(_to)) {
            balances[_to] += _value;
            balances[_from] -= _value;
            allowed[_from][msg.sender] -= _value;
            Transfer(_from, _to, _value);
            return true;
        } else { revert(); }
    }

    function balanceOf(address _owner) constant returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
      return allowed[_owner][_spender];
    }

    mapping (address => uint256) balances;
    mapping (address => mapping (address => uint256)) allowed;
}
