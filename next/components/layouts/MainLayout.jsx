export const siteTitle = 'middle ware demo';
import { useSession, getSession } from "next-auth/react"
import Link from "next/link";

export default function MainLayout({ children }) {
    const { data: session, status } = useSession()

    return (
        <div className="flex flex-col h-full text-gray-200">
            <header className="flex justify-center border-b-2 border-gray-200 mb-6">
                <div className="container p-4 flex justify-between ">
                    <div className="text-2xl transition hover:text-sky-500">
                        <Link href="/">
                            Next Workout
                        </Link>
                    </div>
                    <div className="text-xl transition hover:text-sky-500">
                        {status === "unauthenticated"?
                            <a href="/api/auth/signin">Login</a>
                        :
                            <a href="/api/auth/signout">Logout</a>
                        }
                    </div>
                </div>
            </header>
            <div className="flex justify-center">
                <div className="container p-4">
                    {children}
                </div>
            </div>
        </div>
    )
};