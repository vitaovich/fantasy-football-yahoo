az webapp config appsettings set --resource-group fantasy-football-yahoo_rg --name fantasy-football-yahoo--settings NEXT_PUBLIC_MY_SECRET=helloWorld
az webapp config appsettings list --name "fantasy-football-yahoo" --resource-group "fantasy-football-yahoo_rg"
az staticwebapp list --resource-group "fantasy-football-yahoo_rg"
az staticwebapp appsettings list -n fantasy-football-yahoo
az staticwebapp appsettings set -n fantasy-football-yahoo --setting-names NEXT_PUBLIC_MY_SECRET=helloWorld

http://localhost:3000/api/auth/callback/yahoo


[next js auth](https://nextjs.org/docs/pages/building-your-application/routing/authenticating)

[auth js OATH authentication](https://authjs.dev/getting-started/oauth-tutorial)

[Yahoo authorization code flow](https://developer.yahoo.com/oauth2/guide/flows_authcode/#refresh-token-label)
[Yahoo developer apps](https://developer.yahoo.com/apps/)
[Yahoo Fantasy Sports API](https://developer.yahoo.com/fantasysports/guide/)


Generate a localhost CERTIFICATE
```
  openssl req -x509 -out localhost.crt -keyout localhost.key \
  -days 365 \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

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


Need to add a NEXTAUTH_SECRET as environment variable. it uses a hash for all configuration options, including OAuth Client ID / Secrets for entropy.
can use 
```
openssl rand -base64 32
```

When creating application in yahoo developer choose Confidential Client.

          NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
          NEXTAUTH_URL: ${{ secrets.NEXTAUTH_URL }}
          YAHOO_CLIENT_ID: ${{ secrets.YAHOO_CLIENT_ID }}
          YAHOO_CLIENT_SECRET: ${{ secrets.YAHOO_CLIENT_SECRET }}
gh secret set NEXTAUTH_SECRET --body BrlxoJBLL+U79054gTuVNDoo0OwRgoXfDgowkm2EcXc=
gh secret set NEXTAUTH_URL --body https://ff.vitaol.com
gh secret set YAHOO_CLIENT_ID --body dj0yJmk9ZGE5UkpsVlpuaE91JmQ9WVdrOWRWaHZTVlJRUjBFbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWY1
gh secret set YAHOO_CLIENT_SECRET --body 0fbf4cae07f3a77af673aebf26b601509dd3ea5c
gh secret set YAHOO_REDIRECT_URI --body https://ff.vitaol.com/api/auth/callback/yahoo