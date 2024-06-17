import { createContext, ReactNode, useContext, useState } from "react"
import { FirstPage, LastPage, MoreVert } from "@mui/icons-material"
import { Box, Button, colors, List, ListItem, Stack, styled, Typography } from "@mui/material"
import { NavBarItemProps } from "@types/NavBar"

const NavBarContext = createContext({expanded: true})

export const NavBar = ({children}: {children: ReactNode}) => {
  const [expanded, setExpanded] = useState(true)
  return (
    <Stack sx={{height: "100vh", width: "fit-content", position: 'sticky', top: "8px", zIndex: "100", "& > nav": {height: "100%", display: "flex", flexDirection: 'column', borderRight: "1px solid #e5e7eb", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"} }}>
      <nav>
        <Box sx={{
          padding: "1rem", paddingBottom: ".5rem", display: "flex", ...(expanded ? {justifyContent: 'space-between'} : {justifyContent: 'center'}), alignItems: 'center', 
          "& > img": {overflow: "hidden", transitionProperty: "all", transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", transitionDuration: "150ms", ...(expanded? { width: "8rem" } : { width: 0 })} 
        }}>
          <img src="https://img.logoipsum.com/243.svg" alt="logo" />
          <Button onClick={() => setExpanded(curr => !curr)} sx={{padding: "0.35rem", borderRadius: ".5rem", color: 'unset', minWidth: "unset"}} variant="text">
            {expanded ? <FirstPage /> : <LastPage />}
          </Button>
        </Box>
        <NavBarContext.Provider value={{expanded}}>
          <List sx={{flex: "1 1 0%", paddingLeft: ".75rem",  paddingRight: ".75rem"}}>
            {children}
          </List>
        </NavBarContext.Provider>
        <Box sx={{ borderTop: "1px solid #e5e7eb", display: 'flex', padding: "0.75rem", ...(expanded? {}: {width: 'fit-content'}), "& > img": {width: "2.5rem", heigth: "2.5rem", borderRadius: ".375rem"}}}>
          <img src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true" alt="" />
          <Box sx={{display: "flex", justifyContent: 'space-between', alignItems: 'center', overflow: "hidden", transitionProperty: "all", transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", transitionDuration: "150ms", ...(expanded? {width: "11rem", marginLeft: ".66rem"} : {width: 0})}}>
            <Box sx={{lineHeight: "1rem"}}>
              <Typography variant="h4" sx={{fontWeight: 'bold', fontSize: "1rem"}}>John Doe</Typography>
              <Typography variant="body2" sx={{fontSize: ".75rem", color: colors.grey[500]}}>
                johndoe@taxi.com
              </Typography>
            </Box>
            <MoreVert/>
          </Box>
        </Box>
      </nav>
    </Stack>
  )
}

export const NavBarItem = ({icon, text, active=false}: NavBarItemProps) => {
  const { expanded } = useContext(NavBarContext)
  return (
    <ListItem sx={{
      position: "relative", display: "flex", alignItems: "center",
      padding: '.5rem .75rem', margin: ".25rem 0", borderRadius: ".375rem",
      cursor: 'pointer', transitionProperty: "color, background-color",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", transitionDuration: "150ms",
      width: 'fit-content',
      ...(active ? {backgroundColor: "#c7d2fe", color: "#3730a3",
      }: {"&:hover": { backgroundColor: "#eef2ff"}, color: "#4b5563"}),
      "&:hover > .hoverText": { visibility: "visible", opacity: "1", transform: "translateX(0)" },
    }}>
      {icon}
      <Typography variant="body1" sx={{overflow: "hidden", transitionProperty: "all", transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", transitionDuration: "150ms", ...(expanded? {width: "13rem", marginLeft: "0.75rem"} : {width: 0})}}>{text}</Typography>
      {!expanded && 
        <Typography className="hoverText" variant="body1" sx={{
          position: "absolute", left: "100%", borderRadius: ".375rem",
          paddingLeft: ".75rem",  paddingRight: ".75rem", paddingTop: ".5rem",
          paddingBottom: ".5rem", marginLeft: "1.5rem", backgroundColor: "#e0e7ff",
          color: "#3730a3", fontSize: ".875rem", visibility: "hidden", opacity: ".2", 
          transform: "translateX(-0.75rem)", transitionProperty: "all",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", transitionDuration: "150ms",
        }}>
          {text}
        </Typography>
      }
    </ListItem>
  )
}