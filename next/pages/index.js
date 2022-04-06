import NavButton from "../components/ui/NavButton"
import MainLayout from "../components/layouts/MainLayout.js"

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center ">
        <NavButton page='' text='Start New Workout!'></NavButton>
        <NavButton page='' text='Create New Routine!'></NavButton>
        <NavButton page='/excersize/newExcersize' text='Add New Excersize!'></NavButton>
      </div>
    </MainLayout>
  )
}
