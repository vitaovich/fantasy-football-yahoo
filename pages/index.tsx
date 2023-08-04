import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from "next-auth/react"
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <>

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
            {/* <Image
              src={session.user.image}
              alt="profile image"
              width={50}
              height={50}
            /> */}
            <Link className='bg-blue-400 text-white py-4 px-2 rounded-md' href="/fantasycaller">Fantasy Caller</Link>
            <Link className='bg-blue-400 text-white py-4 px-2 rounded-md' href="/league">League Info</Link>

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
