import { useState } from "react";
import CustomLeague from "./customLeague"
import UploadImage from "./uploadImage"

const TattooLeague: React.FC<{ teamKey: string, customLeague: CustomLeague | undefined }>  = (props) => {
    const [fileURL, setFileURL] = useState<string | undefined>();
    
    let hasTeam = false;

    if(props.customLeague?.Teams.includes(props.teamKey) || fileURL)
    {
        hasTeam = true;
    }

    const handleFileUpload = (file: File) => {
        console.log("Upload file.", file.name)
        setFileURL(file.name)
    }

    return (
        <>
        <div>
            <h1>{"Tattoo"}</h1>
            {hasTeam &&
                <p>{props.customLeague?.Teams.find((element) => element === props.teamKey)} team picture: {fileURL}</p>
            }
            {!hasTeam &&
                <UploadImage onFileUpload={handleFileUpload} ></UploadImage>
            }
        </div>
        </>
    )
}

export default TattooLeague