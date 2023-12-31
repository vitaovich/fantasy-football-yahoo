import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import Image from 'next/image'
import Container from "@/components/league/container";
import League from "@/components/league/league";

const LEAGUE_DATA = [
    {
        league_key: "423.l.297239",
        league_id: "297239",
        name: "Northwest Faithful League",
        url: "https://football.fantasysports.yahoo.com/f1/297239",
        logo_url: "https://yahoofantasysports-res.cloudinary.com/image/upload/t_s192sq/fantasy-logos/57330410874_b3b8ab.jpg",
        season: "2023"
    },
    {
        league_key: "423.l.50621",
        league_id: "50621",
        name: "Red White and Tattooed",
        url: "https://football.fantasysports.yahoo.com/f1/50621",
        logo_url: "",
        season: "2023"
    }
]

// const TEAMS_DATA: TeamInfo[] = [
//     {
//         "id": "1",
//         "key": "423.l.50621.t.1",
//         "name": "Nice Dak No Romo",
//         "url": "https://football.fantasysports.yahoo.com/f1/50621/1",
//         "logoUrl": "https://yahoofantasysports-res.cloudinary.com/image/upload/t_s192sq/fantasy-logos/99597e43c9b4c4fae82ab889ca6e353d72c1a5dbe6671366e12b58d0f926aae8.png",
//         "outcome": new TeamOutcome(1, 2, 3)
//     },
//     {
//         "id": "2",
//         "key": "423.l.50621.t.2",
//         "name": "Adam's Awesome Team",
//         "url": "https://football.fantasysports.yahoo.com/f1/50621/2",
//         "logoUrl": "https://s.yimg.com/cv/apiv2/default/nfl/nfl_4_a.png",
//         "outcome": new TeamOutcome(1, 2, 3)
//     },
//     {
//         "id": "3",
//         "key": "423.l.50621.t.3",
//         "name": "Chuckie Gruden's Pool of Tears",
//         "url": "https://football.fantasysports.yahoo.com/f1/50621/3",
//         "logoUrl": "https://s.yimg.com/cv/apiv2/default/nfl/nfl_4_t.png",
//         "outcome": new TeamOutcome(1, 2, 3)
//     },
//     {
//         "id": "4",
//         "key": "423.l.50621.t.4",
//         "name": "Michael's Majestic Team",
//         "url": "https://football.fantasysports.yahoo.com/f1/50621/4",
//         "logoUrl": "https://s.yimg.com/cv/apiv2/default/nfl/nfl_8_m.png",
//         "outcome": new TeamOutcome(1, 2, 3)
//     },
//     {
//         "id": "5",
//         "key": "423.l.50621.t.5",
//         "name": "No Tats-land",
//         "url": "https://football.fantasysports.yahoo.com/f1/50621/5",
//         "logoUrl": "https://yahoofantasysports-res.cloudinary.com/image/upload/t_s192sq/fantasy-logos/26033559949_6570f7.jpg",
//         "outcome": new TeamOutcome(1, 2, 3)
//     },
//     {
//         "id": "6",
//         "key": "423.l.50621.t.6",
//         "name": "Ross Overcooked",
//         "url": "https://football.fantasysports.yahoo.com/f1/50621/6",
//         "logoUrl": "https://yahoofantasysports-res.cloudinary.com/image/upload/t_s192sq/fantasy-logos/691a6ad038fd77ae745f75225156cc825496b5894c4c0b70038447d38cbb7a0d.jpg",
//         "outcome": new TeamOutcome(1, 2, 3)
//     },
//     {
//         "id": "7",
//         "key": "423.l.50621.t.7",
//         "name": "SPDEEZ NUTZ",
//         "url": "https://football.fantasysports.yahoo.com/f1/50621/7",
//         "logoUrl": "https://yahoofantasysports-res.cloudinary.com/image/upload/t_s192sq/fantasy-logos/6ddc55d12aa8cc848e0935193f72a7958219cd56893cdefe34041389a2884b3f.jpg",
//         "outcome": new TeamOutcome(1, 2, 3)
//     },
//     {
//         "id": "8",
//         "key": "423.l.50621.t.8",
//         "name": "Stafford Infection",
//         "url": "https://football.fantasysports.yahoo.com/f1/50621/8",
//         "logoUrl": "https://yahoofantasysports-res.cloudinary.com/image/upload/t_s192sq/fantasy-logos/1589fd6e2e5ce521082df3c6ea345f1d5b9730ad193dccf56210f046161bdd65.jpg",
//         "outcome": new TeamOutcome(1, 2, 3)
//     },
//     {
//         "id": "9",
//         "key": "423.l.50621.t.9",
//         "name": "Unicorn power",
//         "url": "https://football.fantasysports.yahoo.com/f1/50621/9",
//         "logoUrl": "https://yahoofantasysports-res.cloudinary.com/image/upload/t_s192sq/fantasy-logos/1ca152afee1f812e3fb6b6c33975f37480c09ae942fe0d2e24f1682728dfbc0d.jpg",
//         "outcome": new TeamOutcome(1, 2, 3)
//     },
//     {
//         "id": "10",
//         "key": "423.l.50621.t.10",
//         "name": "Well SHIIIIITTT!",
//         "url": "https://football.fantasysports.yahoo.com/f1/50621/10",
//         "logoUrl": "https://yahoofantasysports-res.cloudinary.com/image/upload/t_s192sq/fantasy-logos/22af1062e144bb6b2eaba07c4625d35e8e83b56cf9ae13f10b99c695b6cc1940.jpg",
//         "outcome": new TeamOutcome(1, 2, 3)
//     },
//     {
//         "id": "11",
//         "key": "423.l.50621.t.11",
//         "name": "Jason Eaton's Amazing Team",
//         "url": "https://football.fantasysports.yahoo.com/f1/50621/11",
//         "logoUrl": "https://s.yimg.com/cv/apiv2/default/nfl/nfl_9_j.png",
//         "outcome": new TeamOutcome(1, 2, 3)
//     }
// ]

