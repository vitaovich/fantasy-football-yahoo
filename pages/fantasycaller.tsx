import Input from "@/components/input";
import useInput from "@/hooks/use-input";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";

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
                    <span className="select-all">
                        {call}
                    </span>
                    <button className="ml-4 bg-purple-600 rounded-md px-4 py-2 text-white" onClick={() => handleResult(call)}>
                        Call
                    </button>
                </div>

            </li>
        )
    })

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen space-y-24 py-4">
                <h1 className="text-4xl text-purple-600">Yahoo! Fantasy API Caller</h1>
                {session && (
                    <div className="flex flex-col w-3/4 space-y-4">
                        <div className="flex flex-row space-x-4">
                            <div className="w-1/3 border border-2 border-gray-300 p-4 rounded-md">
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
                            </div>
                            <div className="flex flex-col w-2/3 border border-2 border-gray-300 p-4 rounded-md">
                                <h2 className='uppercase font-semibold'>Result</h2>
                                <div className="border border-2 border-purple-600 rounded-md p-2">
                                    <pre className="h-96 text-xs overflow-auto select-all">
                                        {result}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        <div className="py-4 px-6 rounded-md  border-2 border-gray-300">
                            <h2 className='uppercase font-semibold'>History</h2>
                            <ol >
                                {previousCalls}
                            </ol>
                        </div>
                    </div>

                )}
                {!session && (
                    <div className="flex flex-row items-center space-x-4">
                        <span>
                            You are not signed in
                        </span>
                        <Link
                            href={`/api/auth/signin`}
                            className='bg-green-400 rounded-md py-2 px-4 text-white'
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
                    <div className="flex flex-row items-center space-x-4">
                        <span>
                            <small className="m-2">Signed in as</small>
                            <br />
                            <strong className="m-2">{session.user.email ?? session.user.name}</strong>
                        </span>
                        <Link
                            href={`/api/auth/signout`}
                            className='bg-red-400 rounded-md py-2 px-4 text-white'
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