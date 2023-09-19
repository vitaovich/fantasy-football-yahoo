import LeagueType from "./LeagueType";
import CustomLeague from "./customLeague";
import TattooLeague from "./tattooLeague";
import UploadImage from "./uploadImage";

const CustomLeagueContainer: React.FC<{ teamKey: string, customLeague: CustomLeague | undefined }> = (props) => {
    const league = (leagueType: LeagueType) => {
        switch (leagueType) {
            case LeagueType.Tattoo:
                return <TattooLeague teamKey={props.teamKey} customLeague={props.customLeague} ></TattooLeague>
            default:
                return <h1>No custom league</h1>
        }
    }

    return (
        <>
            {props.customLeague && (
                league(props.customLeague.leagueType)
            )}
        </>
    )
}

export default CustomLeagueContainer