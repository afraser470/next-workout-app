import { useState } from "react"
import NavButton from "../NavButton"

export default function RoutineSelect({data}){

    const [id,setID] = useState(data[0]._id);

    function RoutineSelect(e){
        setID(e.target.value);
    }

    return(
        <div className="flex flex-col gap-8 Sjustify-center items-center">
            <div className="text-2xl">Please Select A Routine!</div>
            <div className="mt-4 mb-4 w-1/4">
                <select className="w-full h-12 bg-white/0 border-2 rounded-md text-center" onChange={RoutineSelect}>
                    {data.map((routine,key)=>{
                        return(
                            <option value={routine._id} key={key} className="text-black">{routine.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className="flex gap-4">
                <NavButton page="/workout/record/[id]" query={`/workout/record/${id}`} text="Start Your Workout!"></NavButton>
                <NavButton page="/" text="Cancel"></NavButton>
            </div>
        </div>
    )
}