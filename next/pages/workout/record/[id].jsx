import MainLayout from "../../../components/layouts/MainLayout";
import { ObjectId } from "mongodb";
import connectToDB from "../../../lib/connectToDB";
import RecordSet from "../../../components/ui/workout/RecordSet";
import { useState } from "react";
import NavButton from "../../../components/ui/NavButton";

export async function getServerSideProps({params}){
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
        props: {sets:sets}
    }
}

export default function RecordRoutine({sets}){

    const [setsToDo,setSetsToDo] = useState(sets);

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