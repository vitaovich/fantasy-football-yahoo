import { Inter } from '@next/font/google'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session, status } = useSession()
  return (
    <>

      <div className="flex flex-row justify-between m-4">
        {session?.user && (
          <>
            <Link className='bg-blue-400 text-white py-4 px-2 rounded-md' href="/fantasycaller">Fantasy Caller</Link>
            <Link className='bg-blue-400 text-white py-4 px-2 rounded-md' href="/league">League Info</Link>
          </>
        )}
      </div>
    </>
  )
}
