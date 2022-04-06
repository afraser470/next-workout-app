export default function FormButton({text,action}){
    return(
        <button onClick={action} className="transition border-2 shadow-lg rounded-md w-48 h-12 rounded-lg flex items-center justify-center hover:bg-sky-500 hover:border-sky-500 hover:text-white hover:shadow-sky-500/50 text-lg">
        {text}
        </button>
    )
}