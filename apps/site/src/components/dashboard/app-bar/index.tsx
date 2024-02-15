import { authSignOut } from "@/lib/actions";
import { userMenu } from "@faceData/menus";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import _ from "lodash";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import React from "react";

const drawerWidth = 240;

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

const CustomAppBar = ({
   open,
   handleDrawerOpen,
   handleOpenUserMenu,
   handleCloseUserMenu,
   anchorElUser
}: {
   open: boolean;
   handleDrawerOpen: () => void;
   handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
   handleCloseUserMenu: () => void;
   anchorElUser: null | HTMLElement;
}) => {
   const { data, status } = useSession();
   return (
      <AppBar position='fixed' open={open}>
         <Toolbar
            sx={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center"
            }}
         >
            <Box
               sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center"
               }}
            >
               <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  onClick={handleDrawerOpen}
                  edge='start'
                  sx={{
                     marginRight: 3,
                     ...(open && { display: "none" })
                  }}
               >
                  <MenuIcon />
               </IconButton>
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     ...(open && { display: "none" })
                  }}
               >
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
               </Box>
               <Typography variant='h6' noWrap component='div'>
                  Mini variant drawer
               </Typography>
            </Box>

            <Box
               sx={{
                  flexGrow: 0
               }}
            >
               {/* TODO: After user login show this dropdown */}
               <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                     <Avatar alt={data?.user?.name ?? "N/A"} src={data?.user?.image ?? "https://placehold.co/40"} />
                  </IconButton>
               </Tooltip>
               <Menu
                  sx={{ mt: "45px" }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                     vertical: "top",
                     horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                     vertical: "top",
                     horizontal: "right"
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
               >
                  {_.map(userMenu, (setting, index) => {
                     return setting.link !== "/logout" ? (
                        <MenuItem
                           key={index}
                           onClick={handleCloseUserMenu}
                           component={NextLink}
                           href={setting?.link}
                           target={setting?.target}
                        >
                           <Typography variant='body1'>{setting?.title}</Typography>
                        </MenuItem>
                     ) : (
                        <MenuItem
                           key={index}
                           onClick={() => {
                              authSignOut();
                              handleCloseUserMenu();
                           }}
                        >
                           <Typography variant='body1'>{setting?.title}</Typography>
                        </MenuItem>
                     );
                  })}
               </Menu>
            </Box>
         </Toolbar>
      </AppBar>
   );
};

export default CustomAppBar;
