import axios, { AxiosResponse, AxiosError } from 'axios'
import { ICoinGeko } from '../types/api'

const CoinGeckoUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false' as string

export const fetchCoinGecko = async (): Promise<ICoinGeko[]> => {
  try {
    const res: AxiosResponse<ICoinGeko[]> = await axios.get(CoinGeckoUrl)
    console.log(res)
    return res.data as ICoinGeko[]
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error
      console.error('Axios Error:', axiosError.message)
      console.error('Axios Status:', axiosError.response?.status)
      console.error('Axios Data:', axiosError.response?.data)
    } else {
      console.error('Error: Failed to fetch coin')
      console.error(error)
    }
    return {} as ICoinGeko[]
  }
}
