import { Connect, SimpleSigner } from 'uport-connect'
import Web3 from 'web3'

const uport = new Connect('DashboardLogin', {
  clientId: '2ooXhEDUmJWKQP1v9WW2VLCvtUNUxDTpNF9',
  signer: SimpleSigner('19b39220dffdf850d2e9a0a696f8f8a4d16f62d7de6eb4b35ae3342e81b11fb2')
})

var provider = 'https://rinkeby.infura.io/'
var web3 = new Web3(provider);
console.log('No web3 instance injected, using Local web3.');
export { web3, uport }
