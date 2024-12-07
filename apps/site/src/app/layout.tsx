import NextAuthSessionProvider from "@/context/SessionProvider";
import { NextThemeConfigProvider, NextThemesProvider } from "@/next-theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
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
                  <NextThemesProvider>
                     <NextThemeConfigProvider direction={"ltr"}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        {props.children}
                        <Toaster />
                     </NextThemeConfigProvider>
                  </NextThemesProvider>
               </AppRouterCacheProvider>
            </NextAuthSessionProvider>
         </body>
      </html>
   );
}
