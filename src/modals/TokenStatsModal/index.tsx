import React, { useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useModalOpen, useTokenStatsModalToggle } from '../../state/application/hooks'

import { ApplicationModal } from '../../state/application/actions'
import ExternalLink from '../../components/ExternalLink'
import Image from 'next/image'
import Modal from '../../components/Modal'
import ModalHeader from '../../components/ModalHeader'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Typography from '../../components/Typography'
import { useTokenInfo } from '../../features/farm/hooks'
import { formatNumberScale } from '../../functions'
import { ExternalLink as LinkIcon } from 'react-feather'
import { PriceContext } from '../../contexts/priceContext'
import { useMetidoriansContract } from '../../hooks'
import QuestionHelper from '../../components/QuestionHelper'

const CloseIcon = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const HeaderRow = styled.div`
  margin-bottom: 1rem;
`

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
`

const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
}

export default function TokenStatsModal({ token }: { token: any }) {
  const { i18n } = useLingui()

  const priceData = useContext(PriceContext)
  let tokenInfo = useTokenInfo(useMetidoriansContract())

  if (token.symbol == 'METIDORIANS') tokenInfo = { circulatingSupply: '825075', burnt: '274923', totalSupply: '4725077', vaults: '3900002',  }
  if (token.symbol == 'DMT') tokenInfo = { circulatingSupply: '13000', burnt: '0', totalSupply: '100000', vaults: '0',  }

  const price = formatNumberScale(priceData?.[token.symbol.toLowerCase()], true, 2)

  const modalOpen = useModalOpen(token.symbol == 'METIDORIANS' ? ApplicationModal.METIDORIANS_STATS : ApplicationModal.METIS_STATS)

  const toggleWalletModal = useTokenStatsModalToggle(token)

  function getSummaryLine(title, value) {
    return (
      <div className="flex flex-col w-full gap-2 px-3 py-1 rounded bg-dark-800">
        <div className="flex items-center justify-between">
          {title}
          <Typography variant="sm" className="flex items-center font-bold py-0.5">
            {value}
          </Typography>
        </div>
      </div>
    )
  }

  function getModalContent() {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <ModalHeader title={i18n._(t`${token['name']}`)} onClose={toggleWalletModal} />
          <div className="flex flex-row w-full py-4">
            {token.icon && (
              <Image
                src={token['icon']}
                alt={token['name']}
                width="64px"
                height="64px"
                objectFit="contain"
                className="items-center"
              />
            )}
            <div className="flex flex-col flex-1">
              <div className="flex flex-row items-center px-3">
                <div className="text-2xl text-primary">{token['symbol']}</div>
              </div>
              <div className="flex items-center justify-between gap-2 space-x-3">
                {token?.address && (
                  <ExternalLink
                    href={
                      'https://andromeda-explorer.metis.io/address/0x6957B8F72b9DcB6A05E1384E422454F107Ebe0a8'
                    }
                    className="px-3 ring-0 ring-transparent ring-opacity-0"
                    color="light-green"
                    startIcon={<LinkIcon size={16} />}
                  >
                    <Typography variant="xs" className="hover:underline py-0.5 currentColor">
                      {i18n._(t`View Contract`)}
                    </Typography>
                  </ExternalLink>
                )}
              </div>
            </div>
            <div className="flex items-center text-primary text-bold">
              <div className="ml-2 text-base text-2xl text-primary text-secondary">{`${price}`}</div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Typography weight={700}>{i18n._(t`Supply & Market Cap`)}</Typography>
          </div>
          <div className="flex flex-col gap-1 -m-1 flex-nowrap">
            {getSummaryLine(
              <div className="flex items-center">
                <Typography variant="sm" className="flex items-center py-0.5">
                  {i18n._(t`Circulating Supply`)}
                </Typography>
                {token.symbol == 'METIDORIANS' && (
                  <QuestionHelper
                    text={
                      <div className="flex flex-col w-full gap-2 px-3 py-1">
                        <div className="flex items-center justify-between">
                          <Typography variant="sm" className="flex items-center font-bold py-0.5">
                            Total
                          </Typography>
                          <Typography variant="sm" className="flex items-center font-bold py-0.5">
                            {formatNumberScale(tokenInfo.totalSupply, false, 2)}
                          </Typography>
                        </div>
                        <div className="flex items-center justify-between">
                          <Typography variant="sm" className="flex items-center font-bold py-0.5">
                            Burnt
                          </Typography>
                          <Typography variant="sm" className="flex items-center font-bold py-0.5">
                            - {formatNumberScale(tokenInfo.burnt, false, 2)}
                          </Typography>
                        </div>
                        <div className="flex items-center justify-between">
                          <Typography variant="sm" className="flex items-center font-bold py-0.5">
                            Locked
                          </Typography>
                          <Typography variant="sm" className="flex items-center font-bold py-0.5">
                            - {formatNumberScale(tokenInfo.vaults, false, 2)}
                          </Typography>
                        </div>
                        <hr></hr>
                        <div className="flex items-center justify-between">
                          <Typography variant="sm" className="flex items-center font-bold py-0.5">
                            Circulating
                          </Typography>
                          <Typography variant="sm" className="flex items-center font-bold py-0.5">
                            {formatNumberScale(tokenInfo.circulatingSupply, false, 2)}
                          </Typography>
                        </div>
                      </div>
                    }
                  />
                )}
              </div>,
              formatNumberScale(tokenInfo.circulatingSupply, false, 2)
            )}
            {getSummaryLine(
              <Typography variant="sm" className="flex items-center py-0.5">
                {i18n._(t`Market Cap`)}
              </Typography>,
              formatNumberScale(
                Number(tokenInfo.circulatingSupply) * (priceData?.[token.symbol.toLowerCase()] || 0),
                true,
                2
              )
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Modal isOpen={modalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      {getModalContent()}
    </Modal>
  )
}
