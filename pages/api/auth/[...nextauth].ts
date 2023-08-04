import NextAuth, { TokenSet } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { tokenToString } from "typescript"

export default NextAuth({
  // debug: true,
  providers: [
    {
      id: "yahoo",
      name: "Yahoo",
      type: "oauth",
      wellKnown: "https://api.login.yahoo.com/.well-known/openid-configuration",
      clientId: process.env.YAHOO_CLIENT_ID,
      clientSecret: process.env.YAHOO_CLIENT_SECRET,
      client: {
        authorization_signed_response_alg: 'ES256',
        id_token_signed_response_alg: 'ES256'
      },
      authorization: {
        params: {
          client_id: process.env.YAHOO_CLIENT_ID,
          redirect_uri: process.env.YAHOO_REDIRECT_URI,
          response_type: 'code',
        }
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    }
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile }) {
      if (account) {
        // Save the access token and refresh token in the JWT on the initial login
        const initialToken = {
          ...token,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: account.expires_at,
          id: profile?.sub
        }
        // console.log("Initial token", initialToken);
        return initialToken;
      } 
      else if (Date.now() < (token.expires_at as number) * 1000) {
        // If the access token has not expired yet, return it
        // console.log("Current Token:", token);
        return token;
      } 
      else {
        // If the access token has expired, try to refresh it
        try {
          // We need the `token_endpoint`.
          const response = await fetch("https://api.login.yahoo.com/oauth2/get_token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.YAHOO_CLIENT_ID!,
              client_secret: process.env.YAHOO_CLIENT_SECRET!,
              redirect_uri: process.env.YAHOO_REDIRECT_URI!,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token as string,
            }),
            method: "POST",
          })

          const tokens: TokenSet = await response.json()

          if (!response.ok) throw tokens

          const newToken = {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          }
          // console.log("Refreshed Token:", newToken);
          return newToken;
        } catch (error) {
          console.error("Error refreshing access token", error)
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" as const }
        }
      }
    }
  }
})