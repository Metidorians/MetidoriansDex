/* eslint-disable @next/next/link-passhref */
import { useActiveWeb3React } from '../../hooks'
import Head from 'next/head'
import React, { useCallback, useEffect, useState } from 'react'
import Search from '../../components/Search'
import { classNames, isAddress } from '../../functions'
import NavLink from '../../components/NavLink'
import Link from 'next/link'
import Card from '../../components/Card'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import DoubleGlowShadow from '../../components/DoubleGlowShadow'
import MetidoriansLogo from '../../components/MetidoriansLogo'
import { useTransactionAdder } from '../../state/transactions/hooks'
import useLocker from '../../features/locker/useLocker'
import { Disclosure } from '@headlessui/react'
import moment from 'moment'
import { useToken } from '../../hooks/Tokens'
import { CurrencyAmount } from '../../sdk'
import Button from '../../components/Button'
import { getAddress } from '@ethersproject/address'

export default function Locker(): JSX.Element {
  const { i18n } = useLingui()
  const { account } = useActiveWeb3React()
  const [tokenAddress, setTokenAddress] = useState(undefined)
  const token = useToken(isAddress(tokenAddress) ? tokenAddress : undefined)
  const [pendingTx, setPendingTx] = useState(false)
  const addTransaction = useTransactionAdder()

  const [lockers, setLockers] = useState([])

  const lockerContract = useLocker()

  useEffect(() => {
    if (isAddress(tokenAddress)) {
      lockerContract.getLockersByTokenAddress(tokenAddress).then((r) => {
        if (r.length > 0) {
          setLockers(r.filter((x) => x.withdrawn == false))
        }
      })
    }
  }, [tokenAddress, lockerContract])

  const handleWithdraw = useCallback(
    async (id) => {
      setPendingTx(true)

      try {
        const tx = await lockerContract.withdrawTokens(id)
        addTransaction(tx, {
          summary: `${i18n._(t`Withdraw from locker ${id}`)}`,
        })
      } catch (error) {
        console.error(error)
      }
      setPendingTx(false)
    },
    [addTransaction, i18n, lockerContract]
  )

  return (
    <>
      <Head>
        <title>Time Capsule | Metidorians</title>
        <meta key="description" name="description" content="Metidorians Time Capsule" />
      </Head>

      <div className="container px-0 pb-6 mx-auto">
        <div className={`mb-2 pb-4 grid grid-cols-12 gap-4`}>
          <div className="flex items-center justify-center col-span-12 lg:justify">
            <Link href="/farm">
              <MetidoriansLogo />
            </Link>
          </div>
        </div>
        <DoubleGlowShadow maxWidth={false} opacity={'0.3'}>
          <div className={`grid grid-cols-12 gap-2 min-h-1/2`}>
            <div className={`col-span-12 flex flex-col md:flex-row md:space-x-2`}>
              <NavLink
                exact
                href={'/locker'}
                activeClassName="font-bold bg-transparent border rounded text-high-emphesis border-transparent border-gradient-r-green-dark-900"
              >
                <a className="flex items-center justify-between px-6 py-2 text-base font-bold border border-transparent rounded cursor-pointer">
                  {i18n._(t`Search Capsules`)}
                </a>
              </NavLink>
              <NavLink
                exact
                href={'/locker/create'}
                activeClassName="font-bold bg-transparent border rounded text-high-emphesis border-transparent border-gradient-r-green-dark-900"
              >
                <a className="flex items-center justify-between px-6 py-2 text-base font-bold border border-transparent rounded cursor-pointer">
                  {i18n._(t`Create time capsule`)}
                </a>
              </NavLink>
            </div>
            <div className={`col-span-12`} style={{ minHeight: '35rem' }}>
              <Card className="h-full bg-dark-900/20 z-4">
                <Search
                  placeholder={'Search by name, symbol or address'}
                  term={tokenAddress}
                  search={(value: string): void => {
                    setTokenAddress(value)
                  }}
                />
                {lockers.length == 0 && isAddress(tokenAddress) && (
                  <div className="flex items-center justify-center col-span-12 mt-20 lg:justify">
                    <span>
                      No lockers found for this address,{' '}
                      <Link href="/locker/create">
                        <a className="hover:underline hover:text-yellow">click here</a>
                      </Link>{' '}
                      to create one.
                    </span>
                  </div>
                )}
                {lockers.length > 0 && (
                  <div className="grid grid-cols-5 mt-10 mb-2 text-base font-bold text-primary">
                    <div className="flex items-center col-span-2 px-2">
                      <div className="hover:text-high-emphesis">{i18n._(t`Token`)}</div>
                    </div>
                    <div className="flex items-center ">{i18n._(t`Amount Locked`)}</div>
                    <div className="flex items-center justify-end px-2 ">{i18n._(t`Unlock date`)}</div>
                    <div className="flex items-center justify-end px-2 ">{i18n._(t``)}</div>
                  </div>
                )}
                <div className="flex-col">
                  {lockers.map((locker, index) => {
                    return (
                      <Disclosure key={index}>
                        {() => (
                          <div className="mb-4">
                            <Disclosure.Button
                              className={classNames(
                                'w-full px-4 py-6 text-left rounded select-none bg-dark-700/20  text-primary text-sm md:text-lg'
                              )}
                            >
                              <div className="grid grid-cols-5">
                                <div className="flex items-center col-span-2">
                                  {token?.name} ({token?.symbol})
                                </div>
                                <div className="flex flex-col justify-center">
                                  {CurrencyAmount.fromRawAmount(token, locker?.amount).toSignificant(6)}
                                </div>
                                <div className="flex flex-col items-end justify-center">
                                  <div className="text-xs text-right md:text-base text-secondary">
                                    {moment.unix(locker?.unlockTimestamp.toString()).fromNow()}
                                  </div>
                                </div>
                                <div className="flex flex-col items-end justify-center">
                                  <div className="text-xs text-right md:text-base text-secondary">
                                    <Button
                                      variant="link"
                                      style={{ width: '100%' }}
                                      onClick={() => handleWithdraw(locker?.id)}
                                      disabled={
                                        moment.unix(locker?.unlockTimestamp.toString()).isAfter(new Date()) ||
                                        !account ||
                                        (account && getAddress(account) != getAddress(locker?.withdrawer))
                                      }
                                    >
                                      Withdraw
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Disclosure.Button>
                          </div>
                        )}
                      </Disclosure>
                    )
                  })}
                </div>
              </Card>
            </div>
          </div>
        </DoubleGlowShadow>
      </div>
    </>
  )
}
