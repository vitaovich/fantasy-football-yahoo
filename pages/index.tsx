import { Inter } from '@next/font/google'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import styles from '@/pages/index.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session, status } = useSession()
  return (
    <>

      <div className="flex flex-row justify-between m-4">
        {session?.user && (
          <>
            <Link className='bg-blue-400 text-white py-4 px-2 rounded-md' href="/fantasycaller">Fantasy Caller</Link>
            <div className="w-[128px] h-[128px] bg-cover bg-fire animate-fire"></div>
            <div className={styles.animation}></div>
            <Link className='bg-blue-400 text-white py-4 px-2 rounded-md' href="/league">League Info</Link>
          </>
        )}
      </div>
    </>
  )
}
