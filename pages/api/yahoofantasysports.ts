// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from "next-auth/jwt"
const xml2js = require('xml2js');

type Data = {
    name: string
}

const fantasysportsApiURL = 'https://fantasysports.yahooapis.com/fantasy/v2/';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const body = JSON.parse(req.body);
    const token = await getToken({ req });
    if (token) {
        const apiCall = fantasysportsApiURL + body.call;
        const apiCallResult = { name: 'myCall', uri: apiCall, reqBody: body };
        res.status(200).json(apiCallResult)
    } else {
        // Not Signed in
        console.log("Not signed in");
        res.status(401)
    }
}
