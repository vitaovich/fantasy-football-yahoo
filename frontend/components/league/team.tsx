import CustomLeague from "./customLeague";
import TeamInfo from "./teamInfo";

const Team: React.FC<{ team: TeamInfo, customLeague: CustomLeague | undefined }> = (props) => {
    return (
        <>
            <div className="flex flex-col">
                <div>
                    {props.team.key}
                </div>
            </div>
        </>
    )
}

export default Team;