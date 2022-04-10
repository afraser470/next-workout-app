import MainLayout from "../../components/layouts/MainLayout.jsx";
import connectToDB from "../../lib/connectToDB";
import AllExcersizes from "../../components/ui/excersize/AllExcersizes.jsx";
import NavButton from "../../components/ui/NavButton.jsx";
import { useSession,getSession } from "next-auth/react"

export async function getServerSideProps(context) {
    const { db } = await connectToDB();
    const conn = await db
    .collection("excersizes")
    .find()
    .toArray();
    const data = JSON.parse(JSON.stringify(conn))
    return {
      props: {data:data.reverse(),session: await getSession(context)},
    }
  }

export default function ViewExcersize({data}){
    const { data: session } = useSession()
    if (session) {  
      return(
          <MainLayout>
              <AllExcersizes data={data}/>
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