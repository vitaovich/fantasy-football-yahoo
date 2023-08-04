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
    // const leaguesData = TransformYahooLeagueContent(FANTASY_CONTENT_LEAGUES);
    // const teamsData = TransformYahooTeamsContent(FANTASY_CONTENT_TEAMS_EXAMPLE);
    const [selectedLeague, setSelectedLeague] = useState<string | undefined>();
    
    function handleLeagueSelect(nextLeague: any) {
        setSelectedLeague(nextLeague.name);
    }

    const leagues = LEAGUE_DATA.map((leagueData: any) => {
        return (
            <li key={leagueData.league_id} className="border border-gray-400 my-2 p-2 rounded-md">
                <button onClick={() => handleLeagueSelect(leagueData)}>
                    {leagueData.name}
                </button>
            </li>
        );
    });

    const teams = TEAMS_DATA.map((teamData: any) => {
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


function TransformYahooLeagueContent(yahooFantasyLeagueContent: any) {
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

function TransformYahooTeamsContent(yahooFantasyLeagueContent: any) {
    // {
    //     team_key: "423.l.297239.t.1",
    //     team_id: 1,
    //     name: "PugetSoundPurpleKush",
    //     url: "https://football.fantasysports.yahoo.com/f1/297239/1",
    //     team_standing: {
    //         outcome_totals: {
    //             wins: 1,
    //             losses: 2,
    //             ties: 3
    //         }
    //     }
    // }
    const leagues = yahooFantasyLeagueContent.league[0].standings[0].teams[0].team.map((teamData: any) => {
        const transformedTeam = {
            team_key: teamData.team_key[0],
            team_id: teamData.team_id[0],
            name: teamData.name[0],
            url: teamData.url[0],
            team_standing: {
                outcome_totals: {
                    wins: teamData.team_standings[0].outcome_totals[0].wins[0],
                    losses: teamData.team_standings[0].outcome_totals[0].losses[0],
                    ties: teamData.team_standings[0].outcome_totals[0].ties[0],
                }
            }
        }
        return transformedTeam;
    })
    return leagues;
}

export default Index