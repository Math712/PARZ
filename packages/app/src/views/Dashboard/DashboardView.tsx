import { FC, useEffect, useState } from "react";
import { Box, Card, CircularProgress, Grid, Stack, Typography, colors } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { addDays } from "date-fns";
import { TotalRevenue } from "./DashboardComponents/TotalRevenue";
import { KpiItem, KpiSection } from "./DashboardComponents/KpiSection";
import { DateRangePicker } from "@components/ui/DatePicker";
import { LineCharts } from "@components/charts/LineCharts";
import { BarCharts } from "@components/charts/BarCharts";
import { AvgTripsDurationResponse, CabRevenueResponse, RevenueResponse, TripsByDateResponse, TripsCountResponse } from "@types/Response";
import { DateRange } from "@types/Date";
import { apiFormat, displayFormat } from "@utils/date";
import { displayFormat as PriceDisplayFormat } from "@utils/price"

const DashboardView: FC<any> = () => {
  const [revenue, setRevenue] = useState<RevenueResponse>();
  const [tripsCount, setTripsCount] = useState<TripsCountResponse>();
  const [avgTripsDuration, setAvgTripsDuration] = useState<AvgTripsDurationResponse>();
  const [tripsByDate, setTripsByDate] = useState<TripsByDateResponse>()
  const [cabRevenue, setCabRevenue] = useState<CabRevenueResponse>()
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 1, 1),
    to: addDays(new Date(2023, 1, 1), 10),
  })

  useEffect(() => {
    if(date?.from && date.to) {
      Promise.all([
        fetch(`http://localhost:3000/revenue?start_date=${apiFormat(date.from as Date)}&end_date=${apiFormat(date?.to as Date)}`),
        fetch(`http://localhost:3000/trips/count?start_date=${apiFormat(date?.from as Date)}&end_date=${apiFormat(date?.to as Date)}`),
        fetch(`http://localhost:3000/trips/average-time?start_date=${apiFormat(date?.from as Date)}&end_date=${apiFormat(date?.to as Date)}`),
        fetch(`http://localhost:3000/trips/count-by-date?start_date=${apiFormat(date?.from as Date)}&end_date=${apiFormat(date?.to as Date)}`),
        fetch(`http://localhost:3000/cab/revenue?start_date=${apiFormat(date?.from as Date)}&end_date=${apiFormat(date?.to as Date)}`)
      ])
        .then(ress => ress.map(res => res.json()))
        .then(responses => {
          responses[0].then(revenueResponse => setRevenue(revenueResponse[0]))
          responses[1].then(tripsCountResponse => setTripsCount(tripsCountResponse[0].total_trips))
          responses[2].then(avgTripsDurationResponse => setAvgTripsDuration(avgTripsDurationResponse[0].average_trip_duration))
          responses[3].then(tripsByDateResponse => setTripsByDate(tripsByDateResponse))
          responses[4].then(cabRevenueResponse => setCabRevenue(cabRevenueResponse))
        })
    } else {
      setRevenue(undefined)
      setTripsCount(undefined)
      setAvgTripsDuration(undefined)
      setTripsByDate(undefined)
    }
  }, [date]);

  return (
    <Box sx={{ padding: 5, display: "flex", flexDirection: "column", flex: "1 1 0%"}}>
      <Typography variant={"h1"} sx={{fontSize: "2rem", fontWeight: 'bold'}}>Dashboard</Typography>
      <Stack direction="row" sx={{marginTop: "2rem", justifyContent: "space-between"}}>
        <Typography variant={"h2"} sx={{width: "50%", fontSize: "1.75rem", fontWeight: 'bold', "& span": {color: "#4338ca"}}}>Your total revenue <TotalRevenue revenue={revenue}/></Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns} >
          <DateRangePicker date={date} setDate={setDate}/>
        </LocalizationProvider>
      </Stack>
      <KpiSection>
        <KpiItem value={tripsCount}>
          <Typography variant="body2" sx={{color: colors.grey[500]}}>
              Total trips
          </Typography>
          <Typography variant="body1" sx={{fontWeight: 'bold'}}>
            {Number(tripsCount)?.toLocaleString('fr-FR')}
          </Typography>
        </KpiItem>
        <KpiItem value={revenue}>
            <Typography variant="body2" sx={{color: colors.grey[500]}}>
              Total Revenue
            </Typography>
          <div>
            <Typography variant="body1" sx={{fontWeight: 'bold'}}>
              {PriceDisplayFormat(revenue?.total_revenue??0 + (revenue?.total_tips??0))}
            </Typography>
            <Stack direction="row" sx={{alignItems: 'end', mt: 1}} spacing={2}>
              <div>
                <Typography variant="body2" sx={{color: colors.grey[500], fontSize: '0.7rem'}}>
                  Total payout trip
                </Typography>
                <Typography variant="body1" sx={{fontWeight: 'bold', fontSize: '0.7rem'}}>
                  {PriceDisplayFormat(revenue?.total_revenue)}
                </Typography>
              </div>
              <div>
                <Add sx={{width: '1rem', height: '1rem'}} />
              </div>
              <div>
                <Typography variant="body2" sx={{color: colors.grey[500], fontSize: '0.7rem'}}>
                  Total tips trip
                </Typography>
                <Typography variant="body1" sx={{fontWeight: 'bold', fontSize: '0.7rem'}}>
                  {PriceDisplayFormat(revenue?.total_tips)}
                </Typography>
              </div>
            </Stack>
          </div>
        </KpiItem>
        <KpiItem value={avgTripsDuration}>
          <Typography variant="body2" sx={{color: colors.grey[500]}}>
            Average Trip Duration
          </Typography>
          <Typography variant="body1" sx={{"& > span": {fontWeight: 'bold'}}}>
            <span>{avgTripsDuration?.minutes}</span> minutes <span>{avgTripsDuration?.seconds}</span> seconds
          </Typography>
        </KpiItem>
      </KpiSection>
      <Grid container sx={{mt: 2, justifyContent: 'center'}} >
        <Card 
          variant="outlined"
          sx={{
            maxWidth: "100%", minWidth: "500px", height: "300px", p: 4, m: 2,
            borderRadius: "0.38rem", filter: "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))",
            display: "flex", justifyContent: 'center', alignItems: 'center'
          }}
        >
          {!tripsByDate ? 
            <CircularProgress sx={{color: "#4338ca"}} /> : 
            <LineCharts 
              data={tripsByDate?.map(tot => tot.total_trips)}
              label={tripsByDate?.map(tot => displayFormat(new Date(tot.start_day)))}
              legend={"Trips over time"}
              title="Evolution of the Number of Trips Over Time"
            />
          }
        </Card>
        <Card 
          variant="outlined"
          sx={{
            maxWidth: "100%", minWidth: "500px", height: "300px", p: 4, m: 2,
            borderRadius: "0.38rem", filter: "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))",
            display: "flex", justifyContent: 'center', alignItems: 'center'
          }}
        >
          {!tripsByDate ? 
            <CircularProgress sx={{color: "#4338ca"}} /> : 
            <BarCharts 
              data={cabRevenue?.map(cr => cr.total_revenue.toString()) as string[]}
              label={cabRevenue?.map(cr => cr.cab_id.toString()) as string[]}
              legend={"Revenue per cab"}
              title="Distribution of Income by Vehicle Type (5 better max.)"
            />
          }
        </Card>
      </Grid>
    </Box>
  );
};

export default DashboardView;
