// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from "next-auth/jwt"

type Data = {
    name: string
}

const azureAPIUrl = 'http://fantasy-football-backend:7071/api/GenerateSasUrlFunction';

async function makeApiCall(req: NextApiRequest, uri: string) {
    let apiCallResult = {
        name: 'myCall',
        uri: uri,
        success: false,
        message: '',
        result: {}
    };
    try {
        let body = JSON.parse(req.body);
        body.permission = "w";
        body.timerange = "10";
        body.containerName = "upload"
        console.log(body);

        const request = await fetch(uri, {
            method: "POST",
            body: JSON.stringify(body)
        });
        const reqText = await request.text();
        apiCallResult.success = true;
        apiCallResult.result = reqText;
    }
    catch (e: any) {
        console.error(e);
        apiCallResult.message = e.message;
    }
    return apiCallResult;

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    console.log("Calling Azure Functions");
    // const body = JSON.parse(req.body);
    // res.status(200).json(body);
    const uri = azureAPIUrl;
    const apiCallResult = makeApiCall(req, uri);
    res.status(200).json(await apiCallResult)
}
