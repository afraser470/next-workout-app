import MainLayout from "../../components/layouts/MainLayout.jsx";
import connectToDB from "../../lib/connectToDB";
import NavButton from "../../components/ui/NavButton.jsx";
import FormButton from "../../components/ui/FormButton.jsx";
import { useState } from "react";
import { useRouter } from 'next/router'
import { ObjectId } from "mongodb";
import HistoryTable from "../../components/ui/excersize/HistoryTable.jsx";
import ExcersizeDetails from "../../components/ui/excersize/ExcersizeDetails.jsx";

export async function getServerSideProps({params}) {
    const ID = ObjectId(params.id);
    const { db } = await connectToDB();
    const conn = await db
    .collection("excersizes")
    .find({_id:ID})
    .toArray();
    let data = JSON.parse(JSON.stringify(conn))
    return {
        props: {data:data}
    }
}

export default function ExcersizeByID({data}){
    const router = useRouter()
    const [excersizeId] = useState(data == undefined?"":data[0]._id);
    const [pb] = useState(data[0].history.length != 0?data[0].history.reduce(function(prev, current){return (prev.weight > current.weight) ? prev : current  }):"");


    async function handleSubmit(e){
        const res = await fetch('/api/excersize/deleteExcersize', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id:excersizeId
            }),
        });
        const data = await res.json();
        if(data.success == true){
            router.push("/excersize/viewExcersizes");
        }else{
            console.log(data.result);
        }
    }
    
    return(
        <MainLayout>
            <div className="flex flex-col">
                <ExcersizeDetails action={handleSubmit} data={data} pb={pb}/>
                <HistoryTable data={data}/>
            </div>
        </MainLayout>
    )
}