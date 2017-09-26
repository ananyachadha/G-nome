import { Connect, SimpleSigner } from 'uport-connect'

const uport = new Connect('DashboardLogin', {
  clientId: '2owtseazXi5SwZD3a4NQLnSRcfC6ygie1zV',
  signer: SimpleSigner('76c48c97650a31dc39ed9389b25a99a563e9a955255d45f247e3c25b3968d036')
})

const web3 = uport.getWeb3()
export { web3, uport }
