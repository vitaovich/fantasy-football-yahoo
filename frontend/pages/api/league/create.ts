// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    console.log("Calling Azure Functions");
    // const body = JSON.parse(req.body);
    // res.status(200).json(body);
    res.status(200).json(req.body);
}
