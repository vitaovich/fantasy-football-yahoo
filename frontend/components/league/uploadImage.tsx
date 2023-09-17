import React, { DragEventHandler, useState } from "react"
import Image from 'next/image'

const UploadImage: React.FC<{}> = (props) => {
    const [file, setFile] = useState<File>();
    const [fileURL, setFileURL] = useState<string>("");
    const [inDropZone, setInDropZone] = useState<boolean>(false);

    const dragZoneClasses = inDropZone ? "bg-blue-200" : "bg-blue-300"

    const handleOverrideEventDefaults = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        ev.stopPropagation();
    }

    const handleDragEnter = (ev: React.DragEvent<HTMLDivElement>) => {
        handleOverrideEventDefaults(ev);
        setInDropZone(true);
    }

    const handleDragLeave = (ev: React.DragEvent<HTMLDivElement>) => {
        handleOverrideEventDefaults(ev);
        setInDropZone(false);
    }

    const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
        handleOverrideEventDefaults(ev);
        setInDropZone(false);
        if (ev.dataTransfer.files && ev.dataTransfer.files[0]) {
            const file = ev.dataTransfer.files[0];
            setFile(file)
            setFileURL(URL.createObjectURL(file))
        }
    }

    const handleFileUpload = () => {
        if (!file) {
            console.log("Please specify a file to upload.")
            return
        }
        console.log("Upload file.", file.name)
    }

    return (
        <>
            <div className="flex flex-col items-center m-2 space-y-2">
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragEnter}
                    onDrag={handleDragEnter}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    className={`flex flex-col items-center text-white rounded-md ${dragZoneClasses} border-2 border-dashed border-blue-400 py-12 px-2 space-y-4 lg:w-1/2`}
                >
                    <h1>Drag and drop image to upload</h1>
                    {file && (
                        <>
                            <p>File name: {file.name}</p>
                            <Image
                                src={fileURL}
                                alt="file upload"
                                height={200}
                                width={200}
                            />
                        </>
                    )}
                    {!file && (
                        <p>No file uploaded yet.</p>

                    )}
                </div>
                <button onClick={handleFileUpload} className="bg-green-400 px-2 rounded-full text-white">Upload</button>
            </div>

        </>
    )
}

export default UploadImage