import React, { useState } from "react";
import TeamInfo from "./teamInfo";
import TeamStanding from "./teamStanding";
import CustomLeague from "./customLeague";
import LeagueType from "./LeagueType";
import Team from "./team";

const TeamTable: React.FC<{ teams: TeamInfo[], customLeague: CustomLeague | undefined }> = (props) => {
    const [selectedTeam, setSelectedTeam] = useState<TeamInfo | undefined>();

    const handleTeamSelect = (team: TeamInfo) =>
    {
        console.log("Team selected", team)
        setSelectedTeam(team)
    }

    const teamRows = props.teams.map((team) => {
        return (
            <>
                <tr onClick={() => handleTeamSelect(team)} key={team.id} className="group hover:bg-blue-300">
                    <td>
                        <TeamStanding team={team} />
                    </td>
                    <td>{team.outcome.pointsFor}</td>
                    <td>{team.outcome.pointsAgainst}</td>
                </tr>
                {selectedTeam === team &&
                    <tr>
                        <td className="bg-gray-300 border border-gray-500" colSpan={3}>
                            <Team team={selectedTeam} customLeague={props.customLeague} />
                        </td>
                    </tr>
                }

            </>

        );
    });

    return (
        <table className="w-full table-auto text-left">
            <thead>
                <tr>
                    <th></th>
                    <th>PF</th>
                    <th>PA</th>
                </tr>
            </thead>
            <tbody>
                {teamRows}
            </tbody>
        </table>
    );
}

export default TeamTable;