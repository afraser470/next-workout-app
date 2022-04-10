import MainLayout from "../../components/layouts/MainLayout.jsx";
import ExcersizeForm from "../../components/forms/ExcersizeForm.jsx";
import NavButton from "../../components/ui/NavButton.jsx";
import { useSession,getSession } from "next-auth/react"

export async function getServerSideProps(context) {
    return {
      props: {
        session: await getSession(context),
      },
    }
  }

export default function NewExcersize(){
    const { data: session } = useSession();
    if (session) {  
    return(
        <MainLayout>
            <div className="flex justify-center">
                <ExcersizeForm apiPath='/api/excersize/newExcersize' reqType="POST"/>
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