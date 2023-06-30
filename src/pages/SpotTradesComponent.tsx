import { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { makeStyles } from '@material-ui/core/styles'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
  buy: {
    color: 'green',
  },
  sell: {
    color: 'red',
  },
})

const SpotTradesComponent = ({ currencyPair }: { currencyPair: string }) => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const [selectedCurrencyPair, setSelectedCurrencyPair] = useState(currencyPair)
  const [currencyPairs, setCurrencyPairs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.tonnochycapital.com/gateio/spot/getSpotTickers',
        )
        const responseCurrency = response.data.map(
          (item: any) => item.currency_pair,
        )
        setCurrencyPairs(responseCurrency)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const options = currencyPairs.map((pair) => ({ value: pair, label: pair }))

  const handleChange = (selectedOption: any) => {
    setSelectedCurrencyPair(selectedOption.value)
  }

  const customFilter = (option: any, inputValue: any) => {
    return option.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.tonnochycapital.com/gateio/spot/getSpotTrades',
          {
            params: {
              currencyPair: selectedCurrencyPair,
            },
          },
        )
        setData(response.data.slice(0, 50))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
    const interval = setInterval(() => {
      fetchData()
    }, 3000)
    return () => clearInterval(interval)
  }, [selectedCurrencyPair])

  const tableCellStyle = {
    width: '100px',
    height: '15px',
    border: '1px  solid #e1e3e1',
    paddingTop: '2px',
    paddingBottom: '2px',
    paddingLeft: '5px',
    paddingRight: '15px',
  }

  const tableHeaderStyle = {
    width: '100px',
    height: '15px',
    backgroundColor: '#15803D',
    color: 'white',
    paddingTop: '3px',
    paddingBottom: '3px',
    paddingLeft: '5px',
    paddingRight: '15px',
  }

  return (
    <div style={{ display: 'flex', paddingTop: '0px', paddingLeft: '10px' }}>
      <div style={{ width: '200px', marginRight: '10px' }}>
        <Select
          value={{ value: selectedCurrencyPair, label: selectedCurrencyPair }}
          onChange={handleChange}
          options={options}
          placeholder='Search currency pairs...'
          styles={{ container: (base) => ({ ...base, width: '200px' }) }}
          filterOption={customFilter}
        />
      </div>
      <div
        style={{
          marginLeft: '10px',
          maxHeight: 'calc(3rem * 9)',
          overflowY: 'scroll',
        }}
      >
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='spot trades table'>
            <TableHead>
              <TableRow>
                <TableCell align='right' style={tableHeaderStyle}>
                  Time
                </TableCell>
                <TableCell align='right' style={tableHeaderStyle}>
                  Price
                </TableCell>
                <TableCell align='right' style={tableHeaderStyle}>
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(({ id, create_time, side, price, amount }) => (
                <TableRow key={id}>
                  <TableCell
                    component='th'
                    scope='row'
                    align='right'
                    style={tableCellStyle}
                  >
                    {create_time}
                  </TableCell>
                  <TableCell
                    align='right'
                    style={tableCellStyle}
                    className={side === 'buy' ? classes.buy : classes.sell}
                  >
                    {price}
                  </TableCell>
                  <TableCell align='right' style={tableCellStyle}>
                    {amount}
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

export default SpotTradesComponent
