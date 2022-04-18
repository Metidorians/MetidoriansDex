import React, { useContext } from 'react'
import Image from 'next/image'
import { formatNumberScale } from '../../functions/format'
import { useTokenStatsModalToggle } from '../../state/application/hooks'
import { useWeb3React } from '@web3-react/core'
import TokenStatsModal from '../../modals/TokenStatsModal'
import { ChainId } from '../../sdk'
import { PriceContext } from '../../contexts/priceContext'

const supportedTokens = {
  METIS: {
    name: 'Metis',
    symbol: 'METIS',
    icon: '/images/tokens/metis.png',
    address: {
      [ChainId.METIS]: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
    }
  },
  
  Metidorians: {
    name: 'Metidorians',
    symbol: 'METIDORIANS',
     icon: '/images/tokens/metidorians.png',
     address: {
       [ChainId.METIS]: '0x6957B8F72b9DcB6A05E1384E422454F107Ebe0a8',
     }
   },
   DarkMatter: {
    name: 'DarkMatter',
    symbol: 'DMT',
    icon: 'https://i.imgur.com/ARtmlJw.png',
    address: {
      [ChainId.METIS]: '0x2207fe616CAb5DaA9e84Ac5043dA38C6722de1C9',
    },
  },
    
}

interface TokenStatsProps {
  token: string
}

function TokenStatusInner({ token }) {
  const toggleModal = useTokenStatsModalToggle(token)

  const priceData = useContext(PriceContext)

  return (
    <div className="flex pl-2" onClick={toggleModal}>
      {token.icon && (
        <Image
          src={token['icon']}
          alt={token['symbol']}
          width="24px"
          height="24px"
          objectFit="contain"
          className="rounded-md"
        />
      )}
      <div className="px-3 py-2 text-primary text-bold">
        {formatNumberScale(priceData?.[token.symbol.toLowerCase()], true, 2)}
      </div>
    </div>
  )
}

export default function TokenStats({ token, ...rest }: TokenStatsProps) {
  const selectedToken = supportedTokens[token]

  return (
    <>
      <TokenStatusInner token={selectedToken} />
      <TokenStatsModal token={selectedToken} />
    </>
  )
}
