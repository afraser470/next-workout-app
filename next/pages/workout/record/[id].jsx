import MainLayout from "../../../components/layouts/MainLayout";
import { ObjectId } from "mongodb";
import connectToDB from "../../../lib/connectToDB";
import RecordSet from "../../../components/ui/workout/RecordSet";
import { useState } from "react";
import NavButton from "../../../components/ui/NavButton";
import { useSession,getSession } from "next-auth/react"

export async function getServerSideProps({context,params}){
    const ID = ObjectId(params.id);
    const { db } = await connectToDB();
    const conn = await db
    .collection("routines")
    .find({_id:ID})
    .toArray();
    const routine = JSON.parse(JSON.stringify(conn))
    
    const conn1 = await db
    .collection("excersizes")
    .find()
    .toArray();
    const excersizes = JSON.parse(JSON.stringify(conn1))

    const sets = [];

    routine[0].excersizes.forEach(e => {
        excersizes.forEach(x=>{
            if(e.id == x._id){
                for(let i = 0; i < e.sets; i++){
                    sets.push(x);
                }
            }
        })
    });

    return{
        props: {sets:sets,session: await getSession(context),}
    }
}

export default function RecordRoutine({sets}){

    const [setsToDo,setSetsToDo] = useState(sets);
    const { data: session } = useSession()

    if (session) {   
        return(
            <MainLayout>
                <div className="pb-6 border-b flex justify-between gap-6 mb-6">
                    <NavButton page="/" text="Home"></NavButton>
                </div>
                <div className="flex flex-col overflow-y-auto max-h-128 items-center">
                    {setsToDo.map((e,k)=>{
                        return(
                            <RecordSet index={k} key={k} excersize={e} apiPath="/api/workout/RecordSet" reqType="PUT" sets={setsToDo} setSets={setSetsToDo}/>
                            )
                        })}
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