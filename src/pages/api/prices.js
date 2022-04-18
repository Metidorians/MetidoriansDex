const Web3 = require('web3')
const { default: axios } = require('axios')
import IUniswapV2PairABI from '../../constants/abis/uniswap-v2-pair.json'
const NETWORK_URL = 'https://andromeda.metis.io/?owner=1088'
const web3 = new Web3(NETWORK_URL)

export default async function handler(req, res) {
  let movrUSDCContract = new web3.eth.Contract(IUniswapV2PairABI, '0x70f0a48E31bbAB89CEB9669A9c438a7b8da22b95')
  const movrUSDCReserves = await movrUSDCContract.methods.getReserves().call()

  const movrUSDCPrice = (Number(movrUSDCReserves.reserve1) / Number(movrUSDCReserves.reserve0) ) * 1e12
  let DarkMatter = new web3.eth.Contract(IUniswapV2PairABI, '0xB821427Ac3B758836bA6CF7e5c79C76002fCe73E')
  const DarkMatterReserves = await DarkMatterContract.methods.getReserves().call()

  const DarkMatterPrice = Number(DarkMatterReserves.reserve1) / Number(DarkMatterReserves.reserve0)

  let metidoriansMetisContract = new web3.eth.Contract(IUniswapV2PairABI, '0x4f21FF5EEE81Efc36C481975550A3AECb0c7E671')
  const solarMovrReserves = await metidoriansMetisContract.methods.getReserves().call()

  const metidoriansmetisPrice = Number(solarMovrReserves.reserve1) / Number(solarMovrReserves.reserve0)

  let ribMovrContract = new web3.eth.Contract(IUniswapV2PairABI, '0xB821427Ac3B758836bA6CF7e5c79C76002fCe73E')
  const ribMovrReserves = await ribMovrContract.methods.getReserves().call()

  const ribmetisPrice = web3.utils.fromWei(( Number(ribMovrReserves.reserve1) / Number(ribMovrReserves.reserve0) ), 'Ether')




  let ret = {}
  ret['movr'] = movrUSDCPrice
  ret['metidorians'] = metidoriansmetisPrice * movrUSDCPrice
  ret['dmt'] = ribmetisPrice
  ret['rib'] = ribmetisPrice

  ret['usdc'] = 1



  res.status(200).json(ret)
}
