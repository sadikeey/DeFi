import { useEffect, useState } from 'react'
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi'
// import { fetchCoinGecko } from '../services/api'
import { ICoinGeko } from '../types/api'
import coins from '../data/coins'

const Featured = () => {
  const [coin, setCoin] = useState<ICoinGeko[]>([])

  useEffect(() => {
    const getCoinGecko = async (): Promise<void> => {
      const getCoin = await coins
      console.log(getCoin)
      setCoin(getCoin)
    }
    getCoinGecko()
  }, [])

  return (
    <div className='bg-[#F5F8FF] w-full'>
      <section className='mx-auto flex flex-col gap-4 max-w-[94vw] xl:max-w-[64vw] xl:flex-row xl:py-20 mt-40 justify-between'>
        <div className='flex flex-col gap-8 p-8 xl:w-[50%]'>
          <article className='flex flex-col gap-4'>
            <h1 className='text-5xl font-bold'>
              Explore top Crypto's Like Bitcoin, Ethereum, and Dogecoin
            </h1>
            <p>
              Empowering Your Financial Future: Intelligent Investments,
              Informed Decisions
            </p>
          </article>
          <div className='flex w-full flex-col items-center gap-4 xl:flex-row'>
            <input
              className='h-10 w-full rounded rounded-br-2xl rounded-tl-2xl border-[1px] border-green-700 p-6 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
              type='email'
              placeholder='Search Coin'
            ></input>
            <button
              type='button'
              className='text-normal w-full rounded rounded-br-2xl rounded-tl-2xl bg-green-700 p-3 font-semibold text-white hover:bg-green-600 hover:text-white'
            >Search</button>
          </div>
        </div>
        <div
          id='coins'
          className='flex flex-wrap gap-4 xl:w-[50%] justify-center pb-16 xl:pb-0'
        >
          {!coin.length ? (
            <h1>Loading Coins...</h1>
          ) : (
            coin.map((coin) => {
              return (
                <article
                  key={coin.id}
                  className='flex flex-col bg-white hover:bg-gray-50 cursor-pointer rounded-xl p-4 px-12 justify-center items-center w-[10rem] xl:w-[11rem]'
                >
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className='w-[5rem] inline'
                  />
                  <span className=''>
                    <h2 className='text-xl font-bold'>{coin.name}</h2>
                    <p>{`$${coin.current_price}`}</p>
                  </span>
                  {coin.price_change_percentage_24h < 0 ? (
                    <span className='text-red-500 px-2 py-1'>
                      <FiArrowDown className='inline' />
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  ) : (
                    <span className='text-green-500 px-2 py-1'>
                      <FiArrowUpRight className='inline' />
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  )}
                </article>
              )
            })
          )}
        </div>
      </section>
    </div>
  )
}

export default Featured
