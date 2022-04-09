import MainLayout from "../../../components/layouts/MainLayout";
import RoutineForm from "../../../components/forms/RoutineForm";
import connectToDB from "../../../lib/connectToDB";
import { ObjectId } from "mongodb";

export async function getServerSideProps({params}){
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
        props: {excersize:excersizes,routine:routine}
    }
}

export default function NewRoutine({excersize,routine}){
    return(
        <MainLayout>
            <div className="flex justify-center">
                <RoutineForm apiPath='/api/routine/editRoutine' reqType="PUT" data={excersize} routine={routine}/>
            </div>
        </MainLayout>
    )
}