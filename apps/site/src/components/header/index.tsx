"use client";

import { mainMenu, userMenu } from "@faceData/menus";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import { LoadingButton } from "@mui/lab";
import { Avatar, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import * as React from "react";

const Header = () => {
   const { data, status } = useSession();
   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   return (
      <AppBar position='static'>
         <Container maxWidth='xl'>
            <Toolbar disableGutters>
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

               <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                     size='large'
                     aria-label='account of current user'
                     aria-controls='menu-appbar'
                     aria-haspopup='true'
                     onClick={handleOpenNavMenu}
                     color='inherit'
                  >
                     <MenuIcon />
                  </IconButton>
                  <Menu
                     id='menu-appbar'
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "left"
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={{
                        display: { xs: "block", md: "none" }
                     }}
                  >
                     {_.map(mainMenu, (menu, index) => (
                        <MenuItem key={index} onClick={handleCloseNavMenu}>
                           <Button
                              color='inherit'
                              component={NextLink}
                              href={menu?.link}
                              target={menu?.target}
                              disabled={menu?.disabled}
                           >
                              {menu?.title ?? "No title"}
                           </Button>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
               <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
               <Typography
                  variant='h5'
                  noWrap
                  component={NextLink}
                  href='/'
                  sx={{
                     mr: 2,
                     display: { xs: "flex", md: "none" },
                     flexGrow: 1,
                     fontFamily: "monospace",
                     fontWeight: 700,
                     letterSpacing: ".3rem",
                     color: "inherit",
                     textDecoration: "none"
                  }}
               >
                  LOGO
               </Typography>
               <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {_.map(mainMenu, (page, index) => (
                     <Button
                        key={index}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                        component={NextLink}
                        href={page?.link}
                        target={page?.target}
                     >
                        {page?.title ?? "No title"}
                     </Button>
                  ))}
               </Box>

               <Box sx={{ flexGrow: 0 }}>
                  {status === "loading" && <LoadingButton loading variant='text'></LoadingButton>}
                  {status === "unauthenticated" && (
                     <Button color='inherit' component={NextLink} href='/login'>
                        Login
                     </Button>
                  )}
                  {status === "authenticated" && data.user && (
                     <React.Fragment>
                        <Tooltip title='Open settings'>
                           <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                              <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
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
                           {_.map(userMenu, (setting, index) => (
                              <MenuItem
                                 key={index}
                                 onClick={handleCloseUserMenu}
                                 component={NextLink}
                                 href={setting?.link}
                                 target={setting?.target}
                              >
                                 <Typography variant='body1'>{setting?.title}</Typography>
                              </MenuItem>
                           ))}
                        </Menu>
                     </React.Fragment>
                  )}
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
};
export default Header;
