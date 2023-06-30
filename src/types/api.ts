export interface IGateioSpotTickers {
  currency_pair: string
  last: string
  base_volume: string
  quote_volume: string
  high_24h: string
  low_24h: string
}
export interface IOrderFormData {
  currencyPair: string
  side: string
  amount: string
  price: string
}

export interface IGateioSpotOpenTradeOrder {
  id: string
  create_time: string
  update_time: string
  currency_pair: string
  status: string
  type: string
  account: string
  side: string
  amount: string
  price: string
  left: string
  filled_total: string
  fee: string
  fee_currency: string
}

export interface IGateioSpotOpenOrder {
  currency_pair: string
  total: number
  orders: IGateioSpotOpenTradeOrder[]
}

export interface IGateioSpotOrder {
  id: string
  create_time: string
  update_time: string
  currency_pair: string
  status: string
  type: string
  account: string
  side: string
  amount: string
  price: string
  left: string
  filled_total: string
  fee: string
  fee_currency: string
}

export interface IGateioPerpetualsFuturesContract {
  name: string
  type: string
  quanto_multiplier: string
  ref_discount_rate: string
  order_price_deviate: string
  maintenance_rate: string
  mark_type: string
  last_price: string
  mark_price: string
  index_price: string
  funding_rate_indicative: string
  mark_price_round: string
  funding_offset: number
  in_delisting: boolean
  risk_limit_base: string
  interest_rate: string
  order_price_round: string
  order_size_min: number
  ref_rebate_rate: string
  funding_interval: number
  risk_limit_step: string
  leverage_min: string
  leverage_max: string
  risk_limit_max: string
  maker_fee_rate: string
  taker_fee_rate: string
  funding_rate: string
  order_size_max: number
  funding_next_apply: number
  short_users: number
  config_change_time: number
  trade_size: number
  position_size: number
  long_users: number
  funding_impact_value: string
  orders_limit: number
  trade_id: number
  orderbook_id: number
  enable_bonus: boolean
  enable_credit: boolean
  create_time: number
}

