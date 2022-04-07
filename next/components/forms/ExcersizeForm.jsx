import { useState } from "react";
import FormButton from "../ui/FormButton.jsx";
import NavButton from "../ui/NavButton.jsx";
import { useRouter } from 'next/router'

export default function ExcersizeForm({apiPath,reqType,data}){
    const router = useRouter()
    const [excersizeId, setExcersizeId] = useState(data == undefined?"":data[0]._id);
    const [excersizeName, setExcersizeName] = useState(data == undefined?"":data[0].name);
    const [excersizeURL, setExcersizeURL] = useState(data == undefined?"":data[0].url);
    const [excersizeDescription, setExcersizeDescription] = useState(data == undefined?"":data[0].description);
    const [warning, setWarning] = useState("");

    function handleChange(e){
        switch(e.target.id){
            case "name":
                const newName = e.target.value;
                setExcersizeName(newName);
                break;
            case "url":
                const newURL = e.target.value;
                setExcersizeURL(newURL);
                break;
            case "description":
                const newDescription = e.target.value;
                setExcersizeDescription(newDescription);
                break;
        }
    }
    async function handleSubmit(e){
        if(excersizeName != ""){
            const res = await fetch(apiPath, {
                method: reqType,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id:excersizeId,
                    name: excersizeName,
                    url:excersizeURL,
                    description:excersizeDescription
                }),
            });
            const data = await res.json();
            if(data.success == true){
                router.push(excersizeId ==""?'/excersize/viewExcersizes':"/excersize/"+excersizeId);
            }else{
                console.log(data.result);
            }
        }else{
            if(excersizeName == ""){
                setWarning("Excersize Name Cannot Be Empty!");
            }else if(excersizeName !="" ){
                setWarning("");
            }
        }
        
    }

    return(
        <div className="w-1/2 flex flex-col text-lg">
            <div>
                <label>Excersize Name:</label>
                <input maxLength="50" id='name' type="text" value={excersizeName == null?"":excersizeName} onChange={handleChange} className={warning == ""?"bg-white/0 border-2 rounded-md w-full py-2 px-3 mb-3 shadow-lg focus:outline-none focus:shadow-outline":"bg-white/0 border-2 border-rose-500 rounded-md w-full py-2 px-3 mb-3 shadow-lg focus:outline-none focus:shadow-outline"}/>
                <div className="text-sm text-rose-500">{warning}</div>
            </div>
            <div>
                <label>Excersize Link:</label>
                <input maxLength="100" id='url' type="text" value={excersizeURL == null?"":excersizeURL} onChange={handleChange} className="bg-white/0 border-2 rounded-md w-full py-2 px-3 mb-3 shadow-lg focus:outline-none focus:shadow-outline"/>
            </div>
            <div>
                <label>Excersize Description:</label>
                <textarea maxLength="200" id='description' type="text" value={excersizeDescription == null?"":excersizeDescription} onChange={handleChange} className="bg-white/0 border-2 rounded-md w-full py-2 px-3 mb-3 shadow-lg focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="flex items-center justify-between">
                <FormButton text={excersizeId ==""?"Add Excersize":"Update Excersize"} action={handleSubmit}></FormButton>
                <NavButton page={excersizeId ==""?'/excersize/viewExcersizes':"/excersize/"+excersizeId} text='Cancel'></NavButton>
            </div>
        </div>
    )
} 