const Index = () => {
    const { data: session, status } = useSession()
    const [yahooLeagues, setYahooLeagues] = useState<any[]>([]);
    const [selectedLeagueKey, setSelectedLeagueKey] = useState<string | undefined>();
    const [selectedLeague, setSelectedLeague] = useState<string | undefined>();

    useEffect(() => {
        fetchYahooLeagues();
    }, []);

    const fetchYahooLeagues = async () => {
        const res = await fetch('/api/yahoofantasysports', {
            method: "POST",
            body: JSON.stringify({ call: `users;use_login=1/games;game_keys=nfl/leagues` })
        })
        const fantasySportsResult = await res.json();
        const receivedLeagues = TransformYahooLeaguesContent(fantasySportsResult.result.fantasy_content);
        setYahooLeagues(receivedLeagues);
    }

    async function handleLeagueSelect(nextLeague: any) {
        setSelectedLeague(nextLeague.name);
        setSelectedLeagueKey(nextLeague.league_key);
    }

    const leagues = yahooLeagues.map((leagueData: any) => {
        return (
            <li key={leagueData.league_id} className="border border-gray-400 my-2 p-2 rounded-md">
                <div className="flex flex-row space-x-4">
                    {leagueData.logo_url && (
                        <Image
                            src={leagueData.logo_url}
                            alt="profile image"
                            width={50}
                            height={50}
                        />
                    )}
                    <button onClick={() => handleLeagueSelect(leagueData)}>
                        {leagueData.name}
                    </button>
                </div>

            </li>
        );
    });

    return (
        <div className="flex flex-col py-4">
            {!session && (
                <div className="flex flex-1 items-center justify-center">
                    No Leagues!! Probably should sign in.
                </div>
            )}
            {session && (
                <>
                    <h1 className="grow text-4xl text-center">Fantasy Football</h1>
                    <Container title="Leagues">
                        <ol>
                            {leagues}
                        </ol>
                    </Container>
                    <League
                        leagueKey={selectedLeagueKey}
                        leagueName={selectedLeague}
                    />
                </>
            )}
        </div>
    );
}

function TransformYahooLeaguesContent(yahooFantasyLeagueContent: any) {
    const leagues = yahooFantasyLeagueContent.users[0].user[0].games[0].game[0].leagues[0].league.map((leagueData: any) => {
        const transformedLeague = {
            league_key: leagueData.league_key[0],
            league_id: leagueData.league_id[0],
            name: leagueData.name[0],
            url: leagueData.url[0],
            logo_url: leagueData.logo_url[0],
            season: leagueData.season[0]
        }
        return transformedLeague;
    })
    return leagues;
}

export default Index