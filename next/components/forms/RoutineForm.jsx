import { useState } from "react";
import FormButton from "../ui/FormButton.jsx";
import NavButton from "../ui/NavButton.jsx";
import { useRouter } from 'next/router'

export default function RoutineForm({apiPath,reqType,data,routine}){

    const router = useRouter()
    const [routineId, setroutineId] = useState(routine == undefined?"":routine[0]._id);
    const [routineName, setroutineName] = useState(routine == undefined?"":routine[0].name);
    const [excersizes, setExcersizes] = useState(routine == undefined?[{"key":0,"id":data[0]._id,"name":data[0].name,"sets":1}]:routine[0].excersizes);
    const [routineDescription, setRoutineDescription] = useState(routine == undefined?"":routine[0].description);
    const [warning, setWarning] = useState("");
    const [countWarning, setCountWarning] = useState("");
    
    function handleChange(e){
        switch(e.target.id){
            case "name":
                const newName = e.target.value;
                setroutineName(newName);
                break;
            case "description":
                const newDescription = e.target.value;
                setRoutineDescription(newDescription);
                break;
        }
    }

    function handleExcersizeCount(e){
        switch(e.target.id){
            case "add":
                setExcersizes([...excersizes, {"key":excersizes.length,"id":data[0]._id,"name":data[0].name,"sets":1}]);
                setCountWarning("");
                break;
            case "remove":
                if(excersizes.length == 1){
                    setCountWarning("Routine Must Have Atleast One Excersize!");
                }else{
                    const values = [...excersizes];
                    values.pop();
                    setExcersizes(values);
                }
                break;
        }
    }

    function handleExcersizeChange(e,index){
        const values = [...excersizes];
        const id = e.target.value;
        values[index].id = id;
        const excersize = data.find(e => e._id == id);
        values[index].name = excersize.name;
        setExcersizes(values);
    }

    function handleSetChange(e,index){
        const values = [...excersizes];
        values[index].sets = parseInt(e.target.value);
        setExcersizes(values);
    }

    async function handleSubmit(e){
        if(routineName != "" && excersizes.length != 0){
            const res = await fetch(apiPath, {
                method: reqType,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id:routineId,
                    name: routineName,
                    description:routineDescription,
                    excersizes:excersizes
                }),
            });
            const data = await res.json();
            if(data.success == true){
                router.push(routineId ==""?'/routine/viewRoutines':"/routine/"+routineId);
            }else{
                console.log(data.result);
            }
        }else{
            if(routineName == ""){
                setWarning("Routine Name Cannot Be Empty!");
            }else if(routineName !="" ){
                setWarning("");
            }

        }
    }
    


    return(
        <div className="w-1/2 flex flex-col text-lg">
            <div>
                <label>Routine Name:</label>
                <input maxLength="50" id='name' type="text" value={routineName == null?"":routineName} onChange={handleChange} className={warning == ""?"bg-white/0 border-2 rounded-md w-full py-2 px-3 mb-3 shadow-lg focus:outline-none focus:shadow-outline":"bg-white/0 border-2 border-rose-500 rounded-md w-full py-2 px-3 mb-3 shadow-lg focus:outline-none focus:shadow-outline"}/>
                <div className="text-sm text-rose-500">{warning}</div>
            </div>
            <div>
                <label>Routine Description:</label>
                <textarea maxLength="200" id='description' type="text" value={routineDescription == null?"":routineDescription} onChange={handleChange} className="bg-white/0 border-2 rounded-md w-full py-2 px-3 mb-3 shadow-lg focus:outline-none focus:shadow-outline"/>
            </div>
            <div>Routine Excersizes:</div>
            <div className="border-2 rounded-md p-2 mb-6">
                <div className="flex justify-between mb-2 mr-2">
                    <div>Excersize:</div>
                    <div>sets:</div>
                </div>
                <div className="overflow-y-auto max-h-80">

                    {excersizes.map((excersize,key)=>{
                        return(
                            <div key={key} className="flex justify-between mb-4 mr-2">
                                <select id="excersize" className="rounded-md w-1/3 bg-white/0 border-2" defaultValue={excersize.id} onChange={e => handleExcersizeChange(e,key)}>
                                    {data.map((x,key)=>{
                                        return(
                                            <option className="text-black" value={x._id} key={key}>{x.name}</option>
                                        )      
                                    })}
                                </select>
                                <input id="sets" className="rounded-md w-1/3 bg-white/0 border-2" type="number" min="1" defaultValue={excersize.sets} onChange={e => handleSetChange(e,key)}/>
                            </div>
                        )
                    })}
                    <div className="text-sm flex gap-6 justify-end mr-2">
                        <div onClick={handleExcersizeCount} id="add" className="transition border-2 rounded-md shadow-lg p-1 hover:bg-sky-500 hover:border-sky-500 hover:shadow-sky-500/50">Add Excersize</div>
                        <div onClick={handleExcersizeCount} id="remove" className="transition border-2 rounded-md shadow-lg p-1 hover:bg-rose-600 hover:border-rose-600 hover:shadow-rose-600/50">Remove Excersize</div>
                    </div>
                    <div className="text-sm text-rose-500 text-right">{countWarning}</div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <FormButton text={routineId ==""?"Add Routine":"Update Routine"} action={handleSubmit}></FormButton>
                <NavButton page={routineId ==""?'/routine/viewRoutines':"/routine/"+routineId} text='Cancel'></NavButton>
            </div>
        </div>
    )
}