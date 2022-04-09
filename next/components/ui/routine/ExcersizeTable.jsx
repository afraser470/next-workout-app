export default function ExcersizeTable({data}){
    return(
        <div className="relative overflow-x-auto sm:rounded-lg mt-6">
            <table className="w-full text-sm text-left mt-6">
                <thead className="text-xs uppercase border-b">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Excersize name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sets
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data[0].excersizes.map((excersize,key)=>{
                        return(        
                            <tr key={key} className="border-b">
                                <th scope="row" className="px-6 py-4 font-medium">
                                    {excersize.name}
                                </th>
                                <td className="px-6 py-4">
                                    {excersize.sets}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}