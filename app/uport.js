import { Connect, SimpleSigner } from 'uport-connect'

const uport = new Connect('DashboardLogin', {
  clientId: '2ooXhEDUmJWKQP1v9WW2VLCvtUNUxDTpNF9',
  signer: SimpleSigner('19b39220dffdf850d2e9a0a696f8f8a4d16f62d7de6eb4b35ae3342e81b11fb2')
})

const web3 = uport.getWeb3()
export { web3, uport }
