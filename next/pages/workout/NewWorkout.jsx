import MainLayout from "../../components/layouts/MainLayout.jsx"
import connectToDB from "../../lib/connectToDB";
import RoutineSelect from "../../components/ui/workout/RoutineSelect"
import NoRoutines from "../../components/ui/workout/NoRoutines.jsx";
import { useSession,getSession } from "next-auth/react"
import NavButton from "../../components/ui/NavButton.jsx"

export async function getServerSideProps(context) {
    const { db } = await connectToDB();
    const conn = await db
    .collection("routines")
    .find()
    .toArray();
    const data = JSON.parse(JSON.stringify(conn))
    return {
        props: {data:data,session: await getSession(context),}
    }
}
export default function NewWorkout({data}){
    const { data: session } = useSession()

    if (session) {  
        return(
            <MainLayout>
                {data.length == 0?
                    <div className="flex justify-center">
                        <NoRoutines/>
                    </div>
                :
                    <RoutineSelect data={data}/>
                }
            </MainLayout>
        )
    }
    return(
    <MainLayout>
        <div className="flex flex-col justify-evenly items-center h-80">
        <NavButton page="/api/auth/signin" text="Sign In!"/>
        </div>
    </MainLayout>
    )
}