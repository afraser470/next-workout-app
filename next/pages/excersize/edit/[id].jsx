import MainLayout from "../../../components/layouts/MainLayout.jsx";
import ExcersizeForm from "../../../components/forms/ExcersizeForm.jsx";
import { ObjectId } from "mongodb";
import connectToDB from "../../../lib/connectToDB";
import NavButton from "../../../components/ui/NavButton.jsx";
import { useSession,getSession } from "next-auth/react"

export async function getServerSideProps({context,params}) {
    const ID = ObjectId(params.id);
    const { db } = await connectToDB();
    const conn = await db
    .collection("excersizes")
    .find({_id:ID})
    .toArray();
    let data = JSON.parse(JSON.stringify(conn))
    return {
        props: {data:data,session: await getSession(context),}
    }
}

export default function EditExcersize({data}){
    const { data: session } = useSession();
    if (session) {  
        return(
            <MainLayout>
                <div className="flex justify-center">
                    <ExcersizeForm apiPath='/api/excersize/editExcersize' reqType="PUT" data={data}/>
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