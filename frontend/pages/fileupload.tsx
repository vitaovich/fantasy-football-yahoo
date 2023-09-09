import { useState } from "react";
import { BlockBlobClient } from '@azure/storage-blob';
import { convertFileToArrayBuffer } from '@/lib/convert-file-to-arraybuffer';
import Image from 'next/image'

const FileUpload = () => {
    const [file, setFile] = useState<any>();
    const [result, setResult] = useState<string>();
    const [sasURL, setSasURL] = useState<string>('');
    const [storageURL, setStorageURL] = useState<string>('');
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const onFileChange = (event: any) => {
        // Update the state
        setFile(event.target.files[0]);

    };

    async function onSasTokenHandler(name: string) {
        if (!file) {
            setResult("Must specify a file first.");
            return
        }

        const res = await fetch('/api/azurefunctions', {
            method: "POST",
            body: JSON.stringify({ name: name, fileName: file.name, fileType: file.name.split('.').pop() })
        })
        const fantasySportsResult = await res.json();
        setSasURL(fantasySportsResult.result);
        setResult(JSON.stringify(fantasySportsResult, null, 2));
    };

    const onFileUpload = () => {
        if (sasURL === '') return;

        convertFileToArrayBuffer(file as File)
            .then((fileArrayBuffer) => {
                if (
                    fileArrayBuffer === null ||
                    fileArrayBuffer.byteLength < 1 ||
                    fileArrayBuffer.byteLength > 256000
                )
                    return;

                console.log("uploading file");
                const blockBlobClient = new BlockBlobClient(sasURL);
                return blockBlobClient.uploadData(fileArrayBuffer);
            })
            .then(() => {
                setUploadStatus('Successfully finished upload');
                setStorageURL("https://ffvitaovich.blob.core.windows.net/upload/" + file.name);
            })
            .catch((error: unknown) => {
                if (error instanceof Error) {
                  const { message, stack } = error;
                  setUploadStatus(
                    `Failed to finish upload with error : ${message} ${stack || ''}`
                  );
                } else {
                  setUploadStatus(error as string);
                }
              });
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center space-y-4">
                <h1>File Upload</h1>
                <input type="file" className="bg-blue-200 p-4" onChange={onFileChange} />
                <button className="bg-blue-500 py-2 px-4 rounded-full text-white" onClick={() => onSasTokenHandler("Vitaliy")}>
                    Get Sas Token!
                </button>
                {result && (
                    <div className="flex flex-row">
                        <h1>Result:</h1>
                        <p>{result}</p>
                    </div>
                )}
                {sasURL && (
                    <div className="flex flex-row">
                        <h1>SAS Token:</h1>
                        <p>{sasURL}</p>
                    </div>
                )}
                <button className="bg-green-500 py-2 px-4 rounded-full text-white" onClick={onFileUpload}>
                    Upload!
                </button>
                {uploadStatus && (
                    <p>{uploadStatus}</p>
                )}
                { storageURL &&
                    <Image
                    src={storageURL}
                    width={500}
                    height={500}
                    alt=""
                    >
                    </Image>
                }
                
                    
            </div>
        </>
    );
}

export default FileUpload;