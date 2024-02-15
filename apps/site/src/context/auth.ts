// import Gitlab from "next-auth/providers/gitlab"
// import Google from "next-auth/providers/google"
// import Hubspot from "next-auth/providers/hubspot"
// import Instagram from "next-auth/providers/instagram"
// import Kakao from "next-auth/providers/kakao"
// import Keycloak from "next-auth/providers/keycloak"
// import Line from "next-auth/providers/line"
// import LinkedIn from "next-auth/providers/linkedin"
// import Mailchimp from "next-auth/providers/mailchimp"
// import Mailru from "next-auth/providers/mailru"
// import Medium from "next-auth/providers/medium"
// import Naver from "next-auth/providers/naver"
// import Netlify from "next-auth/providers/netlify"
// import Okta from "next-auth/providers/okta"
// import Onelogin from "next-auth/providers/onelogin"
// import Osso from "next-auth/providers/osso"
// import Osu from "next-auth/providers/osu"
// import Passage from "next-auth/providers/passage"
// import Patreon from "next-auth/providers/patreon"
// import Pinterest from "next-auth/providers/pinterest"
// import Pipedrive from "next-auth/providers/pipedrive"
// import Reddit from "next-auth/providers/reddit"
// import Salesforce from "next-auth/providers/salesforce"
// import Slack from "next-auth/providers/slack"
// import Spotify from "next-auth/providers/spotify"
// import Strava from "next-auth/providers/strava"
// import Todoist from "next-auth/providers/todoist"
// import Trakt from "next-auth/providers/trakt"
// import Twitch from "next-auth/providers/twitch"
// import Twitter from "next-auth/providers/twitter"
// import UnitedEffects from "next-auth/providers/united-effects"
// import Vk from "next-auth/providers/vk"
// import Wikimedia from "next-auth/providers/wikimedia"
// import Wordpress from "next-auth/providers/wordpress"
// import WorkOS from "next-auth/providers/workos"
// import Yandex from "next-auth/providers/yandex"
// import Zitadel from "next-auth/providers/zitadel"
// import Zoho from "next-auth/providers/zoho"
// import Zoom from "next-auth/providers/zoom"
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

// import Apple from "next-auth/providers/apple"
// import Atlassian from "next-auth/providers/atlassian"
// import Auth0 from "next-auth/providers/auth0"
// import Authentik from "next-auth/providers/authentik"
// import AzureAD from "next-auth/providers/azure-ad"
// import AzureB2C from "next-auth/providers/azure-ad-b2c"
// import Battlenet from "next-auth/providers/battlenet"
// import Box from "next-auth/providers/box"
// import BoxyHQSAML from "next-auth/providers/boxyhq-saml"
// import Bungie from "next-auth/providers/bungie"
// import Cognito from "next-auth/providers/cognito"
// import Coinbase from "next-auth/providers/coinbase"
// import Discord from "next-auth/providers/discord"
// import Dropbox from "next-auth/providers/dropbox"
// import DuendeIDS6 from "next-auth/providers/duende-identity-server6"
// import Eveonline from "next-auth/providers/eveonline"
// import Facebook from "next-auth/providers/facebook"
// import Faceit from "next-auth/providers/faceit"
// import FortyTwoSchool from "next-auth/providers/42-school"
// import Foursquare from "next-auth/providers/foursquare"
// import Freshbooks from "next-auth/providers/freshbooks"
// import Fusionauth from "next-auth/providers/fusionauth"
// import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";

export const config = {
   secret: process.env.NEXTAUTH_SECRET,
   // session: {
   //    jwt: true
   // },
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" }
         },
         async authorize(credentials: any, req) {
            // local authentication logic
            /** This is just an example, the credentials are NOT verified
             *	You must do your own validation here
             */
            console.log("credentials", credentials);
            // *** Admin credentials are admin@gmail and admin
            if (credentials.email === "admin@gmail.com" && credentials.password === "admin") {
               return {
                  id: "1",
                  email: credentials.email,
                  name: "John Doe",
                  role: "admin",
                  image: "https://i.pravatar.cc/150?img=64"
               };

               // *** Client credentials are client@gmail and client
            } else if (credentials.email === "client@gmail.com" && credentials.password === "client") {
               return {
                  id: "2",
                  email: credentials.email,
                  name: "Jane Doe",
                  role: "client",
                  image: "https://i.pravatar.cc/150?img=64"
               };
            }

            // *** If no valid credentials are returned, return null
            return null;
         }
      })
   ],

   // *** callbacks for session and jwt
   callbacks: {
      authorized({ auth, request: { nextUrl } }) {
         // Check if the user is authenticated
         const isLoggedIn = !!auth?.user;
         // Initialize protected routes
         // Here, all routes except the login page is protected
         const isOnProtected = !nextUrl.pathname.startsWith("/login");

         if (isOnProtected) {
            if (isLoggedIn) return true;
            return false; // redirect to /login
         } else if (isLoggedIn) {
            // redirected to homepage
            return Response.redirect(new URL("/dashboard", nextUrl));
         }
         return true;
      },
      // *** add user role to jwt token
      jwt({ token, user }: any) {
         if (user) token.role = user.role;
         return token;
      },
      session({ session, token }: any) {
         session.user.role = token.role;
         return session;
      }
   },

   // *** Default sign-in page
   pages: {
      signIn: "/login",
      error: "/signin"
   }
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
