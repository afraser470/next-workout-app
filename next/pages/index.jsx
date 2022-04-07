import NavButton from "../components/ui/NavButton.jsx"
import MainLayout from "../components/layouts/MainLayout.jsx"

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col justify-evenly items-center h-80">
        <NavButton page='' text='Start New Workout!'></NavButton>
        <NavButton page='' text='Create New Routine!'></NavButton>
        <NavButton page='/excersize/viewExcersizes' text='View Your Excersizes!'></NavButton>
      </div>
    </MainLayout>
  )
}
