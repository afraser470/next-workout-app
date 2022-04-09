import NavButton from "../NavButton";

export default function NoRoutines(){
    return(
        <div className="flex flex-col items-center w-1/2 gap-6">
            <div className="text-2xl">Please Add Some Routines First!</div>
            <NavButton page="/routine/newRoutine" text="Add Routine"/>
        </div>
    )

}