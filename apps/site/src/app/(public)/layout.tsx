import Header from "@/components/header";
import { Box, Container } from "@mui/material";
import React from "react";

export default function PublicLayout(props: { children: React.ReactNode }) {
   return (
      <main>
         <Header />
         <Container maxWidth='lg'>
            <Box
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
               }}
            >
               {props.children}
            </Box>
         </Container>
      </main>
   );
}
