export default function RoutineForm(){
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