import MainLayout from "../../../components/layouts/MainLayout";
import RoutineForm from "../../../components/forms/RoutineForm";
import connectToDB from "../../../lib/connectToDB";
import { ObjectId } from "mongodb";
import { useSession,getSession } from "next-auth/react"
import NavButton from "../../../components/ui/NavButton";

export async function getServerSideProps({context,params}){
    const { db } = await connectToDB();
    const conn1 = await db
    .collection("excersizes")
    .find()
    .toArray();
    const excersizes = JSON.parse(JSON.stringify(conn1));

    const ID = ObjectId(params.id);
    const conn2 = await db
    .collection("routines")
    .find({_id:ID})
    .toArray();
    const routine = JSON.parse(JSON.stringify(conn2));
    return {
        props: {excersize:excersizes,routine:routine,session: await getSession(context)}
    }
}

export default function NewRoutine({excersize,routine}){
    const { data: session } = useSession()

    if (session) {    
        return(
            <MainLayout>
                <div className="flex justify-center">
                    <RoutineForm apiPath='/api/routine/editRoutine' reqType="PUT" data={excersize} routine={routine}/>
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