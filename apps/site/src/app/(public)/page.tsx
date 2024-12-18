import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import type { Metadata } from "next";
import NextLink from "next/link";
import { Fragment } from "react";

export const metadata: Metadata = {
   title: "MUI Next.js Boilerplate",
   description: "Material UI - Next.js Boilerplate in TypeScript"
};

export default function Home() {
   return (
      <Fragment>
         <Typography variant='h4' component='h1' sx={{ my: 4 }}>
            Material UI - Next.js Boilerplate in TypeScript
         </Typography>
         <Box sx={{ maxWidth: "sm" }}>
            <Button variant='contained' color='secondary' component={NextLink} href='/about'>
               Go to the about page
            </Button>
         </Box>
      </Fragment>
   );
}
