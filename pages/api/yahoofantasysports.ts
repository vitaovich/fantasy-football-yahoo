// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from "next-auth/jwt"
const xml2js = require('xml2js');

type Data = {
    name: string
}

const fantasysportsApiURL = 'https://fantasysports.yahooapis.com/fantasy/v2/';

async function makeApiCall(req: NextApiRequest, uri: string) {
    let apiCallResult = {
        name: 'myCall',
        uri: uri,
        success: false,
        message: '',
        result: {}
    };
    const token = await getToken({req});
    if(token) {
        try {
            const request = await fetch(uri, {
                method: "GET",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token.access_token}`,  // <-- add token to request
                    "Content-Type": "application/xml",
                }
            })
            const reqText = await request.text();
            xml2js.parseString(reqText, (err, result) => {
                if(err) {
                    apiCallResult.message = 'Error parsing XML:', err;
                } else {
                    // console.log(JSON.stringify(result));
                    apiCallResult.success = true;
                    apiCallResult.result = result;
                    // const teamInfo = {
                    //     name: result.fantasy_content.users[0].user[0].games[0].game[0].teams[0].team[0].name[0]
                    // }

                    // res.status(200).json(teamInfo)

                }
            });
        }
        catch(e: any)
        {
            apiCallResult.message = e.message;
        }
    } else {
        apiCallResult.message = "No token found";
    }

    return apiCallResult;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    console.log("Calling yahoofantasysports");
    const body = JSON.parse(req.body);
    const token = await getToken({ req });
    if (token) {
        const uri = fantasysportsApiURL + body.call;
        const apiCallResult = makeApiCall(req, uri);
        res.status(200).json(await apiCallResult)
    } else {
        // Not Signed in
        console.log("Not signed in");
        res.status(401)
    }
}
