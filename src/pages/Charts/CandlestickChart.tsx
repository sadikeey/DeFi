/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react'
import {
  createChart,
  IChartApi,
  CandlestickSeriesOptions,
  UTCTimestamp,
} from 'lightweight-charts'

export interface CandlestickData {
  timestamp: string
  volume: string
  close: string
  high: string
  low: string
  open: string
  sum: string
}

interface CandlestickChartProps {
  data: CandlestickData[]
  showVolume?: boolean
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({
  data,
  showVolume = true,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candlestickSeriesRef = useRef<CandlestickSeriesOptions | null>(null)
  const lineSeriesRef = useRef<any | null>(null)
  let candlestickSeries

  useEffect(() => {
    if (chartContainerRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        width: 700,
        height: 350,
        leftPriceScale: {
          visible: showVolume,
        },
        rightPriceScale: {
          visible: true,
        },
      })
      candlestickSeries = chartRef.current.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
        priceScaleId: 'right',
      })

      if (showVolume) {
        lineSeriesRef.current = chartRef.current.addLineSeries({
          color: '#0c86b7',
          priceScaleId: 'left',
          lineWidth: 1,
        })
      }

      if (data.length > 0) {
        const formattedCandlestickData = data.map((item) => ({
          time: parseInt(item.timestamp, 10) as UTCTimestamp,
          open: parseFloat(item.open),
          high: parseFloat(item.high),
          low: parseFloat(item.low),
          close: parseFloat(item.close),
        }))
        candlestickSeries.setData(formattedCandlestickData)

        if (showVolume) {
          const formattedLineData = data.map((item) => ({
            time: parseInt(item.timestamp, 10) as UTCTimestamp,
            value: parseFloat(item.sum),
          }))
          lineSeriesRef.current.setData(formattedLineData)
        }

        chartRef.current.timeScale().fitContent()
      }
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove()
        chartRef.current = null
        candlestickSeriesRef.current = null
        lineSeriesRef.current = null
      }
    }
  }, [data, showVolume])

  return (
    <div className='relative inline-block px-2 pt-2 border-2'>
      <div
        ref={chartContainerRef}
        className='border-1 border-lightgray transition duration-300 ease-in w-min-content pl-15 pt-15'
      />
    </div>
  )
}

export default CandlestickChart
