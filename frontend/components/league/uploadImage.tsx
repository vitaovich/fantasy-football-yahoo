import React, { DragEventHandler, useState } from "react"
import Image from 'next/image'

const UploadImage: React.FC<{onCancelUpload: () => void,onFileUpload: (file:File) => void}> = (props) => {
    const [file, setFile] = useState<File>();
    const [fileURL, setFileURL] = useState<string>("");

    const handleOverrideEventDefaults = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        ev.stopPropagation();
    }

    const handleDragEnter = (ev: React.DragEvent<HTMLDivElement>) => {
        handleOverrideEventDefaults(ev);
    }

    const handleDragLeave = (ev: React.DragEvent<HTMLDivElement>) => {
        handleOverrideEventDefaults(ev);
    }

    const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
        handleOverrideEventDefaults(ev);
        if (ev.dataTransfer.files && ev.dataTransfer.files[0]) {
            const file = ev.dataTransfer.files[0];
            setFile(file)
            setFileURL(URL.createObjectURL(file))
        }
    }

    const handleFileChange = (event: any) => {
        if(!event.target.files && !event.target.files[0])
        {
            console.log("no file chosen")
            return
        }
        console.log("Handling file change")
        const file = event.target.files[0];
        setFile(file);
        setFileURL(URL.createObjectURL(file));
    };

    const handleFileUpload = () => {
        if (!file) {
            console.log("Please specify a file to upload.")
            return
        }
        props.onFileUpload(file)
        props.onCancelUpload()
    }

    return (
        <>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragEnter}
                onDrag={handleDragEnter}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 800x400px)</p>
                        {file && (
                            <>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">File to upload:</span> {file.name}</p>
                                <Image
                                    src={fileURL}
                                    alt="file upload"
                                    height={100}
                                    width={100}
                                />
                            </>
                        )}
                        {!file && (
                            <p className="text-md text-gray-500 dark:text-gray-400">No file uploaded yet.</p>
                        )}
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                </label>
            </div>
            <div className="flex flex-row justify-between md:justify-end items-center my-2 p-2 space-x-2 bg-white rounded-md">
                <button onClick={props.onCancelUpload} className="bg-red-400 px-2 rounded-full text-white">Cancel</button>
                <button onClick={handleFileUpload} className="bg-green-400 px-2 rounded-full text-white">Confirm</button>
            </div>

        </>
    )
}

export default UploadImage