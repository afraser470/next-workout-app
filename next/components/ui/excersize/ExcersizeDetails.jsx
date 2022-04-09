import NavButton from "../NavButton"
import FormButton from "../FormButton"

export default function ExcersizeDetails({action,data,pb}){
    return(
        <div>
            <div className="pb-6 border-b flex justify-between gap-6">
                <NavButton page="/excersize/viewExcersizes" text="Back"></NavButton>
                <div className="flex gap-6">
                    <NavButton page="/excersize/edit/[id]" text="Edit This Excersize!" query={`/excersize/edit/${data[0]._id}`}></NavButton>
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
                    <div>
                        <a className="text-base transition hover:text-sky-500" href={data[0].url} target="_blank" rel="noopener noreferrer">{data[0].url}</a>
                    </div>
                </div>
                <div className="text-2xl mt-6 flex flex-col gap-6 mr-6">
                    <div>
                        <div>Personnal Best:</div>
                        <div className={pb != ""?"mt-3 text-yellow-400":"text-sm"}>{pb != ""?pb:"No Attemp Recorded!"}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}