"use client";
import Header from "@/components/header";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import NextLink from "next/link";

export default function NotFound() {
   return (
      <main>
         <Header />
         <Container maxWidth='lg'>
            <Box
               sx={{
                  my: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "85vh"
               }}
            >
               <Paper
                  sx={{
                     maxWidth: "sm",
                     width: "100%",
                     p: 4,
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "center",
                     alignItems: "center"
                  }}
               >
                  <Typography
                     variant='h3'
                     component='h3'
                     sx={{
                        fontWeight: 700,
                        mb: 2
                     }}
                  >
                     Page Not Found
                  </Typography>
                  <Typography
                     variant='body1'
                     component={"p"}
                     sx={{
                        textAlign: "center",
                        opacity: 0.7
                     }}
                  >
                     Sorry, we couldn&apos;t find the page you were looking for. Go back to the previous page or return
                     home.
                  </Typography>
                  <Box
                     sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 2,
                        gap: 2
                     }}
                  >
                     <Button variant='outlined' color='primary' component={NextLink} href='/'>
                        Return Home
                     </Button>
                     <Button variant='outlined' color='secondary' onClick={() => window.history.back()}>
                        Go Back
                     </Button>
                  </Box>
               </Paper>
            </Box>
         </Container>
      </main>
   );
}
