import { useState } from 'react'
import { postGateioSpotCreateOrder } from '../services/api'
import { IOrderFormData } from '../types/api'

const OrderPlacementForm: React.FC = () => {
  const [sellBuy, setSellBuy] = useState('Buy')

  const [orderFormData, setorderFormData] = useState<IOrderFormData>({
    currencyPair: 'BTC_USDT',
    side: 'BUY',
    amount: '',
    price: '',
  })

  /* This is mock data for the order placement form. */
  const orderPlacementMockData = {
    symbol: 'BTC_USDT',
    chartTypePlaceholder: ['Candle', 'Line', 'Area'],
    symbolPriceChange: '+2.10%',
    orderTypePlaceholder: ['Market', 'Limit', 'Stop', 'Stop Limit'],
    strategyPlaceholder: [
      'TP Calesty v0.5',
      'TP Calesty v0.6',
      'TP Calesty v0.7',
    ],
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    postGateioSpotCreateOrder(orderFormData)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setorderFormData({
      ...orderFormData,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <form
      className='flex flex-col shadow-xl text-sm justify-center gap-4 p-8 bg-white rounded-lg max-w-xs'
      onSubmit={handleSubmit}
    >
      <div className='flex items-center gap-2'>
        <h1 className='text-3xl font-medium'>
          {orderPlacementMockData.symbol}
        </h1>
      </div>
      <div className='flex w-full border-[1px] rounded'>
        <button
          type='button'
          className={`w-full p-2 px-4 rounded-l
          ${
            sellBuy === 'Buy'
              ? 'bg-teal-500 text-white'
              : 'bg-gray-50 text-black'
          }`}
          onClick={() => setSellBuy('Buy')}
        >
          Buy
        </button>
        <button
          type='button'
          className={`w-full p-2 px-4 rounded-r
          ${
            sellBuy === 'Sell'
              ? 'bg-red-400 text-white'
              : 'bg-gray-50 text-black'
          }`}
          onClick={() => setSellBuy('Sell')}
        >
          Sell
        </button>
      </div>
      <select className='w-full p-2 rounded text-black bg-gray-50'>
        {orderPlacementMockData.orderTypePlaceholder.map((orderType) => (
          <option key={orderType} value={orderType}>
            {orderType}
          </option>
        ))}
      </select>
      <input
        type='number'
        placeholder='Price'
        step='0.01'
        className='w-full p-2 px-4 rounded text-black bg-gray-50'
        name='price'
        value={orderFormData.price}
        onChange={handleChange}
        required
      />
      <input
        type='number'
        placeholder='Amount'
        step='0.01'
        className='w-full p-2 px-4 rounded text-black bg-gray-50'
        name='amount'
        value={orderFormData.amount}
        onChange={handleChange}
        required
      />
      <button
        type='submit'
        className={`w-full p-2 px-4 rounded
        ${
          sellBuy === 'Buy' ? 'bg-teal-500 text-white' : 'bg-red-400 text-white'
        }`}
        onClick={() =>
          setorderFormData({
            ...orderFormData,
            side: sellBuy,
          })
        }
      >
        {sellBuy === 'Buy' ? 'Buy' : 'Sell'}
      </button>
    </form>
  )
}

export default OrderPlacementForm
