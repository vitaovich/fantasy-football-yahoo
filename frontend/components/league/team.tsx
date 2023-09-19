import CustomLeague from "./customLeague";
import CustomLeagueContainer from "./customLeagueContainer";
import TeamInfo from "./teamInfo";

const Team: React.FC<{ team: TeamInfo, customLeague: CustomLeague | undefined }> = (props) => {

    
    return (
        <>
            <div className="flex flex-col">
                <div>
                    {"Team key:" + props.team.key}
                    <CustomLeagueContainer teamKey={props.team.key} customLeague={props.customLeague} />
                </div>
            </div>
        </>
    )
}

export default Team;