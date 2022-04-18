/* eslint-disable @next/next/link-passhref */
import { useActiveWeb3React, useFuse } from '../../hooks'

import Head from 'next/head'
import React, { useContext, useState } from 'react'
import { formatNumberScale } from '../../functions'
import { usePositions, useMetidoriansVaultInfo, useVaults } from '../../features/vault/hooks'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Card from '../../components/Card'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import DoubleGlowShadow from '../../components/DoubleGlowShadow'
import { METIDORIANS_ADDRESS, AVERAGE_BLOCK_TIME, WNATIVE } from '../../constants'
import { VAULTS } from '../../constants/vaults'
import MetidoriansLogo from '../../components/MetidoriansLogo'
import { PriceContext } from '../../contexts/priceContext'
import useMasterChef from '../../features/farm/useMasterChef'
import { useTVL } from '../../hooks/useV2Pairs'
import { getAddress } from '@ethersproject/address'
import VaultList from '../../features/vault/VaultList'

export default function Vault(): JSX.Element {
  const { i18n } = useLingui()
  const router = useRouter()
  const { chainId } = useActiveWeb3React()

  const positions = usePositions()

  const vaults = useVaults()

  const distributorInfo = useMetidoriansVaultInfo()

  const priceData = useContext(PriceContext)

  const darkmatterPrice = priceData?.['rib']

  const ribPrice = priceData?.['rib']
  const metidoriansPrice = priceData?.['metidorians']
  const metisPrice = priceData?.['metis']

  const tvlInfo = useTVL()

  const summTvl = tvlInfo.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.tvl
  }, 0)

  const summTvlVaults = vaults.reduce((previousValue, currentValue) => {
    return previousValue + (currentValue.totalLp / 1e18) 
  }, 0)
  const map = (pool) => {
    pool.owner = 'Metidorians'
    pool.balance = 0

    const pair = VAULTS[chainId][pool.id]

    const blocksPerHour = 636 / AVERAGE_BLOCK_TIME[chainId]

    function getRewards() {
      const rewardPerBlock =
        ((pool.allocPoint / distributorInfo.totalAllocPoint) * distributorInfo.solarPerBlock) / 1e18

      const defaultReward = {
        token: 'METIDORIANS',
        icon: '/images/token/metidorians.png',
        rewardPerBlock,
        rewardPerDay: rewardPerBlock * 8640,
        rewardPrice: metidoriansPrice,
      }

      const defaultRewards = [defaultReward]

      return defaultRewards
    }

    //Fix this asap later
    function getTvl(pool) {
      let lpPrice = 0
      let decimals = 18
      if (pool.lpToken == METIDORIANS_ADDRESS[chainId]) {
        lpPrice = metidoriansPrice
        decimals = pair.token0?.decimals
      } else if (pool.lpToken.toLowerCase() == WNATIVE[chainId].toLowerCase()) {
        lpPrice = metisPrice
        decimals = pair.token0?.decimals
      } else if (pool.lpToken.toLowerCase() == '0xB821427Ac3B758836bA6CF7e5c79C76002fCe73E'.toLowerCase()){
        lpPrice = ribPrice
      }else{
        lpPrice = 0
      }

      return Number(pool.totalLp / 10 ** decimals) * lpPrice
    }

    const rewards = getRewards()

    const tvl = getTvl(pool)


    const roiPerBlock =
      rewards.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.rewardPerBlock * currentValue.rewardPrice
      }, 0) / tvl

    const roiPerHour = 0.1 * blocksPerHour
    const roiPerDay = roiPerHour * 24
    const roiPerMonth = roiPerDay * 30
    const roiPerYear = roiPerDay * 365 

    const position = positions.find((position) => position.id === pool.id)

    return {
      ...pool,
      ...position,
      pair: {
        ...pair,
        decimals: 18,
      },
      roiPerBlock,
      roiPerHour,
      roiPerDay,
      roiPerMonth,
      roiPerYear,
      rewards,
      tvl,
      blocksPerHour,
    }
  }
  const data = vaults.map(map)

  const valueStaked = positions.reduce((previousValue, currentValue) => {
    return previousValue + (currentValue.amount / 1e18) 
  }, 0)

  return (
    <>
      <Head>
        <title>Asteroid Belt | Metidorians</title>
        <meta key="description" name="description" content="Asteroid Belt" />
      </Head>

      <div className="container px-0 pb-6 mx-auto">
        <div className={`mb-2 pb-4 grid grid-cols-12 gap-4`}>
          <div className="flex items-center justify-center col-span-12 lg:justify">
            <Link href="/farm">
              <MetidoriansLogo />
            </Link>
          </div>
        </div>
        <DoubleGlowShadow maxWidth={false} opacity={'0.4'}>
          <div className={`grid grid-cols-12 gap-2 min-h-1/2`}>
            <div className={`col-span-12`}>
              <Card className="bg-dark-900/20 z-4">
                <div className={`grid grid-cols-12 md:space-x-4 space-y-4 md:space-y-0 `}>
                  <div className={`col-span-12 md:col-span-3 space-y-4`}>
                    <div className={`hidden md:block`}>
                      <div className={`col-span-12 md:col-span-4 bg-dark-800/20 px-6 py-4 rounded`}>
                        <div className="mb-2 text-2xl text-emphesis">{i18n._(t`Asteroid Belt`)}</div>
                        <div className="mb-4 text-base text-secondary">
                          <p>
                            {i18n._(
                              t`Asteroid belts are full of Dark matter to yield. Long term supporters can choose to lock METIDORIANS and LP tokens for a determined period of time for higher rewards (Longer pays better)`
                            )}
                          </p>
                          <p className="mt-2">
                            {i18n._(
                              t`The dark matter miners and holders of Metidorians receive various benefits such as higher rewards based on lock duration, higher allocations in Metidorians Launchpad and more.`
                            )}
                          </p>
                        </div>
                        <div className="mb-2 text-2xl text-emphesis">{i18n._(t`Considerations`)}</div>{' '}
                        <div className="mb-4 text-base text-secondary">
                          <p>{i18n._(t`Everytime you stake or claim rewards your lock time renews, if you want to harvest without continuing to lock, unstake otherwise you will be relocked`)}</p>
                        </div>
                      </div>
                    </div>
                    <div className={`flex flex-col items-center justify-between px-6 py-6 `}>
                      <div className="flex items-center justify-between py-2 text-emphasis">
                        {/* Total Value Locked: {formatNumberScale(summTvl + summTvlVaults, true, 2)} */}
                      </div>
                      <div className="flex items-center justify-between py-2 text-emphasis">
                        {/* Vaults TVL: {formatNumberScale(summTvlVaults, true, 2)} */}
                      </div>
                      {/* {positions.length > 0 && (
                        <div className="flex items-center justify-between py-2 text-emphasis">
                          My Holdings: {formatNumberScale(valueStaked, true, 2)}
                        </div>
                      )} */}
                    </div>
                  </div>
                  <div className={`col-span-12 md:col-span-9 bg-dark-800/20  py-4 md:px-6 md:py-4 rounded`}>
                    <VaultList farms={data} />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </DoubleGlowShadow>
      </div>
    </>
  )
}
