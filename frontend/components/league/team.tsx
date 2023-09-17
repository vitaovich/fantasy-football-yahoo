import CustomLeague from "./customLeague";
import CustomLeagueContainer from "./customLeagueContainer";
import TeamInfo from "./teamInfo";

const Team: React.FC<{ team: TeamInfo, customLeague: CustomLeague | undefined }> = (props) => {

    
    return (
        <>
            <div className="flex flex-col">
                <div>
                    {props.team.key}
                    <CustomLeagueContainer customLeague={props.customLeague} />
                </div>
            </div>
        </>
    )
}

export default Team;