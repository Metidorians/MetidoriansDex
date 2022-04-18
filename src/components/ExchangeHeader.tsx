import { ChainId, Currency, Percent } from '../sdk'
import React, { FC, useState } from 'react'
import Image from 'next/image'
import Gas from './Gas'
import NavLink from './NavLink'
import Settings from './Settings'
import { currencyId } from '../functions'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../hooks'
import { useLingui } from '@lingui/react'
import { useRouter } from 'next/router'
import MyOrders from '../features/limit-order/MyOrders'
import Typography from '../components/Typography'

const getQuery = (input, output) => {
  if (!input && !output) return

  if (input && !output) {
    return { inputCurrency: input.address || 'ETH' }
  } else if (input && output) {
    return { inputCurrency: input.address, outputCurrency: output.address }
  }
}

interface ExchangeHeaderProps {
  input?: Currency
  output?: Currency
  allowedSlippage?: Percent
}

const ExchangeHeader: FC<ExchangeHeaderProps> = ({ input, output, allowedSlippage }) => {
  const { i18n } = useLingui()
  const router = useRouter()
  const isRemove = router.asPath.startsWith('/exchange/remove')
  const isAdd = router.asPath.startsWith('/exchange/add')

  return (
    <>
      <div className="flex items-center justify-between mb-4 space-x-30">
        <div className="flex items-center">
          <Typography component="h1" variant="base">
            {isAdd ? i18n._(t`Add Liquidity`) : isRemove ? i18n._(t`Remove Liquidity`) : i18n._(t`Swap`)}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="grid grid-flow-col gap-1">             
            <div className="relative flex items-center w-full h-full rounded hover:bg-red-800">
              <Settings placeholderSlippage={allowedSlippage} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExchangeHeader
