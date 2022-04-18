import { ChainId } from '../sdk'

export type TokenInfo = {
  id: string
  name: string
  symbol: string
  decimals?: number
}

type PairInfo = {
  id: number
  token0: TokenInfo
  token1?: TokenInfo
  name?: string
  symbol?: string
}

type AddressMap = {
  [chainId: number]: {
    [address: string]: PairInfo
  }
}

export const POOLS: AddressMap = {
  [ChainId.METIS]: {
    '0xa28FCeC070C6DA9ccD3C75232a3cD507d5Dbb8bf': {
      id: 0,
      token0: {
        id: '0x544632a851963a9289DfbFfDF58125788Ae56A43',
        name: 'Metidorians',
        symbol: 'METIDORIANS',
        decimals: 18,
      },
      token1: {
        id: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
        name: 'Metis',
        symbol: 'METIS',
        decimals: 18,
      },
      name: 'Metidorians LP Token',
      symbol: 'MLP',
    
    
    
    },
  },
}
