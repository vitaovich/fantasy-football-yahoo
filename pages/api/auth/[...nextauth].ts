import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  // debug: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
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
})