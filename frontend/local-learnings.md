az webapp config appsettings set --resource-group fantasy-football-yahoo_rg --name fantasy-football-yahoo--settings NEXT_PUBLIC_MY_SECRET=helloWorld
az webapp config appsettings list --name "fantasy-football-yahoo" --resource-group "fantasy-football-yahoo_rg"
az staticwebapp list --resource-group "fantasy-football-yahoo_rg"
az staticwebapp appsettings list -n fantasy-football-yahoo
az staticwebapp appsettings set -n fantasy-football-yahoo --setting-names NEXT_PUBLIC_MY_SECRET=helloWorld

redirect uri: http://localhost:3000/api/auth/callback/yahoo


[next js auth](https://nextjs.org/docs/pages/building-your-application/routing/authenticating)
[auth js OATH authentication](https://authjs.dev/getting-started/oauth-tutorial)
[Yahoo authorization code flow](https://developer.yahoo.com/oauth2/guide/flows_authcode/#refresh-token-label)
[Yahoo developer apps](https://developer.yahoo.com/apps/)
[Yahoo Fantasy Sports API](https://developer.yahoo.com/fantasysports/guide/)
[Connect to multiple containers](https://code.visualstudio.com/remote/advancedcontainers/connect-multiple-containers)


Create Self signed certificate using openssl
```
sudo apt update
sudo apt install openssl

# Generate a private key
openssl genpkey -algorithm RSA -out localhost.key

# Generate a Certificate Signing Request (CSR)
openssl req -new -key localhost.key -out localhost.csr

# Generate a Self-Signed Certificate
openssl x509 -req -days 365 -in localhost.csr -signkey localhost.key -out localhost.crt

```
Run a proxy for https
```
npx local-ssl-proxy \
  --cert certificates/localhost.crt \
  --key certificates/localhost.key \
  --source 3001 \ # the port we want the proxy server to listen to
  --target 3000 # the port our Next.js app is listening on
```

local-ssl-proxy --source 3001 --target 3000 
npx local-ssl-proxy --source 3001 --target 3000 --cert certificates/localhost.crt --key certificates/localhost.key


Need to add a NEXTAUTH_SECRET as environment variable. it uses a hash for all configuration options, including OAuth Client ID / Secrets for entropy.
can use 
```
openssl rand -base64 32
```

When creating application in yahoo developer choose Confidential Client.

gh secret set NEXTAUTH_SECRET --body {my secret}
add environment variables to azure static web app as well

# Yahoo API
- Resources: Resources typically describe chunks of data that can be identified by a unique key.
- Collections: Collections are simply wrappers that contain similar resources

## Approach
pull signed in user's leagues
select league
pull in league info
