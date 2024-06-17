import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardView from "@views/Dashboard/DashboardView";
import { NavBar, NavBarItem } from "@components/ui/navBar";
import { DashboardOutlined, HelpOutline, MessageOutlined, SettingsOutlined, TrendingUpOutlined } from "@mui/icons-material";
import { Divider, Stack } from "@mui/material";

const router = createBrowserRouter([{ path: "/", element: <DashboardView /> }]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Stack direction="row" >
      <NavBar>
        <NavBarItem icon={<DashboardOutlined />} text="Dashboard" active={true} />
        <NavBarItem icon={<TrendingUpOutlined />} text="Performance" />
        <NavBarItem icon={<MessageOutlined />} text="Messages" />
        <Divider sx={{marginTop: "1rem", marginBottom: "1rem"}}/>
        <NavBarItem icon={<SettingsOutlined />} text="Setting" />
        <NavBarItem icon={<HelpOutline />} text="Help" />
      </NavBar>
      <RouterProvider router={router} />
    </Stack>
  </StrictMode>,
);
