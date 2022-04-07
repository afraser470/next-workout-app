import MainLayout from "../../components/layouts/MainLayout.jsx";
import connectToDB from "../../lib/connectToDB";
import ExcersizeCard from "../../components/ui/ExcersizeCard.jsx"
import NavButton from "../../components/ui/NavButton.jsx";

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
            <div className="flex flex-col">
                <div className="pb-6 border-b flex justify-between gap-6">
                    <NavButton page="/" text="Home"></NavButton>
                    <NavButton page="/excersize/newExcersize" text="Add New Excersize!"></NavButton>
                </div>
                <div className="flex justify-center flex-wrap gap-6 mt-6">
                {data.map((excersize,key)=>{
                    return(
                        <ExcersizeCard key={key} data={excersize}></ExcersizeCard>
                        )
                    })}
                </div>
            </div>
        </MainLayout>
    )
}