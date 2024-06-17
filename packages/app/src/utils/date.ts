import { format } from "date-fns";

export const apiFormat = (date: Date) => format(date, "y-MM-dd")
export const displayFormat = (date: Date) => format(date, "LLL dd, y")