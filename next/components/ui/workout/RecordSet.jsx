import { useState } from "react";
import { useRouter } from 'next/router';    

export default function RecordSet({index, excersize, apiPath, reqType, sets, setSets}){
    const router = useRouter();
    const [weigth,setWeigth] = useState(0);
    const [reps,setReps] = useState(0);

    function handleChange(e){
        switch(e.target.id){
            case "weight":
                setWeigth(e.target.value);
                break;
            case "reps":
                setReps(e.target.value);
                break;
        }
    }

    async function handleSubmit(){
        const d = new Date();
        const res = await fetch(apiPath, {
            method: reqType,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id:excersize._id,
                weight:weigth,
                reps:reps,
                date:d.toDateString()
            }),
        });
        const data = await res.json();
        if(data.success == true){
            const values = [...sets];
            values.splice(index,1);
            setSets(values);
            setWeigth(0);
            setReps(0);
            if(sets.length == 1){
                router.push("/workout/complete");

            }
        }else{
            console.log(data.result);
        }
    }

    return(
        <div className="border-2 rounded-md p-2 w- mb-4">
            <div className="text-2xl">{excersize.name} - <a href={excersize.url} className="text-lg transition hover:text-sky-500" target="_blank" rel="noopener noreferrer">Instructions</a></div>
            <div className="flex justify-center gap-4 mt-2">
                <div className="flex flex-col">
                    <label>Weight(Kg):</label>
                    <input id="weight" onChange={handleChange} type="number" value={weigth} min="0" className="bg-white/0 border-2 rounded-md p-1 w-full"/>
                </div>
                <div className="flex flex-col">
                    <label>Reps:</label>
                    <input id="reps" onChange={handleChange} type="number" value={reps} min="0" className="bg-white/0 border-2 rounded-md p-1 w-full"/>
                </div>
                <div className="flex items-end">
                    <div onClick={handleSubmit} className="transition bg-white/0 border-2 rounded-md p-1 h-p-36 shadow-lg hover:bg-sky-500 hover:border-sky-500 hover:text-white hover:shadow-sky-500/50">Save Set!</div>
                </div>
            </div>
        </div>
    )
}