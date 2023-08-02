import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

function GetSecret() {
  const mySecret: string | undefined = process.env.NEXT_PUBLIC_MY_SECRET;
  const defaultValue: string = "no secret found";
  return mySecret ?? defaultValue;
}

export default function Home() {
  const mySecret = GetSecret();
  const { data: session, status } = useSession()
  const loading = status === "loading"

  const description = `My Secret: ${mySecret}`;
  return (
    <>
      <h1 className="text-3xl">
        Starter NextJS TailwindCSS
      </h1>
      <div className="">{description}</div>
      <div className="flex flex-row justify-between m-4">
        {!session && (
          <>
            <span>
              You are not signed in
            </span>
            <a
              href={`/api/auth/signin`}
              className='bg-blue-400 rounded-md p-2 text-white'
              onClick={(e) => {
                e.preventDefault()
                signIn()
              }}
            >
              Sign in
            </a>

          </>
        )}
        {session?.user && (
          <>
            {/* {session.user.image && (
              <span
                style={{ backgroundImage: `url('${session.user.image}')` }}
              />
            )} */}
            <span >
              <small>Signed in as</small>
              <br />
              <strong>{session.user.email ?? session.user.name}</strong>
            </span>
            <a
              href={`/api/auth/signout`}
              className='bg-blue-400 rounded-md p-2 text-white'
              onClick={(e) => {
                e.preventDefault()
                signOut()
              }}
            >
              Sign out
            </a>
          </>
        )}
      </div>
    </>
  )
}
