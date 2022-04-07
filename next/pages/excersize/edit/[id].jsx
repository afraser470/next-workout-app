import MainLayout from "../../../components/layouts/MainLayout.jsx";
import ExcersizeForm from "../../../components/forms/ExcersizeForm.jsx";
import { ObjectId } from "mongodb";
import connectToDB from "../../../lib/connectToDB";

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

export default function EditExcersize({data}){
    return(
        <MainLayout>
            <div className="flex justify-center">
                <ExcersizeForm apiPath='/api/excersize/editExcersize' reqType="PUT" data={data}></ExcersizeForm>
            </div>
        </MainLayout>
    )
}