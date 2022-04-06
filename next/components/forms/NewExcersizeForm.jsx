import { useState } from "react";
import FormButton from "../ui/FormButton";
import NavButton from "../ui/NavButton";
import { useRouter } from 'next/router'

export default function NewExcersizeForm({apiPath}){
    const [excersizeName, setExcersizeName] = useState("");
    const [excersizeURL, setExcersizeURL] = useState("");
    const [excersizeDescription, setExcersizeDescription] = useState("");
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
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: excersizeName,
                    url:excersizeURL,
                    description:excersizeDescription
                }),
            });
            const data = await res.json();
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
                <input id='name' type="text" value={excersizeName} onChange={handleChange} className={warning == ""?"bg-white/0 border-2 rounded-md w-full py-2 px-3 mb-3 shadow-lg focus:outline-none focus:shadow-outline":"bg-white/0 border-2 border-rose-500 rounded-md w-full py-2 px-3 mb-3 shadow-lg focus:outline-none focus:shadow-outline"}/>
                <div className="text-sm text-rose-500">{warning}</div>
            </div>
            <div>
                <label>Excersize Link:</label>
                <input id='url' type="text" value={excersizeURL} onChange={handleChange} className="bg-white/0 border-2 rounded-md w-full py-2 px-3 mb-3 shadow-lg focus:outline-none focus:shadow-outline"/>
            </div>
            <div>
                <label>Excersize Description:</label>
                <input id='description' type="text" value={excersizeDescription} onChange={handleChange} className="bg-white/0 border-2 rounded-md w-full py-2 px-3 mb-3 shadow-lg focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="flex items-center justify-between">
                <FormButton text="Add Excersize" action={handleSubmit}></FormButton>
                <NavButton page='/'text='Cancel'></NavButton>
            </div>
        </div>
    )
} 