import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

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
      // console.log("IN JWT Callback");
      if (account) {
        token.accessToken = account.access_token
        token.id = profile?.sub
      }
      // console.log("TOKEN:" + JSON.stringify(token));
      return token;
    }
  }
})