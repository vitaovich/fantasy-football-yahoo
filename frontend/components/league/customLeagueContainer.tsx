import CustomLeague from "./customLeague";

const CustomLeagueContainer: React.FC<{ customLeague: CustomLeague | undefined }>  = (props) => {
    return (
        <>
        <div>
            {props.customLeague?.LeagueTypeName}
        </div>
        </>
    )
}

export default CustomLeagueContainer