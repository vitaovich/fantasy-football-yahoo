import { useEffect, useState } from "react";
import Container from "./container";
import CustomLeagueTags from "./customLeagueTags";
import TeamTable from "./teamTable";
import CustomLeague from "./customLeague";
import LeagueType from "./LeagueType";
import TeamInfo from "./teamInfo";
import TeamOutcome from "./teamOutcome";

const League: React.FC<{ leagueKey: string | undefined, leagueName: string | undefined }> = (props) => {
    const [selectedLeagueTeams, setSelectedLeagueTeams] = useState<TeamInfo[]>([]);
    const [customLeague, setCustomLeague] = useState<CustomLeague | undefined>();

    useEffect(() => {
        if (props.leagueKey) {
            fetchYahooLeague(props.leagueKey);
            return;
        }
        console.log("No league to fetch", props.leagueKey)
    }, [props.leagueKey]);

    const fetchYahooLeague = async (leagueKey: string) => {
        const res = await fetch('/api/yahoofantasysports', {
            method: "POST",
            body: JSON.stringify({ call: `league/${leagueKey}/standings` })
        })
        const fantasySportsResult = await res.json();
        const nextLeague = TransformYahooTeamsContent(fantasySportsResult.result.fantasy_content);
        console.log(JSON.stringify(nextLeague, null, 2));
        setSelectedLeagueTeams(nextLeague);
        setCustomLeague(new CustomLeague(LeagueType.Regular))
    }


    const createCustomLeague = async (nextLeague: CustomLeague) => {
        const newCustomLeague = new CustomLeague(LeagueType.Tattoo);
        console.log("Make api call to update league settings.")
        setCustomLeague(newCustomLeague);
    }

    return (
        <>
            {props.leagueName && (
                <Container title={props.leagueName} headerTags={<CustomLeagueTags customLeague={customLeague} onUpdateLeague={createCustomLeague} />}>
                    <TeamTable teams={selectedLeagueTeams} />
                </Container>
            )}
            {!props.leagueName && (
                <Container>
                    <h1 className="text-red-400">Please Select a league</h1>
                </Container>
            )}
        </>
    );
}

function TransformYahooTeamsContent(yahooFantasyLeagueContent: any) {
    const leagues = yahooFantasyLeagueContent.league[0].standings[0].teams[0].team.map((teamData: any) => {
        const team = {
            team_key: teamData.team_key[0],
            team_id: teamData.team_id[0],
            name: teamData.name[0],
            url: teamData.url[0],
            team_logo_url: teamData.team_logos[0].team_logo[0].url[0],
            manager: teamData.managers[0].manager[0].nickname[0],
            standing: {
                wins: teamData.team_standings[0].outcome_totals[0].wins[0],
                losses: teamData.team_standings[0].outcome_totals[0].losses[0],
                ties: teamData.team_standings[0].outcome_totals[0].ties[0],
                pointsFor: teamData.team_standings[0].points_for[0],
                pointsAgainst: teamData.team_standings[0].points_against[0],
            }
        }
        const teamOutcome = new TeamOutcome(team.standing.wins, team.standing.losses, team.standing.ties, team.standing.pointsFor, team.standing.pointsAgainst)
        const transformedTeam = new TeamInfo(team.team_id, team.team_key, team.name, team.url, teamOutcome, team.manager, team.team_logo_url);
        return transformedTeam;
    })
    return leagues;
}

export default League;