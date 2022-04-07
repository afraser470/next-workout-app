import ExcersizeCard from "./ExcersizeCard"
import NavButton from "../NavButton"

export default function AllExcersizes({data}){
    return(
        <div className="flex flex-col">
            <div className="pb-6 border-b flex justify-between gap-6">
                <NavButton page="/" text="Home"></NavButton>
                <NavButton page="/excersize/newExcersize" text="Add New Excersize!"></NavButton>
            </div>
            <div className="flex justify-center flex-wrap gap-6 mt-6">
            {data.map((excersize,key)=>{
                return(
                    <ExcersizeCard key={key} data={excersize}></ExcersizeCard>
                    )
                })}
            </div>
        </div>
    )
}