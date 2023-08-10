import React from "react";
import TeamInfo from "./teamInfo";
import TeamStanding from "./teamStanding";

const TeamTable: React.FC<{teams: TeamInfo[]}> = (props) => {
    const teamRows = props.teams.map((team) => {
        return (
            <tr key={team.id} className="group hover:bg-blue-300">
                <td>
                    <TeamStanding team={team} />
                </td>
                <td>{team.outcome.pointsFor}</td>
                <td>{team.outcome.pointsAgainst}</td>
            </tr>
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