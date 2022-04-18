import { ChainId } from '../sdk'

export type TokenInfo = {
  id: string
  name: string
  symbol: string
  decimals?: number
}

type PairInfo = {
  id: number
  lpToken: string
  token0: TokenInfo
  token1?: TokenInfo
  name?: string
  symbol?: string
}

type AddressMap = {
  [chainId: number]: {
    [id: string]: PairInfo
  }
}

export const VAULTS: AddressMap = {
  [ChainId.METIS]: {
    '0': {
      id: 0,
      lpToken: '0x8E7CC1e3A14Ac773fA32bD0dEc0Fe032473E4506',
      token0: {
        id: '0x6957B8F72b9DcB6A05E1384E422454F107Ebe0a8',
        name: 'Metidorians',
        symbol: 'MMDorians',
        decimals: 18,
      },
      token1: {
        id: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
        name: 'Metis',
        symbol: 'Metis',
        decimals: 18,
      },
    },
    '1': {
      id: 1,
      lpToken: '0x6957B8F72b9DcB6A05E1384E422454F107Ebe0a8',
      token0: {
        id: '0x6957B8F72b9DcB6A05E1384E422454F107Ebe0a8',
        name: 'Metidorians',
        symbol: 'MMDorians',
        decimals: 18,
      },
    },
    '2': {
      id: 2,
      lpToken: '0xB821427Ac3B758836bA6CF7e5c79C76002fCe73E',
      token0: {
        id: '0x2207fe616CAb5DaA9e84Ac5043dA38C6722de1C9',
        name: 'Dark Matter',
        symbol: 'DMT',
        decimals: 18,
      },
      token1: {
        id: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
        name: 'Metis',
        symbol: 'Metis',
        decimals: 18,
      },
    },
    // '3': {
    //   id: 3,
    //   lpToken: '0x70f0a48E31bbAB89CEB9669A9c438a7b8da22b95',
    //   token0: {
    //     id: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
    //     name: 'Metis',
    //     symbol: 'Metis',
    //     decimals: 18,
    //   },
    //   token1: {
    //     id: '0xEA32A96608495e54156Ae48931A7c20f0dcc1a21',
    //     name: 'm.USDC',
    //     symbol: 'USDC',
    //     decimals: 18,
        
        
    //   },
    // },
  
  },
}
