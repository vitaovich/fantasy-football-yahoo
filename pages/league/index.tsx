import { useState } from "react";


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

const Index = () => {
    const [selectedLeague, setSelectedLeague] = useState<string | undefined>();

    function handleLeagueSelect(nextLeague:any) {
        setSelectedLeague(nextLeague.name);
    }

    const leagues = LEAGUE_DATA.map((leagueInfo, idx) => {
        return (
            <li key={leagueInfo.league_id} className="border border-gray-400 my-2 p-2 rounded-md">
                <button onClick={() => handleLeagueSelect(leagueInfo)}>
                    {leagueInfo.name}
                </button>
            </li>
        );
    });

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
                    <h2>{selectedLeague}</h2>
                )}
                {!selectedLeague && (
                    <h1 className="text-red-400">Please Select a league</h1>
                )}
            </div>

        </div>
    );
}

export default Index