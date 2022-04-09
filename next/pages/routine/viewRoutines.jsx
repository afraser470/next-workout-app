import MainLayout from "../../components/layouts/MainLayout.jsx";
import connectToDB from "../../lib/connectToDB";
import AllRoutines from "../../components/ui/routine/AllRoutines.jsx";

export async function getServerSideProps() {
    const { db } = await connectToDB();
    const conn = await db
    .collection("routines")
    .find()
    .toArray();
    const data = JSON.parse(JSON.stringify(conn))
    return {
      props: {data:data.reverse()},
    }
}

export default function ViewRoutines({data}){
    return(
        <MainLayout>
            <AllRoutines data={data}/>
        </MainLayout>
    )
}