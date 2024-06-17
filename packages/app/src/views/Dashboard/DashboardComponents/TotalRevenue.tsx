import { Skeleton } from "@mui/material";
import { displayFormat } from "@utils/price";
import { RevenueResponse } from "@types/Response";

export const TotalRevenue = ({revenue}: {revenue?: RevenueResponse}) => (
  <>
    {(!revenue?.total_revenue || !revenue?.total_tips) ?
      <Skeleton variant="text" sx={{ width: '10rem', display: 'inline-block'}} /> :
      <span>{displayFormat(revenue.total_revenue + revenue.total_tips)}</span>
    }
  </>
)
