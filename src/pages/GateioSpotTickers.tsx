import { useState, useEffect } from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  makeStyles,
} from '@material-ui/core'
import { ClipLoader } from 'react-spinners'

interface IFetchSpotTickers {
  currency_pair: string
  base_volume: string
  quote_volume: string
  high_24h: string
  low_24h: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  headerCell: {
    color: theme.palette.common.white,
  },
  tableHead: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  searchWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    alignItems: 'baseline',
    backgroundColor: '#e5e7eb',
    paddingBottom: '5px',
    paddingTop: '5px',
    borderBottom: '1px solid gray',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderColor: 'gray',
  },
  search: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    border: '1px solid #ced4da',
    padding: '4px 12px',
    backgroundColor: 'white',
  },
}))

const GateioSpotTickers: React.FC<{
  spotTickerData: IFetchSpotTickers[]
  loading: boolean
}> = ({ spotTickerData, loading }) => {
  const classes = useStyles()
  const [search, setSearch] = useState('')
  const [filteredSpotTickers, setFilteredSpotTickers] = useState<
    IFetchSpotTickers[]
  >([])

  useEffect(() => {
    let sortedData: any
    if (spotTickerData) {
      const filteredData = spotTickerData.filter((d) =>
        d.currency_pair
          .replace('_', '')
          .toLowerCase()
          .includes(search.toLowerCase()),
      )
      sortedData = filteredData.sort(
        (a, b) => parseFloat(b.quote_volume) - parseFloat(a.quote_volume),
      )
    }
    setFilteredSpotTickers(sortedData)
  }, [search, spotTickerData])

  const formatVolume = (volume: any) => {
    return parseFloat(volume).toFixed(6)
  }

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value.toUpperCase())
  }

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
    paddingTop: '7px',
    paddingBottom: '7px',
    paddingLeft: '5px',
    paddingRight: '15px',
  }

  return (
    <div>
      <div className={classes.searchWrapper} style={{}}>
        <label htmlFor='search'>
          <input
            type='text'
            id='search'
            value={search}
            onChange={handleSearchChange}
            className={classes.search}
            placeholder='Search...'
          />
        </label>
      </div>
      <TableContainer
        component={Paper}
        className={classes.root}
        style={{ maxHeight: 'calc(3rem * 9)', overflowY: 'scroll' }}
      >
        <Table className={classes.table}>
          <TableHead
            className={`${classes.header} ${classes.tableHead}`}
            style={tableHeaderStyle}
          >
            <TableRow>
              <TableCell
                className={classes.headerCell}
                style={tableHeaderStyle}
              >
                Ticker | Base Currency
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={tableHeaderStyle}
              >
                Base Volume
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={tableHeaderStyle}
              >
                Quote Volume
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={tableHeaderStyle}
              >
                High 24h
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={tableHeaderStyle}
              >
                Low 24h
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className='flex justify-center items-center'>
                    <ClipLoader color='#007bff' />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredSpotTickers.map(
                (
                  {
                    currency_pair,
                    base_volume,
                    quote_volume,
                    high_24h,
                    low_24h,
                  },
                  index,
                ) => (
                  <TableRow
                    key={currency_pair}
                    style={index % 2 === 0 ? { background: '#f5f5f5' } : {}}
                  >
                    <TableCell style={tableCellStyle}>
                      {currency_pair}
                    </TableCell>
                    <TableCell style={tableCellStyle}>
                      {formatVolume(base_volume)}
                    </TableCell>
                    <TableCell style={tableCellStyle}>
                      {formatVolume(quote_volume)}
                    </TableCell>
                    <TableCell style={tableCellStyle}>{high_24h}</TableCell>
                    <TableCell style={tableCellStyle}>{low_24h}</TableCell>
                  </TableRow>
                ),
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default GateioSpotTickers
