import Input from "@/components/input";
import useInput from "@/hooks/use-input";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";
import Container from "@/components/fantasycaller/container";

const FantasyCaller = () => {
    const { data: session, status } = useSession()
    const [apiCallHistory, setApiCallHistory] = useState<string[]>(['users;use_login=1/games;game_keys=nfl/teams']);
    const [result, setResult] = useState<string>('No Result');

    const {
        value: enteredCall,
        isValid: enteredCallIsValid,
        hasError: callInputHasError,
        valueChangeHandler: callChangedHandler,
        inputBlurHandler: callBlurHandler,
        reset: resetCallInput
    }
        = useInput("", value => value.trim() !== '');

    let formIsValid = false

    if (enteredCallIsValid) {
        formIsValid = true
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!formIsValid) {
            return
        }
        console.log("ENTERED:" + enteredCall);
        const nextApiCallHistory = [enteredCall, ...apiCallHistory]
        setApiCallHistory(nextApiCallHistory);
        handleResult(enteredCall);
        resetCallInput();
    }

    async function handleResult(call: string) {
        const res = await fetch('/api/yahoofantasysports', {
            method: "POST",
            body: JSON.stringify({ call: call })
        })
        const fantasySportsResult = await res.json();
        setResult(JSON.stringify(fantasySportsResult, null, 2));
    }

    const previousCalls = apiCallHistory.map((call, idx) => {
        let description: string;
        return (
            <li key={idx} className="my-2">
                <div className="flex flex-row items-center justify-between border-t border-gray-300 p-2">
                    <div className="text-xs">
                        {call}
                    </div>
                    <button className="hidden ml-4 bg-purple-600 rounded-md px-4 py-2 text-white md:inline" onClick={() => handleResult(call)}>
                        Call
                    </button>
                </div>

            </li>
        )
    })

    return (
        <>
            <div className="flex flex-col py-4">
                <h1 className="my-4 grow text-center text-2xl md:text-4xl text-purple-600">Yahoo! Fantasy API Caller</h1>
                {session && (
                    <div className="flex flex-col mx-2 md:mx-12 space-y-4">
                        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                            <Container>
                                <form onSubmit={handleSubmit} className='space-y-4'>
                                    <Input
                                        label={"API Call"}
                                        validationMessage={"This field is required."}
                                        value={enteredCall}
                                        hasError={callInputHasError}
                                        changeHandler={callChangedHandler}
                                        blurHandler={callBlurHandler}
                                        id={"name"}
                                        placeHolder={"e.g. users;use_login=1/games;game_keys=nfl/teams"}
                                    />
                                    <button className="bg-green-400 text-white py-2 px-4 rounded-md">Submit</button>
                                </form>
                            </Container>
                            <Container title='result' className="grow">
                                <div className="border border-2 border-purple-600 rounded-md p-2">
                                    <pre className="h-96 whitespace-pre-wrap text-xs overflow-auto select-all">
                                        {result}
                                    </pre>
                                </div>
                            </Container>
                        </div>
                        <Container title='history'>
                            <ol >
                                {previousCalls}
                            </ol>
                        </Container>
                    </div>

                )}
            </div>
        </>

    )
}

export default FantasyCaller