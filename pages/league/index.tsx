import { useState } from "react";
import Link from 'next/link'

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

const TEAMS_DATA = [
    {
        team_key: "423.l.297239.t.1",
        team_id: 1,
        name: "PugetSoundPurpleKush",
        url: "https://football.fantasysports.yahoo.com/f1/297239/1",
        team_standing: {
            outcome_totals: {
                wins: 1,
                losses: 2,
                ties: 3
            }
        }
    },
    {
        team_key: "423.l.297239.t.1",
        team_id: 1,
        name: "TEST TEAM",
        division_id: 1,
        url: "https://football.fantasysports.yahoo.com/f1/297239/1",
        team_logos: {
            team_logo: {
                size: "large",
                url: "https://yahoofantasysports-res.cloudinary.com/image/upload/t_s192sq/fantasy-logos/25342263995_7d9b688c57.jpg"
            }
        },
        team_standing: {
            outcome_totals: {
                wins: 1,
                losses: 2,
                ties: 3
            }
        }
    }
]

const Index = () => {
    const [selectedLeague, setSelectedLeague] = useState<string | undefined>();

    function handleLeagueSelect(nextLeague: any) {
        setSelectedLeague(nextLeague.name);
    }

    const leagues = LEAGUE_DATA.map((leagueData, idx) => {
        return (
            <li key={leagueData.league_id} className="border border-gray-400 my-2 p-2 rounded-md">
                <button onClick={() => handleLeagueSelect(leagueData)}>
                    {leagueData.name}
                </button>
            </li>
        );
    });

    const teams = TEAMS_DATA.map((teamData, idx) => {
        const totals = teamData.team_standing.outcome_totals;
        const teamWLT = `${totals.wins}-${totals.losses}-${totals.ties}`
        return (
            <li key={teamData.team_id} className="">
                <div className="flex flex-row justify-between items-center">
                    <Link className='py-4 px-2 hover:text-blue-500 mr-6' href={teamData.url}>{teamData.name}</Link>
                    <div>{teamWLT}</div>
                </div>
            </li>
        );
    })

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-24 py-4">
            <h1 className="text-4xl">Leagues</h1>
            <div className="border border-2 border-gray-300 p-4 rounded-md text-center">
                <ol>
                    {leagues}
                </ol>
            </div>
            <div className="border border-2 border-gray-300 p-4 rounded-md text-center">
                {selectedLeague && (
                    <>
                        <h2 className="border-b border-gray-300 p-4">{selectedLeague}</h2>
                        <ol>
                            {teams}
                        </ol>
                    </>

                )}
                {!selectedLeague && (
                    <h1 className="text-red-400">Please Select a league</h1>
                )}
            </div>

        </div>
    );
}

export default Index