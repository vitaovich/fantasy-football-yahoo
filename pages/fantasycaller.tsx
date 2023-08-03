import Input from "@/components/input";
import useInput from "@/hooks/use-input";
import { useState } from "react";

const FantasyCaller = () => {
    const [apiCall, setApiCall] = useState<string>('');
    const [result, setResult] = useState<string>('');

    const {
        value: enteredCall,
        isValid: enteredCallIsValid,
        hasError: callInputHasError,
        valueChangeHandler: callChangedHandler,
        inputBlurHandler: callBlurHandler,
        reset: resetCallInput
    }
        = useInput(apiCall, value => value.trim() !== '');

    let formIsValid = false

    if (enteredCallIsValid) {
        formIsValid = true
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (!formIsValid) {
            return
        }
        console.log("ENTERED:" + enteredCall);
        setApiCall(enteredCall);
        setResult(enteredCall);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-24 bg-gray-300">
            <h1>Fantasy Caller</h1>
            <div className="flex flex-row">
                <div className="bg-white mx-12 p-4 rounded-md">
                    <h2>Input</h2>
                    <form onSubmit={submitHandler} className='space-y-4'>
                        <Input
                            label={"API Call"}
                            validationMessage={"This field is required."}
                            value={enteredCall}
                            hasError={callInputHasError}
                            changeHandler={callChangedHandler}
                            blurHandler={callBlurHandler}
                            id={"name"}
                            placeHolder={"e.g. call"}
                        />
                        <button className="bg-blue-300 py-2 px-4 rounded-md">Submit</button>
                    </form>
                </div>
                <div className="bg-white mx-12 p-4 rounded-md">
                    <h2>Result</h2>
                    <div className="border border-blue-400 rounded-md p-2">
                    {result}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default FantasyCaller