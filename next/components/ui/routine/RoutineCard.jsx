import Link from 'next/link';

export default function RoutineCard({data}){
    return(
        <Link href="/routine/[id]" as={`/routine/${data._id}`}>
            <div className="text-lg border-2 rounded-md h-44 w-80 shadow-lg p-3 transition hover:border-sky-500 hover:shadow-sky-500 flex flex-col">
                <div className="border-b">{data.name}</div>
                {data.description !=""?<div className="mt-4">{data.description}</div>:""}
            </div>
        </Link>
    )
}