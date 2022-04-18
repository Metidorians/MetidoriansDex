import { ChainId } from '../sdk'

type AddressMap = { [chainId: number]: string }

export const TIMELOCK_ADDRESS = '0x10A59A1878D984f742c55146C1071f1132cf4093'
export const FAUCET_ADDRESS = '0x5aec27384DbE84d46C29A20DFeFF09493711CD15'

export const LOCKER_ADDRESS: AddressMap = {
  [ChainId.ROPSTEN]: '',
  [ChainId.BSC]: '',
  [ChainId.MOONRIVER]: '0xA9Ead5d7C9D0B59A2900824A125F3913009fD638',
  [ChainId.METIS]:'0xEd26f0c3d52B74B34849eA3cB8F60328085249CF'
}

export const SOLAR_DISTRIBUTOR_ADDRESS: AddressMap = {
  [ChainId.ROPSTEN]: '',
  [ChainId.BSC]: '',
  [ChainId.MOONRIVER]: '0xf03b75831397D4695a6b9dDdEEA0E578faa30907',
  [ChainId.METIS]: '0x56F6677F1932b51FC1256e4925F9666F62FaD151'

}

export const METIDORIANS_VAULT_ADDRESS: AddressMap = {
  [ChainId.MOONRIVER]: '0xbbc40B4F54e265EbE89870F30889Ab9Fe02e201d',
  [ChainId.METIS]: '0x03Fa09cf7501Daa355a99a71766749f0B402c091',
  // [ChainId.METIS]: '0x3aDeD4501AA968B616073b7c92b9Cc3cd3B1998d'
}

export const METIDORIANS_METIS_PAIR: AddressMap = {
  [ChainId.ROPSTEN]: '',
  [ChainId.BSC]: '',
  [ChainId.MOONRIVER]: '0x8E7CC1e3A14Ac773fA32bD0dEc0Fe032473E4506',
  [ChainId.METIS]: '0x8E7CC1e3A14Ac773fA32bD0dEc0Fe032473E4506'
}

export const MOVR_USDC_PAIR: AddressMap = {
  [ChainId.ROPSTEN]: '',
  [ChainId.BSC]: '',
  [ChainId.MOONRIVER]: '0x5d0C2f04A108090eD45F25c75f091AA967DF6439',
  [ChainId.METIS]: '0x70f0a48E31bbAB89CEB9669A9c438a7b8da22b95'
}

export const DMT_USDC_PAIR: AddressMap = {
  [ChainId.MOONRIVER]: '0x5d0C2f04A108090eD45F25c75f091AA967DF6439',
  [ChainId.METIS]: '0xB821427Ac3B758836bA6CF7e5c79C76002fCe73E',
}


export const RIB_MOVR_PAIR: AddressMap = {
  [ChainId.ROPSTEN]: '',
  [ChainId.BSC]: '',
  [ChainId.MOONRIVER]: '0x4f21FF5EEE81Efc36C481975550A3AECb0c7E671',
  [ChainId.METIS]: '0xB821427Ac3B758836bA6CF7e5c79C76002fCe73E'
}

export const BNB_USD_PAIR: AddressMap = {
  [ChainId.ROPSTEN]: '',
  [ChainId.BSC]: '',
  [ChainId.MOONRIVER]: '',
}

export const ARCHER_ROUTER_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '0x9917C083FF9FbD29Df1367FBF7F2388A9a202431',
}

export const MINICHEF_ADDRESS: AddressMap = {
  [ChainId.MATIC]: '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F',
  [ChainId.XDAI]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [ChainId.HARMONY]: '0x67dA5f2FfaDDfF067AB9d5F025F8810634d84287',
}

export const MASTERCHEF_V2_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '0xEF0881eC094552b2e128Cf945EF17a6752B4Ec5d',
}

export const ZAPPER_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '0xcff6eF0B9916682B37D80c19cFF8949bc1886bC2',
  [ChainId.ROPSTEN]: '0xcff6eF0B9916682B37D80c19cFF8949bc1886bC2',
}

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '0xcBE6B83e77cdc011Cc18F6f0Df8444E5783ed982',
  [ChainId.ROPSTEN]: '0x84d1f7202e0e7dac211617017ca72a2cb5e2b955',
}

