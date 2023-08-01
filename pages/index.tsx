import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

function GetSecret() {
  const mySecret: string | undefined = process.env.NEXT_PUBLIC_MY_SECRET;
  const defaultValue: string = "no secret found";
  return mySecret ?? defaultValue;
}

export default function Home() {
  const mySecret = GetSecret();

  const description = `My Secret: ${mySecret}`;
  return (
    <>
      <h1 className="text-3xl">
        Starter NextJS TailwindCSS
      </h1>
      <div className="">{description}</div>
    </>
  )
}
