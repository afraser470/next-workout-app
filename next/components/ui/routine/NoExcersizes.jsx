import NavButton from "../NavButton";

export default function NoExcersizes(){
    return(
        <div className="flex flex-col items-center w-1/2 gap-6">
            <div className="text-2xl">Please Add Some Excersizes First!</div>
            <NavButton page="/excersize/newExcersize" text="Add Excersizes"/>
        </div>
    )

}