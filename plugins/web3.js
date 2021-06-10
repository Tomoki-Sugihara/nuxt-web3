import Web3 from 'web3'
import artifacts from '@/build/contracts/SingleNumRegister.json'

export default async function (context, inject) {
  let web3

  if (window?.ethereum) {
    console.log(11)
    web3 = new Web3(window.ethereum)
    window.ethereum.enable().catch((error) => {
      // User denied account access
      console.log('hoge', error)
    })
  } else if (window?.web3) {
    console.log(12)
    web3 = new Web3(window.web3.currentProvider)
  } else {
    const httpEndpoint = 'http://127.0.0.1:7545'
    web3 = new Web3(new Web3.providers.HttpProvider(httpEndpoint))
  }

  const networkId = await web3.eth.net.getId()
  console.log(networkId)
  console.log(artifacts.networks)

  const contract = new web3.eth.Contract(
    artifacts.abi,
    artifacts.networks[5777].address
  )

  inject('web3', web3)
  inject('contract', contract)
}
