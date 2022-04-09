import MainLayout from "../../components/layouts/MainLayout";
import RoutineForm from "../../components/forms/RoutineForm";
import connectToDB from "../../lib/connectToDB";
import NoExcersizes from "../../components/ui/routine/NoExcersizes";

export async function getServerSideProps(){
    const { db } = await connectToDB();
    const conn = await db
    .collection("excersizes")
    .find()
    .toArray();
    const data = JSON.parse(JSON.stringify(conn))
    return {
        props: {data:data}
    }
}

export default function NewRoutine({data}){
    return(
        <MainLayout>
            <div className="flex justify-center">
                {data.length == 0?
                    <NoExcersizes/>
                :
                    <RoutineForm apiPath='/api/routine/newRoutine' reqType="POST" data={data}/>
                }
            </div>
        </MainLayout>
    )
}