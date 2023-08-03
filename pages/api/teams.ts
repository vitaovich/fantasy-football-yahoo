// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from "next-auth/jwt"
const xml2js = require('xml2js');

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const token = await getToken({ req });
    if (token) {
        // Signed in
        console.log("Token", JSON.stringify(token, null, 2))
        const url = 'https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=nfl/teams';
        try {
            const request = await fetch(url, {
                method: "GET",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,  // <-- add token to request
                    "Content-Type": "application/xml",
                }
            })
            const reqText = await request.text();
            xml2js.parseString(reqText, (err, result) => {
                if(err) {
                    console.error('Error parsing XML:', err);
                } else {
                    console.log(JSON.stringify(result));
                    const teamInfo = {
                        name: result.fantasy_content.users[0].user[0].games[0].game[0].teams[0].team[0].name[0]
                    }

                    res.status(200).json(teamInfo)

                }
            });
        }
        catch(e: any)
        {
            console.log(e.message);
        }
    } else {
        // Not Signed in
        console.log("Not signed in");
        res.status(401)
    }
}
