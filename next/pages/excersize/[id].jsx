import MainLayout from "../../components/layouts/MainLayout.jsx";
import connectToDB from "../../lib/connectToDB";
import NavButton from "../../components/ui/NavButton.jsx";
import FormButton from "../../components/ui/FormButton.jsx";
import { useState } from "react";
import { useRouter } from 'next/router'
import { ObjectId } from "mongodb";

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
                <div className="pb-6 border-b flex justify-between gap-6">
                    <NavButton page="/excersize/viewExcersizes" text="Back"></NavButton>
                    <div className="flex gap-6">
                        <NavButton page="/excersize/edit/[id]" text="Edit This Excersize!" query={`/excersize/edit/${data[0]._id}`}></NavButton>
                        <FormButton text="Delete" action={handleSubmit} type="delete"></FormButton>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="text-2xl mt-6 flex flex-col gap-6">
                        <div>
                            <div>{data[0].name}</div>
                        </div>
                        <div>
                            <div>{data[0].description}</div>
                        </div>
                        <div>
                            <a className="text-base transition hover:text-sky-500" href={data[0].url} target="_blank" rel="noopener noreferrer">{data[0].url}</a>
                        </div>
                    </div>
                    <div className="text-2xl mt-6 flex flex-col gap-6 mr-6">
                        <div>
                            <div>Personnal Best:</div>
                            <div className={pb != ""?"mt-3 text-yellow-400":"text-sm"}>{pb != ""?pb.weight+"kg x "+pb.reps+" reps":"No Attemp Recorded!"}</div>

                        </div>
                    </div>
                </div>
                <div className="relative overflow-x-auto sm:rounded-lg mt-6">
                    <table className="w-full text-sm text-left mt-6">
                        <thead className="text-xs uppercase border-b">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Excersize name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Weight
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Reps
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data[0].history.map((set,key)=>{
                                return(        
                                    <tr key={key} className="border-b">
                                        <th scope="row" className="px-6 py-4 font-medium">
                                            {data[0].name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {set.weight}
                                        </td>
                                        <td className="px-6 py-4">
                                            {set.reps}
                                        </td>
                                        <td className="px-6 py-4">
                                            {set.date}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    )
}