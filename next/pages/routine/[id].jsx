import MainLayout from "../../components/layouts/MainLayout.jsx";
import connectToDB from "../../lib/connectToDB";
import { useState } from "react";
import { useRouter } from 'next/router'
import { ObjectId } from "mongodb";
import RoutineDetails from "../../components/ui/routine/RoutineDetails.jsx";
import ExcersizeTable from "../../components/ui/routine/ExcersizeTable.jsx";

export async function getServerSideProps({params}) {
    const ID = ObjectId(params.id);
    const { db } = await connectToDB();
    const conn = await db
    .collection("routines")
    .find({_id:ID})
    .toArray();
    let data = JSON.parse(JSON.stringify(conn))
    return {
        props: {data:data}
    }
}

export default function RoutineByID({data}){
    const router = useRouter();
    const [routineId] = useState(data == undefined?"":data[0]._id);

    async function handleSubmit(e){
        const res = await fetch('/api/routine/deleteRoutine', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id:routineId
            }),
        });
        const data = await res.json();
        if(data.success == true){
            router.push("/routine/viewRoutines");
        }else{
            console.log(data.result);
        }
    }
    
    return(
        <MainLayout>
            <div className="flex flex-col">
                <RoutineDetails action={handleSubmit} data={data}/>
                <ExcersizeTable data={data}/>
            </div>
        </MainLayout>
    )
}