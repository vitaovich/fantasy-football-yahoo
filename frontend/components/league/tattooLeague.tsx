import { useState } from "react";
import CustomLeague from "./customLeague"
import UploadImage from "./uploadImage"

const TattooLeague: React.FC<{ teamKey: string, customLeague: CustomLeague | undefined }> = (props) => {
    const [fileURL, setFileURL] = useState<string | undefined>();
    const [editTattooPic, setEditTattooPic] = useState<boolean>(false);

    let hasTeam = false;

    if (props.customLeague?.Teams.includes(props.teamKey) || fileURL) {
        hasTeam = true;
    }

    const handleFileUpload = (file: File) => {
        console.log("Make api call to update team tattoo picture.", file.name)
        setFileURL(file.name)
    }

    const handleEditTattooPic = () => {
        setEditTattooPic(!editTattooPic)
    }

    return (
        <>
            <div>
                <h1>{"Tattoo"}</h1>
                {hasTeam &&
                    <>
                        {!editTattooPic &&
                            <button onClick={handleEditTattooPic} className="bg-blue-400 px-2 rounded-full text-white">edit</button>
                        }
                        <p>{props.customLeague?.Teams.find((element) => element === props.teamKey)} team picture: {fileURL}</p>

                        {editTattooPic &&
                            <UploadImage onCancelUpload={handleEditTattooPic} onFileUpload={handleFileUpload} ></UploadImage>
                        }
                    </>
                }
                {!hasTeam &&
                    <>
                        {!editTattooPic &&
                            <button onClick={handleEditTattooPic} className="bg-blue-400 px-2 rounded-full text-white">Upload</button>
                        }
                        {editTattooPic &&
                            <UploadImage onCancelUpload={handleEditTattooPic} onFileUpload={handleFileUpload} ></UploadImage>
                        }
                    </>
                }
            </div>
        </>
    )
}

export default TattooLeague