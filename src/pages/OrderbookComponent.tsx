/* eslint-disable @typescript-eslint/dot-notation */
import { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  makeStyles,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles({
  tableHeaderCell: {
    backgroundColor: '#15803D',
    color: 'white',
    padding: '3px 15px',
    width: '100px',
    height: '15px',
  },
  priceTableCell: {
    border: '1px solid #e1e3e1',
    padding: '2px 15px',
  },
  volumeTableCell: {
    border: '1px solid #e1e3e1',
    padding: '2px 15px',
    color: 'black',
  },
})

const options = [
  { value: 'BTC_USDT', label: 'BTC_USDT' },
  { value: 'ETH_USDT', label: 'ETH_USDT' },
  { value: 'LTC_USDT', label: 'LTC_USDT' },
  { value: 'SOL_USDT', label: 'SOL_USDT' },
  // ... (additional currency pairs)
]

const OrderbookComponent = ({ currencyPair }: { currencyPair: string }) => {
  const classes = useStyles()
  const [selectedCurrencyPair, setSelectedCurrencyPair] = useState(currencyPair)
  const [orderbookData, setOrderbookData] = useState<any>({})

  useEffect(() => {
    setSelectedCurrencyPair(currencyPair)
  }, [currencyPair])

  useEffect(() => {
    const fetchOrderbookData = async () => {
      const response = await axios.get(
        `https://api.tonnochycapital.com/gateio/spot/getSpotOrderbook?currencyPair=${selectedCurrencyPair}`,
      )
      setOrderbookData(response.data)
    }

    fetchOrderbookData()

    const intervalId = setInterval(() => {
      fetchOrderbookData()
    }, 2000) // 2000 milliseconds (2 seconds)

    return () => clearInterval(intervalId)
  }, [selectedCurrencyPair])

  const handleChange = (selectedOption: any) => {
    setSelectedCurrencyPair(selectedOption.value)
  }

  const customFilter = (option: any, searchTerm: any) => {
    if (searchTerm) {
      return option.label.toLowerCase().includes(searchTerm.toLowerCase())
    }
    return true
  }
  let sortedBids
  let sortedAsks
  if (!(JSON.stringify(orderbookData) === '{}')) {
    sortedBids = orderbookData['bids'].sort((a: any, b: any) => b[0] - a[0])
    sortedAsks = orderbookData['asks'].sort((a: any, b: any) => a[0] - b[0])
  }

  const dropdownStyles = {
    container: (base: any) => ({ ...base, width: '200px' }),
    control: (base: any) => ({ ...base, padding: '2px' }),
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '200px', marginRight: '10px' }}>
        <Select
          value={{ value: selectedCurrencyPair, label: selectedCurrencyPair }}
          onChange={handleChange}
          options={options}
          placeholder='Search currency pairs...'
          styles={dropdownStyles}
          filterOption={customFilter}
        />
      </div>
      <div style={{ marginLeft: '10px' }}>
        <Typography variant='h4' style={{ fontSize: '25px', color: 'green' }}>
          Bids
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell} align='right'>
                  Price
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align='right'>
                  Volume
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedBids
                ?.slice(0, 35)
                .map(([price, volume]: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell
                      className={classes.priceTableCell}
                      align='right'
                      style={{ color: 'green' }}
                    >
                      {price}
                    </TableCell>
                    <TableCell
                      className={classes.volumeTableCell}
                      align='right'
                    >
                      {volume}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ marginLeft: '50px' }}>
        <Typography variant='h4' style={{ fontSize: '25px', color: 'red' }}>
          Asks
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell} align='right'>
                  Price
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align='right'>
                  Volume
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAsks
                ?.slice(0, 35)
                .map(([price, volume]: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell
                      className={classes.priceTableCell}
                      align='right'
                      style={{ color: 'red' }}
                    >
                      {price}
                    </TableCell>
                    <TableCell
                      className={classes.volumeTableCell}
                      align='right'
                    >
                      {volume}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default OrderbookComponent
