import MainLayout from "../../components/layouts/MainLayout";
import RoutineForm from "../../components/forms/RoutineForm";
import connectToDB from "../../lib/connectToDB";
import NoExcersizes from "../../components/ui/routine/NoExcersizes";
import { useSession,getSession } from "next-auth/react"
import NavButton from "../../components/ui/NavButton.jsx"

export async function getServerSideProps(context){
    const { db } = await connectToDB();
    const conn = await db
    .collection("excersizes")
    .find()
    .toArray();
    const data = JSON.parse(JSON.stringify(conn))
    return {
        props: {data:data,session: await getSession(context),}
    }
}

export default function NewRoutine({data}){
    const { data: session } = useSession()

    if (session) {   
        return(
            <MainLayout>
                <div className="flex justify-center">
                    {data.length == 0?
                        <NoExcersizes/>
                    :
                        <RoutineForm apiPath='/api/routine/newRoutine' reqType="POST" data={data}/>
                    }
                </div>
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