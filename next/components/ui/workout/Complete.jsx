import NavButton from "../NavButton";

export default function Complete(){
    return(
        <div className="flex flex-col items-center w-1/2 gap-6">
            <div className="text-2xl">Congrats You Finished Your Routine!</div>
            <NavButton page="/" text="Back to Home"/>
        </div>
    )

}