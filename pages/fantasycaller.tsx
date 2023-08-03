import Input from "@/components/input";
import useInput from "@/hooks/use-input";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";

const FantasyCaller = () => {
    const { data: session, status } = useSession()
    const [apiCallHistory, setApiCallHistory] = useState<string[]>([]);
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
                <button className="bg-gray-300 rounded-md px-4 py-2" onClick={() => handleResult(call)}>
                    {call}
                </button>
            </li>
        )
    })

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen space-y-24">

                <h1 className="text-4xl text-purple-600">Yahoo Fantasy API Caller</h1>
                {session && (
                    <div className="space-y-4">
                        <div className="flex flex-row space-x-4">
                            <div className="border border-2 border-gray-300 p-4 rounded-md">
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
                                    <button className="bg-blue-300 py-2 px-4 rounded-md">Submit</button>
                                </form>
                            </div>
                            <div className="border border-2 border-gray-300 p-4 rounded-md">
                                <h2>Result</h2>
                                <div className="w-96 border border-2 border-blue-400 rounded-md p-2 whitespace-pre overflow-auto">
                                    {result}
                                </div>
                            </div>
                        </div>
                        <div className="py-4 px-6 rounded-md  border-2 border-gray-300">
                            <h2>History</h2>
                            <ol >
                                {previousCalls}
                            </ol>
                        </div>
                    </div>

                )}
                {!session && (
                    <div className="flex flex-row space-x-4">
                        <span>
                            You are not signed in
                        </span>
                        <Link
                            href={`/api/auth/signin`}
                            className='bg-blue-400 rounded-md p-2 text-white'
                            onClick={(e) => {
                                e.preventDefault()
                                signIn()
                            }}
                        >
                            Sign in
                        </Link>
                    </div>
                )}
                {session?.user && (
                    <div className="flex flex-row space-x-4">
                        <span >
                            <small>Signed in as</small>
                            <br />
                            <strong>{session.user.email ?? session.user.name}</strong>
                        </span>
                        <Link
                            href={`/api/auth/signout`}
                            className='bg-blue-400 rounded-md px-4 text-white'
                            onClick={(e) => {
                                e.preventDefault()
                                signOut()
                            }}
                        >
                            Sign out
                        </Link>
                    </div>
                )}
            </div>
        </>

    )
}

export default FantasyCaller