import axios, { AxiosResponse, AxiosError } from 'axios'
import {
  IGateioSpotTickers,
  IGateioSpotOpenOrder,
  IOrderFormData,
  IGateioSpotOrder,
} from '../types/api'

/* Base url for gate.io spot endpoints of tonnochy capital */
const gateioSpotBaseUrl = import.meta.env.VITE_GATEIO_SPOT_BASE_URL as string

/* Generic function to fetch data from Gateio spot endpoints using GET method */
async function getGateioSpotReq<T>(endpoint: string): Promise<T[]> {
  try {
    const config = {
      method: 'GET',
      url: `${gateioSpotBaseUrl}/${endpoint}`,
    }
    const res: AxiosResponse<T[]> = await axios(config)
    console.log(`Successfully fetched data from ${endpoint} endpoint.`)
    return res.data as T[]
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error
      console.error('Axios Error:', axiosError.message)
      console.error('Axios Status:', axiosError.response?.status)
      console.error('Axios Data:', axiosError.response?.data)
    } else {
      console.error(`Failed to fetch data from ${endpoint} endpoint.`)
      console.error(error)
    }
    return [] as T[]
  }
}

/* Generic function to post data to Gateio spot endpoints */
async function postGateioSpotReq<T, D>(endpoint: string, data: D): Promise<T> {
  try {
    const res: AxiosResponse<T> = await axios.post(
      `${gateioSpotBaseUrl}/${endpoint}`,
      data,
    )
    console.log(`Successfully posted data to ${endpoint} endpoint.`)
    return res.data as T
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error
      console.error('Axios Error:', axiosError.message)
      console.error('Axios Status:', axiosError.response?.status)
      console.error('Axios Data:', axiosError.response?.data)
    } else {
      console.error(`Failed to post data to ${endpoint} endpoint.`)
      console.error(error)
    }
    return {} as T
  }
}

/* Functions for fetching data from Gateio spot endpoints */

export const getGateioSpotTickers = () =>
  getGateioSpotReq<IGateioSpotTickers>('getSpotTickers')

export const getGateioSpotOpenOrders = () =>
  getGateioSpotReq<IGateioSpotOpenOrder>('getSpotOpenOrders')

/* Function for posting data to Gateio spot endpoints */

export const postGateioSpotCreateOrder = async (
  orderFormData: IOrderFormData,
): Promise<IGateioSpotOrder> => {
  try {
    const res = await postGateioSpotReq<IGateioSpotOrder, IOrderFormData>(
      'postSpotCreateOrder',
      orderFormData,
    )
    console.log('Successfully created order')
    return res
  } catch (error) {
    console.error('Error creating order:', error)
    return {} as IGateioSpotOrder
  }
}
