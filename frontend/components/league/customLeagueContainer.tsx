import CustomLeague from "./customLeague";
import UploadImage from "./uploadImage";

const CustomLeagueContainer: React.FC<{ customLeague: CustomLeague | undefined }> = (props) => {
    const customLeagueTitle = props.customLeague?.LeagueTypeName + " League"


    return (
        <>
            <div>
                <h1>{customLeagueTitle}</h1>
                <UploadImage></UploadImage>
            </div>
        </>
    )
}

export default CustomLeagueContainer