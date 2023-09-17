import CustomLeague from "./customLeague"
import UploadImage from "./uploadImage"

const TattooLeague: React.FC<{ teamKey: string, customLeague: CustomLeague | undefined }>  = (props) => {
    let hasTeam = props.customLeague?.Teams.includes(props.teamKey);


    return (
        <>
        <div>
            <h1>{"Tattoo"}</h1>
            {hasTeam &&
                <p>{props.customLeague?.Teams.find((element) => element === props.teamKey)} team picture</p>
            }
            {!hasTeam &&
                <UploadImage></UploadImage>
            }
        </div>
        </>
    )
}

export default TattooLeague