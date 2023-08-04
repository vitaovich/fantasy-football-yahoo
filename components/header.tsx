import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header: React.FC = () => {
    const { data: session, status } = useSession()

    const loginStatus = session ? (
        <span>
            <small className="m-2">Signed in as</small>
            <strong className="m-2">{session.user?.email ?? session.user?.name}</strong>
        </span>
    ) : (
        <span>You are not signed in.</span>
    );
    
    return (
        <>
            <header className="flex flex-row items-center justify-between p-2 border-b">
                <div className="">Vantasy Vootball</div>
                {loginStatus}
                {!session && (
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
                )}
                {session?.user && (
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
                )}
            </header>

        </>
    );
}
export default Header;