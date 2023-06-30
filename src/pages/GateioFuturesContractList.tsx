import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { IGateioPerpetualsFuturesContract } from '../types/api'

const useStyles = makeStyles(() => ({
  tableHead: {
    position: 'sticky',
    top: 0,
    zIndex: 0,
  },
}))

const GateioFuturesContractList: React.FC<{
  market: 'perpetual' | 'delivery'
}> = ({ market }) => {
  const [search, setSearch] = useState('')
  const [filteredContracts, setFilteredContracts] = useState<
    IGateioPerpetualsFuturesContract[]
  >([])
  const [settleCurrency, setSettleCurrency] = useState('usdt')
  const [contracts, setContracts] = useState<
    IGateioPerpetualsFuturesContract[]
  >([])
  const [loading, setLoading] = useState(false)

  const classes = useStyles()

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        setLoading(true)
        const res: AxiosResponse<IGateioPerpetualsFuturesContract[]> =
          await axios.get(
            `https://api.tonnochycapital.com/gateio/${market}/get${
              market[0].toUpperCase() + market.slice(1)
            }FuturesContracts?settleCurrency=${settleCurrency}`,
          )
        const gateioPerpatualsFutureContract =
          res.data as IGateioPerpetualsFuturesContract[]
        if (Array.isArray(gateioPerpatualsFutureContract)) {
          setContracts(gateioPerpatualsFutureContract)
        } else {
          console.error(
            'API response is not an array:',
            gateioPerpatualsFutureContract,
          )
        }
        setLoading(false)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError: AxiosError = error
          console.error('Axios Error:', axiosError.message)
          console.error('Axios Status:', axiosError.response?.status)
          console.error('Axios Data:', axiosError.response?.data)
        } else {
          console.error('Error: Failed to fetch contract data')
          console.error(error)
        }
      }
    }
    fetchContractData()
  }, [market, settleCurrency])

  useEffect(() => {
    const filteredData = contracts
      .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a: any, b: any) => b.last_price - a.last_price) // Sort by last_price in descending order
    setFilteredContracts(filteredData)
  }, [search, contracts])

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value.toUpperCase())
  }

  const handleSettleCurrencyChange = (e: any) => {
    setSettleCurrency(e.target.value)
    // Make API call here with settleCurrency query param
  }

  const tableCellStyle = {
    width: '100px',
    height: '15px',
    border: '1px  solid #444',
    paddingTop: '2px',
    paddingBottom: '2px',
    paddingLeft: '5px',
    paddingRight: '15px',
    color: 'white',
  }

  const tableHeaderStyle = {
    width: '100px',
    height: '15px',
    backgroundColor: '#333333', // Lighter dark color for the header
    color: 'white',
    paddingTop: '3px',
    paddingBottom: '3px',
    paddingLeft: '5px',
    paddingRight: '15px',
  }

  return (
    <div className='w-full max-w-full overflow-y-scroll h-[400px] bg-black '>
      <div className='sticky top-0 z-10 flex items-baseline bg-[#222] p-2 border-b border-gray-700 '>
        <input
          type='text'
          value={search}
          onChange={handleSearchChange}
          className='w-48 px-2 py-1 mr-2 text-white placeholder-gray-400 bg-gray-900 border border-gray-700 rounded'
          placeholder='Search...'
        />
        <p className='font-sans pr-2 tracking-tight text-white'>
          Settle Currency
        </p>
        <select
          onChange={handleSettleCurrencyChange}
          value={settleCurrency}
          className='text-white bg-gray-900'
        >
          <option value='usdt'>USDT</option>
          <option value='btc'>BTC</option>
          {market === 'perpetual' && <option value='usd'>USD</option>}
        </select>
      </div>
      {loading ? (
        <div className='flex justify-center items-center'>
          <ClipLoader color='#007bff' />
        </div>
      ) : (
        <TableContainer
          component={Paper}
          style={{ maxHeight: 'full', backgroundColor: '#222' }}
        >
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                {[
                  'Name',
                  'Type',
                  'Quanto Multiplier',
                  'Maintenance Rate',
                  'Mark Price',
                  'Last Price',
                  'Risk Limit Base',
                  'Funding Next Apply',
                  'Long Users',
                  'Short Users',
                ].map((header) => (
                  <TableCell key={header} style={tableHeaderStyle}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContracts.map((contract: any, index) => (
                <TableRow
                  key={contract.name}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#333' : '#444',
                  }}
                >
                  <TableCell style={tableCellStyle}>{contract.name}</TableCell>
                  <TableCell style={tableCellStyle}>{contract.type}</TableCell>
                  <TableCell style={tableCellStyle}>
                    {contract.quanto_multiplier}
                  </TableCell>
                  <TableCell style={tableCellStyle}>
                    {contract.maintenance_rate}
                  </TableCell>
                  <TableCell style={tableCellStyle}>
                    {contract.mark_price}
                  </TableCell>
                  <TableCell style={tableCellStyle}>
                    {contract.last_price}
                  </TableCell>
                  <TableCell style={tableCellStyle}>
                    {contract.risk_limit_base}
                  </TableCell>
                  <TableCell style={tableCellStyle}>
                    {contract.funding_next_apply}
                  </TableCell>
                  <TableCell style={tableCellStyle}>
                    {contract.long_users}
                  </TableCell>
                  <TableCell style={tableCellStyle}>
                    {contract.short_users}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

export default GateioFuturesContractList
