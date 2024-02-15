import NavBar, { DrawerHeader } from "@/components/dashboard/nav-bar";
import { Box } from "@mui/material";
import React from "react";

export default function PrivateLayout(props: { children: React.ReactNode }) {
   return (
      <Box sx={{ display: "flex" }}>
         <NavBar />
         <Box sx={{ display: "flex" }}>
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
               <DrawerHeader />
               {props.children}
            </Box>
         </Box>
      </Box>
   );
}
