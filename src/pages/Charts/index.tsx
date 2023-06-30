/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import CandlestickChart from './CandlestickChart'

export interface ICandlestickDataProps {
  timestamp: string
  volume: string
  close: string
  high: string
  low: string
  open: string
}

interface TokenChartProps {
  currencyPair: string
}

const TokenChart: React.FC<TokenChartProps> = ({ currencyPair }) => {
  const [data, setData] = useState<any>([])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.tonnochycapital.com/gateio/spot/getSpotCandlesticks?currencyPair=${currencyPair}`,
      )
      const apiData = response.data as ICandlestickDataProps[][]
      setData(apiData.flat())
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(() => {
      fetchData()
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [currencyPair])

  return <CandlestickChart data={data} />
}

interface CandlestickChartComponentProps {
  currencyPair: string
}

const fetchCurrencyPairs = async () => {
  try {
    const response = await axios.get(
      'https://api.tonnochycapital.com/gateio/spot/getSpotTickers',
    )
    const { data } = response

    const currencyPairs = data.map((item: any) => item.currency_pair)
    console.log(currencyPairs)
    return currencyPairs
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

const sanitizeString = (str: any) => {
  return str.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase()
}

const customFilter = (option: any, inputValue: any) => {
  return sanitizeString(option.label).includes(sanitizeString(inputValue))
}

const CandlestickChartComponent: React.FC<CandlestickChartComponentProps> = ({
  currencyPair,
}) => {
  const [selectedCurrencyPair, setSelectedCurrencyPair] = useState(currencyPair)
  const [currencyPairs, setCurrencyPairs] = useState([])

  useEffect(() => {
    fetchCurrencyPairs().then((pairs) => setCurrencyPairs(pairs))
  }, [])

  const options = currencyPairs.map((pair) => ({ value: pair, label: pair }))

  const handleChange = (selectedOption: any) => {
    setSelectedCurrencyPair(selectedOption.value)
  }

  return (
    <>
      <div style={{ display: 'flex', paddingTop: '0px', paddingLeft: '10px' }}>
        <div style={{ width: '200px', marginRight: '10px' }}>
          <Select
            value={{ value: selectedCurrencyPair, label: selectedCurrencyPair }}
            onChange={handleChange}
            options={options}
            placeholder='Search currency pairs...'
            styles={{
              container: (base) => ({ ...base, width: '200px', zIndex: 1000 }),
            }}
            filterOption={customFilter}
          />
        </div>
      </div>
      <div style={{ display: 'flex', paddingTop: '0px', paddingLeft: '10px' }}>
        <div style={{ flex: '1', minWidth: '320px' }}>
          <TokenChart currencyPair={selectedCurrencyPair} />
        </div>
      </div>
    </>
  )
}

export default CandlestickChartComponent
