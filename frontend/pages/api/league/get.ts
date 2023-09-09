import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    league_key: string | string[],
    season: string | string[],
    status: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const season = req.query["season"] ?? "no season";
    const league_key = req.query["league_key"] ?? "no key";
    console.log("season", season, "league_key", league_key);
    console.log(req.query);
    // res.status(200).json(body);
    const ans = {
        season: season,
        league_key: league_key,
        status: "SUCCESS"
    }
    res.status(200).json(ans);
}
