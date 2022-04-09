import NavButton from "../NavButton"
import RoutineCard from "./RoutineCard"

export default function AllRoutines({data}){
    return(
        <div className="flex flex-col">
            <div className="pb-6 border-b flex justify-between gap-6">
                <NavButton page="/" text="Home"></NavButton>
                <div className="text-2xl">Your Routines</div>
                <NavButton page="/routine/newRoutine" text="Add New Routine!"></NavButton>
            </div>
            <div className="flex justify-center flex-wrap gap-6 mt-6">
            {data.map((routine,key)=>{
                return(
                    <RoutineCard key={key} data={routine}/>
                    )
                })}
            </div>
        </div>
    )
}