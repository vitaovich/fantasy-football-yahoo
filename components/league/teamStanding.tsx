import TeamInfo from "./teamInfo";
import Image from 'next/image'
import TeamOutcome from "./teamOutcome";


const MOCK_TEAM: TeamInfo = {
    "id": "6",
    "key": "423.l.50621.t.6",
    "name": "Ross Overcooked",
    "url": "https://football.fantasysports.yahoo.com/f1/50621/6",
    "logoUrl": "https://yahoofantasysports-res.cloudinary.com/image/upload/t_s192sq/fantasy-logos/691a6ad038fd77ae745f75225156cc825496b5894c4c0b70038447d38cbb7a0d.jpg",
    "outcome": new TeamOutcome(1, 2, 3)
}

const TeamStanding: React.FC = () => {
    const team = MOCK_TEAM;
    return (
        <>
            <div className="flex flex-row">
                <Image
                    src={team.logoUrl!}
                    alt="profile image"
                    width={50}
                    height={50}
                />
                <div className="flex flex-col mx-2">
                    <h1>{team.name}</h1>
                    <p>{team.outcome.getWinloss()}</p>
                </div>
            </div>

        </>
    );
}

export default TeamStanding;