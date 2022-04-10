import MainLayout from "../components/layouts/MainLayout.jsx"
import { useSession,getSession } from "next-auth/react"
import NavButton from "../components/ui/NavButton.jsx"

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}

export default function Home() {
  const { data: session } = useSession()

  if (session) {    
      return (
        <MainLayout>
          <div className="flex flex-col justify-evenly items-center h-80">
            <NavButton page='/workout/NewWorkout' text='Start New Workout!'></NavButton>
            <NavButton page='/routine/viewRoutines' text='View Your Routines!'></NavButton>
            <NavButton page='/excersize/viewExcersizes' text='View Your Excersizes!'></NavButton>
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
 