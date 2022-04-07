export default function HistoryTable({data}){
    return(
        <div className="relative overflow-x-auto sm:rounded-lg mt-6">
            <table className="w-full text-sm text-left mt-6">
                <thead className="text-xs uppercase border-b">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Excersize name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Weight
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Reps
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data[0].history.map((set,key)=>{
                        return(        
                            <tr key={key} className="border-b">
                                <th scope="row" className="px-6 py-4 font-medium">
                                    {data[0].name}
                                </th>
                                <td className="px-6 py-4">
                                    {set.weight}
                                </td>
                                <td className="px-6 py-4">
                                    {set.reps}
                                </td>
                                <td className="px-6 py-4">
                                    {set.date}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}