pragma solidity ^0.4.19;
contract Genome {

 //mapping(address => string) genomeData;
 userData[] genomeData;
 uint arraySize;
 struct userData {
     string genome;
     address user;
 }

 uint payout;
 address owner;

 function Genome() {
    payout = 1000000000000000000;
    owner = msg.sender;
 }

 function () payable {

 }

 function upload(string _genome) {
    userData memory newData;
    newData.genome = _genome;
    newData.user = msg.sender;
    genomeData.push(newData);
    arraySize++;
 }

 function validate(bool _validate, address _user) {
     require(msg.sender == owner);
     if(_validate == true) {
         _user.transfer(payout);
     } else if (_validate == false) {
         //send email
     }
 }

 function updatePayout(uint _newPayout) {
     require(msg.sender == owner);
     payout = _newPayout;
 }
 
 function getgenomeData(uint _start) constant returns (string) {
     return genomeData[_start].genome;

 }

 function getgenomeUser(uint _start) constant returns (address) {
     return genomeData[_start].user;
 }

 function manualRecovery(uint _value) {
     owner.transfer(_value);
 }
}
