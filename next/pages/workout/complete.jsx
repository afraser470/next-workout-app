import MainLayout from "../../components/layouts/MainLayout";
import NavButton from "../../components/ui/NavButton";
import Complete from "../../components/ui/workout/Complete";
import { useSession,getSession } from "next-auth/react"

export async function getServerSideProps(context) {
    return {
      props: {
        session: await getSession(context),
      },
    }
  }

export default function CompletePage(){
    const { data: session } = useSession()

    if (session) {    
        return(
            <MainLayout>
                <div className="flex justify-center">
                    <Complete/>
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