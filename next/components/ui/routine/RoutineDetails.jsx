import NavButton from "../NavButton"
import FormButton from "../FormButton"

export default function RoutineDetails({action,data}){
    return(
        <div>
            <div className="pb-6 border-b flex justify-between gap-6">
                <NavButton page="/routine/viewRoutines" text="Back"></NavButton>
                <div className="flex gap-6">
                    <NavButton page="/routine/edit/[id]" text="Edit This Routine!" query={`/routine/edit/${data[0]._id}`}></NavButton>
                    <FormButton text="Delete" action={action} type="delete"></FormButton>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="text-2xl mt-6 flex flex-col gap-6">
                    <div>
                        <div>{data[0].name}</div>
                    </div>
                    <div>
                        <div>{data[0].description}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}