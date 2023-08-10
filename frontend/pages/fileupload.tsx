import { useState } from "react";

const FileUpload = () => {
    const [file, setFile] = useState<any>();
    const [result, setResult] = useState<string>();

    const onFileChange = (event: any) => {
        // Update the state
        setFile(event.target.files[0]);

    };

    async function onSasTokenHandler(name: string) {
        if(!file) {
            setResult("Must specify a file first.");
            return
        }
        
        const res = await fetch('/api/azurefunctions', {
            method: "POST",
            body: JSON.stringify({ name: name, fileName: file.name })
        })
        const fantasySportsResult = await res.json();
        setResult(JSON.stringify(fantasySportsResult, null, 2));
    };

    const onFileUpload = () => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            file,
            file.name
        );

        // Details of the uploaded file
        console.log(file);
        console.log(formData);
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
                        <h1>SAS Token:</h1>
                        <p>{result}</p>
                    </div>
                )}
                <button className="bg-green-500 py-2 px-4 rounded-full text-white" onClick={onFileUpload}>
                    Upload!
                </button>
            </div>
        </>
    );
}

export default FileUpload;