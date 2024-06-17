import { Card, Skeleton, Stack } from "@mui/material"
import { AvgTripsDurationResponse, RevenueResponse, TripsCountResponse } from '@types/Response'
import { PropsWithChildren } from "react"

export const KpiSection = ({children}: PropsWithChildren) => {
  return (
    <Card variant="outlined" sx={{
      mt: 4,
      borderRadius: "0.38rem",
      filter: "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))",
      display: "flex",
      flexDirection: "row",
      "& > :not(:last-child)": {
        borderRight: "1px solid #00000029"
      }
    }}>
      {children}      
    </Card>
  )
}

export const KpiItem = ({value, children}: PropsWithChildren<{value: RevenueResponse | TripsCountResponse | AvgTripsDurationResponse }>) => {
  return (
    <Stack direction="column" sx={{justifyContent: 'space-between', py: 1, px: 2, width: "100%"}} >
      {!value ? 
        <>
          <Skeleton variant="text" sx={{mb: 1}} />
          <Skeleton variant="rectangular" />
        </> :
        children
      }
    </Stack>
  )
}