import MainLayout from "../../components/layouts/MainLayout.jsx"
import connectToDB from "../../lib/connectToDB";
import RoutineSelect from "../../components/ui/workout/RoutineSelect"
import NoRoutines from "../../components/ui/workout/NoRoutines.jsx";

export async function getServerSideProps() {
    const { db } = await connectToDB();
    const conn = await db
    .collection("routines")
    .find()
    .toArray();
    const data = JSON.parse(JSON.stringify(conn))
    return {
        props: {data:data}
    }
}
export default function NewWorkout({data}){
    return(
        <MainLayout>
            {data.length == 0?
                <div className="flex justify-center">
                    <NoRoutines/>
                </div>
            :
                <RoutineSelect data={data}/>
            }
        </MainLayout>
    )
}