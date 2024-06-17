export type RevenueResponse = {
  total_revenue: number,
  total_tips: number
} | undefined

export type TripsCountResponse = string | undefined

export type AvgTripsDurationResponse = {
  hours?: number,
  minutes?: number,
  seconds: number,
  milliseconds: number
} | undefined

export type TripsByDateResponse = {
  start_day: string,
  total_trips: string
}[] | undefined

export type CabRevenueResponse = {
  cab_id: string,
  total_revenue: number
}[] | undefined
