import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Currency } from '../../sdk'
import React from 'react'
import { formatNumberScale, formatPercent } from '../../functions'
import { useActiveWeb3React } from '../../hooks'
import { useCurrency } from '../../hooks/Tokens'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen } from '../../state/application/hooks'
import CurrencyLogo from '../CurrencyLogo'
import DoubleLogo from '../DoubleLogo'
import Modal from '../Modal'
import ModalHeader from '../ModalHeader'
import Typography from '../Typography'

interface YieldDetailsProps {
  isOpen: boolean
  onDismiss: () => void
  token0: Currency
  token1?: Currency
  roiPerDay: number
  roiPerMonth: number
  roiPerYear: number
  lpPrice: number
  metidoriansPrice: number
}

const YieldDetails: React.FC<YieldDetailsProps> = ({
  isOpen,
  onDismiss,
  token0,
  token1,
  roiPerDay,
  roiPerMonth,
  roiPerYear,
  lpPrice,
  metidoriansPrice,
}) => {
  const { chainId } = useActiveWeb3React()

  const { i18n } = useLingui()

  const roiPerWeek: number = roiPerDay * 7

  const perDay: number = Number((roiPerDay))
  const perWeek: number = Number((roiPerWeek))
  const perMonth: number = Number((roiPerMonth))
  const perYear: number = Number((roiPerYear))

  const getRoiEntry = (period: string, percent: number, value: Number) => {
    return (
      <div className="flex flex-row gap-1 py-2 rounded flex-nowrap bg-dark-800">
        <div className="flex flex-row w-full px-2">
          <div className="flex items-center justify-between">{period}</div>
        </div>

        <div className="flex flex-row w-full px-2">
          <div className="flex items-center justify-between">{formatPercent(percent * 100)}</div>
        </div>

        <div className="flex flex-row w-full px-2">
          <div className="flex items-center justify-between">{formatNumberScale(value, false, 2)}</div>
        </div>
      </div>
    )
  }

  const getModalContent = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <ModalHeader title={i18n._(t`Pool Details`)} onClose={onDismiss} />
        <div className="grid grid-cols-2">
          <div className="flex flex-row w-full gap-2 py-4">
            <div className="flex col-span-1 space-x-4">
              {token1 ? (
                <DoubleLogo currency0={token0} currency1={token1} size={50} />
              ) : (
                <div className="flex items-center">
                  <CurrencyLogo currency={token0} size={50} />
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center col-span-1 space-x-2">
              <div>
                <span className="text-2xl font-bold">{token0.symbol}</span>
                {token1 && <span className="text-2xl font-bold">{`/${token1.symbol}`}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row gap-1 font-bold flex-nowrap">
          <div className="flex flex-row w-full px-2 py-1">
            <div className="flex items-center justify-between uppercase">{i18n._(t`Timeframe`)}</div>
          </div>

          <div className="flex flex-row w-full px-2 py-1">
            <div className="flex items-center justify-between uppercase">{i18n._(t`ROI`)}</div>
          </div>

          <div className="flex flex-row w-full px-2 py-1">
            <div className="flex items-center justify-between uppercase">{i18n._(t`Dark Matter per $1000`)}</div>
          </div>
        </div>
        {getRoiEntry('1d', roiPerDay * 10, perDay * 10)}
        {getRoiEntry('7d', roiPerWeek * 10, perWeek * 10)}
        {getRoiEntry('30d', roiPerMonth * 10, perMonth * 10)}
        {getRoiEntry('365d', roiPerYear * 10, perYear * 10)}
      </div>
      <div className="space-y-2">
        <div className="text-s">
          {i18n._(t`Calculated based on current rates. Rates are estimates provided for your convenience
          only, and by no means represent guaranteed returns.`)}
        </div>
      </div>
    </div>
  )

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} minHeight={false}>
      {getModalContent()}
    </Modal>
  )
}

export default React.memo(YieldDetails)
