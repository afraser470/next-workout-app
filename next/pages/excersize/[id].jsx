import MainLayout from "../../components/layouts/MainLayout.jsx";
import connectToDB from "../../lib/connectToDB";
import { useState } from "react";
import { useRouter } from 'next/router'
import { ObjectId } from "mongodb";
import HistoryTable from "../../components/ui/excersize/HistoryTable.jsx";
import ExcersizeDetails from "../../components/ui/excersize/ExcersizeDetails.jsx";
import FindPB from "../../lib/function.js";
import { useSession,getSession } from "next-auth/react"
import NavButton from "../../components/ui/NavButton.jsx";

export async function getServerSideProps({params,context}) {
    const ID = ObjectId(params.id);
    const { db } = await connectToDB();
    const conn = await db
    .collection("excersizes")
    .find({_id:ID})
    .toArray();
    let data = JSON.parse(JSON.stringify(conn))
    data[0].history.reverse();
    const best = FindPB(data);

    return {
        props: {data:data, best:best,session: await getSession(context),}
    }
}

export default function ExcersizeByID({data,best}){
    const { data: session } = useSession()
    const router = useRouter()
    const [excersizeId] = useState(data == undefined?"":data[0]._id);
    const [pb] = useState(best);


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
    if (session) {  
        return(
            <MainLayout>
                <div className="flex flex-col">
                    <ExcersizeDetails action={handleSubmit} data={data} pb={pb}/>
                    <HistoryTable data={data}/>
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
  