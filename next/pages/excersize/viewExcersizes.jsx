import MainLayout from "../../components/layouts/MainLayout.jsx";
import connectToDB from "../../lib/connectToDB";
import ExcersizeCard from "../../components/ui/excersize/ExcersizeCard.jsx"
import NavButton from "../../components/ui/NavButton.jsx";
import AllExcersizes from "../../components/ui/excersize/AllExcersizes.jsx";

export async function getServerSideProps() {
    const { db } = await connectToDB();
    const conn = await db
    .collection("excersizes")
    .find()
    .toArray();
    const data = JSON.parse(JSON.stringify(conn))
    return {
      props: {data:data.reverse()},
    }
  }

export default function ViewExcersize({data}){
    return(
        <MainLayout>
            <AllExcersizes data={data}/>
        </MainLayout>
    )
}