export const MULTICALL2_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.ROPSTEN]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.RINKEBY]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.GÖRLI]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.KOVAN]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.ARBITRUM]: '0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB',
  [ChainId.ARBITRUM_TESTNET]: '0xa501c031958F579dB7676fF1CE78AD305794d579',
  [ChainId.CELO]: '0x9aac9048fC8139667D6a2597B902865bfdc225d3',
  [ChainId.FANTOM]: '0x22D4cF72C45F8198CfbF4B568dBdB5A85e8DC0B5',
  [ChainId.FANTOM_TESTNET]: '',
  [ChainId.MATIC]: '0x02817C1e3543c2d908a590F5dB6bc97f933dB4BD',
  [ChainId.MATIC_TESTNET]: '',
  [ChainId.XDAI]: '0x67dA5f2FfaDDfF067AB9d5F025F8810634d84287',
  [ChainId.BSC]: '0xa9193376D09C7f31283C54e56D013fCF370Cd9D9',
  [ChainId.BSC_TESTNET]: '0xA6949B8FBa9DF546b9c66F98CFCa960A96E3b68e',
  [ChainId.MOONBEAM_TESTNET]: '',
  [ChainId.MOONRIVER]: '0x43D002a2B468F048028Ea9C2D3eD4705a94e68Ae',
  [ChainId.AVALANCHE]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [ChainId.AVALANCHE_TESTNET]: '',
  [ChainId.HECO]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [ChainId.HECO_TESTNET]: '',
  [ChainId.HARMONY]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [ChainId.HARMONY_TESTNET]: '',
  [ChainId.OKEX]: '0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3',
  [ChainId.OKEX_TESTNET]: '',
  [ChainId.METIS]: '0xc39aBB6c4451089dE48Cffb013c39d3110530e5C',
}

export const WETH9: AddressMap = {
  [ChainId.MAINNET]: '',
  [ChainId.ROPSTEN]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.GÖRLI]: '',
  [ChainId.KOVAN]: '',
  [ChainId.ARBITRUM]: '',
  [ChainId.ARBITRUM_TESTNET]: '',
  [ChainId.CELO]: '',
  [ChainId.FANTOM]: '',
  [ChainId.FANTOM_TESTNET]: '',
  [ChainId.MATIC]: '',
  [ChainId.MATIC_TESTNET]: '',
  [ChainId.XDAI]: '',
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '',
  [ChainId.MOONBEAM_TESTNET]: '',
  [ChainId.MOONRIVER]: '0x98878B06940aE243284CA214f92Bb71a2b032B8A',
  [ChainId.AVALANCHE]: '',
  [ChainId.AVALANCHE_TESTNET]: '',
  [ChainId.HECO]: '',
  [ChainId.HECO_TESTNET]: '',
  [ChainId.HARMONY]: '',
  [ChainId.HARMONY_TESTNET]: '',
  [ChainId.OKEX]: '',
  [ChainId.OKEX_TESTNET]: '',
  [ChainId.METIS]: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'
}

export const WNATIVE: AddressMap = {
  [ChainId.MAINNET]: '',
  [ChainId.ROPSTEN]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.GÖRLI]: '',
  [ChainId.KOVAN]: '',
  [ChainId.ARBITRUM]: '',
  [ChainId.ARBITRUM_TESTNET]: '',
  [ChainId.CELO]: '',
  [ChainId.FANTOM]: '',
  [ChainId.FANTOM_TESTNET]: '',
  [ChainId.MATIC]: '',
  [ChainId.MATIC_TESTNET]: '',
  [ChainId.XDAI]: '',
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '',
  [ChainId.MOONBEAM_TESTNET]: '',
  [ChainId.MOONRIVER]: '0x98878B06940aE243284CA214f92Bb71a2b032B8A',
  [ChainId.AVALANCHE]: '',
  [ChainId.AVALANCHE_TESTNET]: '',
  [ChainId.HECO]: '',
  [ChainId.HECO_TESTNET]: '',
  [ChainId.HARMONY]: '',
  [ChainId.HARMONY_TESTNET]: '',
  [ChainId.OKEX]: '',
  [ChainId.OKEX_TESTNET]: '',
  [ChainId.METIS]: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'
}