
import { Button, colors, Grid, Popover } from "@mui/material";
import { InsertInvitation } from '@mui/icons-material';
import { isEqual, isWithinInterval, isBefore } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { DateRange } from "@types/Date";
import { displayFormat } from "@utils/date";


export const DateRangePicker = ({date, setDate}: {date: DateRange | undefined, setDate: Dispatch<SetStateAction<DateRange | undefined>>}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Grid>
      <Button 
        id="date"
        variant="outlined"
        sx={{
          w: "300px", justifyContent: 'start', textAlign: 'left',
          fontWeight: '400', color: (!date ? colors.grey[400]: 'initial'),
          border: "1px solid #00000029", "&:hover": {border: "1px solid #0000007a"} 
        }}
        aria-describedby={id}
        onClick={handleClick}
      >
        <InsertInvitation sx={{mr: 2, h: 4, w: 4}} />
        {date?.from ? (
          date.to ? (
            <>
              {displayFormat(date.from)} -{" "}
              {displayFormat(date.to)}
            </>
          ) : (
            displayFormat(date.from)
          )
        ) : (
          <span>Pick a date</span>
        )}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <DateCalendar
          defaultValue={date?.from}
          value={date?.from}
          showDaysOutsideCurrentMonth
          slots={{day: DayRangePicker}}
          slotProps={{day: () => ({selectedDate: date}) as any}}
          onChange={(value) => {
            if(date?.from && date.to) {
              setDate({from: value as Date, to: undefined})
            }
            if(date?.from && !date.to) {
              if(isBefore(date.from, value as Date)) {
                setDate({...date, to: value as Date})
              } else {
                setDate({from: value as Date, to: date.from})
              }
            }
          }}
        />
      </Popover>
    </Grid>
  )
}

const DayRangePicker = (props: any) => {
  const {selectedDate, ...reactProps} = props

  let IsSelected = isEqual(props.day, selectedDate?.from as Date) || isEqual(props.day, selectedDate?.to as Date)

  if(selectedDate.from && selectedDate.to) {
    IsSelected = IsSelected || isWithinInterval(props.day, {start: selectedDate?.from as Date, end: selectedDate?.to as Date})
  }

  const rangeStyle = () => {
    if(isEqual(props.day, selectedDate?.from as Date)) {
      return {borderRadius: "50% 0 0 50%"}
    }
    if(isEqual(props.day, selectedDate?.to as Date)) {
      return {borderRadius: "0 50% 50% 0"}
    }
    if(selectedDate.from && selectedDate.to && isWithinInterval(props.day, {start: selectedDate?.from as Date, end: selectedDate?.to as Date})) {
      return {borderRadius: 0}
    }
    return {}
  }

  return (
    <PickersDay
      {...reactProps}
      selected={IsSelected}
      disableMargin
      sx={{...rangeStyle(), px: 2.5, "&.Mui-selected": {backgroundColor: "#6366f1", "&:hover": {backgroundColor: "#4f46e5"}}, }}
    />
  )
}