/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react'
import { getGateioSpotTickers } from '../services/api'
import GateioSpotTickers from './GateioSpotTickers'
import SpotTradesComponent from './SpotTradesComponent'
import OrderbookComponent from './OrderbookComponent'
import CandlestickChartComponent from './Charts'
import GateioFuturesContractList from './GateioFuturesContractList'
import { IGateioSpotTickers } from '../types/api'

interface IMainScreenTabButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
}

const MainScreenTabButton: React.FC<IMainScreenTabButtonProps> = ({
  active,
  onClick,
  children,
  disabled,
}) => {
  const activeClass = active
    ? 'bg-green-700 text-white border-l border-r border-gray-300'
    : 'text-gray-600'
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''
  return (
    <button
      disabled={disabled}
      className={`py-2 px-4 ${activeClass} ${disabledClass}`}
      type='button'
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const MainScreen = () => {
  const [spotTicker, setSpotTicker] = useState<IGateioSpotTickers[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const data = await getGateioSpotTickers()
      setSpotTicker(data)
      setLoading(false)
    })()
  }, [])

  const [activeTab, setActiveTab] = useState('exchange')
  const handleTabClick = (tabName: string) => {
    if (tabName === 'orderBook' && marketValue !== 'spot') return
    if (tabName === 'candlestick' && exchangeValue === 'kucoin') return
    setActiveTab(tabName)
  }

  const [exchangeValue, setExchangeValue] = useState('gate.io')
  const handleExchangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setExchangeValue(event.target.value)
  }

  const [marketValue, setMarketValue] = useState('spot')
  const handleMarketChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMarketValue(event.target.value)
  }

  let content: React.ReactNode

  const renderContentForExchangeMarket = () => {
    if (exchangeValue === 'gate.io' && marketValue === 'spot') {
      return <GateioSpotTickers spotTickerData={spotTicker} loading={loading} />
    }
    if (exchangeValue === 'gate.io' && marketValue === 'perps') {
      return <GateioFuturesContractList market='perpetual' />
    }
    if (exchangeValue === 'gate.io' && marketValue === 'delivery') {
      return <GateioFuturesContractList market='delivery' />
    }
    return <h1>{`${exchangeValue} ${marketValue}`}</h1>
  }

  if (activeTab === 'exchange') {
    content = (
      <>
        <div className='flex items-center'>
          <div className='flex items-center border p-2 bg-gray-100 rounded'>
            <label className='mr-2'>Exchange Name:</label>
            <select
              className='bg-transparent'
              value={exchangeValue}
              onChange={handleExchangeChange}
            >
              <option value='gate.io'>Gate.io</option>
              <option value='kucoin'>Kucoin</option>
            </select>
          </div>
          <div className='flex items-center border p-2 bg-gray-100 rounded'>
            <label className='mr-2'>Market:</label>
            <select
              className='bg-transparent'
              value={marketValue}
              onChange={handleMarketChange}
            >
              <option value='spot'>Spot</option>
              <option value='delivery'>Delivery futures</option>
              <option value='perps'>Perpetual futures</option>
            </select>
          </div>
        </div>
        {renderContentForExchangeMarket()}
      </>
    )
  } else if (activeTab === 'trades') {
    content = <SpotTradesComponent currencyPair='BTC_USDT' />
  } else if (activeTab === 'orderBook') {
    content = <OrderbookComponent currencyPair='BTC_USDT' />
  } else if (activeTab === 'candlestick') {
    content = <CandlestickChartComponent currencyPair='BTC_USDT' />
  }

  return (
    <div
      className='max-w-[1200px] mx-auto, h-full max-h-fit'
      style={{
        backgroundColor: 'white',
        borderRadius: '6px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
      }}
    >
      <div className='flex gap-0 border-b text-xl'>
        <MainScreenTabButton
          active={activeTab === 'exchange'}
          onClick={() => handleTabClick('exchange')}
        >
          Exchange
        </MainScreenTabButton>
        <MainScreenTabButton
          active={activeTab === 'trades'}
          onClick={() => handleTabClick('trades')}
        >
          Trades
        </MainScreenTabButton>
        <MainScreenTabButton
          active={activeTab === 'orderBook'}
          onClick={() => handleTabClick('orderBook')}
          disabled={marketValue !== 'spot'}
        >
          Order Book
        </MainScreenTabButton>
        <MainScreenTabButton
          active={activeTab === 'candlestick'}
          onClick={() => handleTabClick('candlestick')}
          disabled={exchangeValue === 'kucoin'}
        >
          Candlestick Chart
        </MainScreenTabButton>
      </div>
      <div className='min-h-[400px]'>{content}</div>
    </div>
  )
}

export default MainScreen
