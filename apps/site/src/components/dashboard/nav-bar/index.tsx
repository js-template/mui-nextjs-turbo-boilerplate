"use client";
import AdbIcon from "@mui/icons-material/Adb";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CSSObject, Theme, styled, useTheme } from "@mui/material/styles";
import NextLink from "next/link";
import React, { Fragment } from "react";
import CustomAppBar from "../app-bar";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
   width: drawerWidth,
   transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
   }),
   overflowX: "hidden"
});

const closedMixin = (theme: Theme): CSSObject => ({
   transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
   }),
   overflowX: "hidden",
   width: `calc(${theme.spacing(7)} + 1px)`,
   [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`
   }
});

interface AppBarProps extends MuiAppBarProps {
   open?: boolean;
}

const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
   zIndex: theme.zIndex.drawer + 1,
   transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
   }),
   ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen
      })
   })
}));

const Drawer = styled(MuiDrawer, {
   shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
   flexShrink: 0,
   whiteSpace: "nowrap",
   boxSizing: "border-box",
   ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme)
   }),
   ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme)
   })
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
   display: "flex",
   alignItems: "center",
   justifyContent: "flex-end",
   padding: theme.spacing(0, 1),
   // necessary for content to be below app bar
   ...theme.mixins.toolbar
}));

const NavBar = () => {
   const theme = useTheme();
   const [open, setOpen] = React.useState(true);
   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   const handleDrawerOpen = () => {
      setOpen(true);
   };

   const handleDrawerClose = () => {
      setOpen(false);
   };

   return (
      <Fragment>
         <CustomAppBar
            open={open}
            handleDrawerOpen={handleDrawerOpen}
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
            anchorElUser={anchorElUser}
         />
         <Drawer variant='permanent' open={open}>
            <DrawerHeader>
               <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
               <Typography
                  variant='h6'
                  noWrap
                  component={NextLink}
                  href='/'
                  sx={{
                     mr: 2,
                     display: { xs: "none", md: "flex" },
                     fontFamily: "monospace",
                     fontWeight: 700,
                     letterSpacing: ".3rem",
                     color: "inherit",
                     textDecoration: "none"
                  }}
               >
                  LOGO
               </Typography>
               <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
               </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
               {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                  <ListItem key={text} disablePadding sx={{ display: "block" }}>
                     <ListItemButton
                        sx={{
                           minHeight: 48,
                           justifyContent: open ? "initial" : "center",
                           px: 2.5
                        }}
                     >
                        <ListItemIcon
                           sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center"
                           }}
                        >
                           {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                     </ListItemButton>
                  </ListItem>
               ))}
            </List>
            <Divider />
            <List>
               {["All mail", "Trash", "Spam"].map((text, index) => (
                  <ListItem key={text} disablePadding sx={{ display: "block" }}>
                     <ListItemButton
                        sx={{
                           minHeight: 48,
                           justifyContent: open ? "initial" : "center",
                           px: 2.5
                        }}
                     >
                        <ListItemIcon
                           sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center"
                           }}
                        >
                           {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                     </ListItemButton>
                  </ListItem>
               ))}
            </List>
         </Drawer>
      </Fragment>
   );
};

export default NavBar;
