import NextAuthSessionProvider from "@/context/SessionProvider";
import theme from "@/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { auth } from "auth";
import * as React from "react";
import { Toaster } from "react-hot-toast";

export default async function RootLayout(props: { children: React.ReactNode }) {
   const session = await auth();

   return (
      <html lang='en'>
         <body>
            <NextAuthSessionProvider session={session}>
               <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                  <ThemeProvider theme={theme}>
                     {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                     <CssBaseline />
                     {props.children}
                     <Toaster />
                  </ThemeProvider>
               </AppRouterCacheProvider>
            </NextAuthSessionProvider>
         </body>
      </html>
   );
}
