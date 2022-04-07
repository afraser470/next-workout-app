import MainLayout from "../../components/layouts/MainLayout";

export async function getServerSideProps(){

    return {
        props: {data:data}
    }
}

export default function NewRoutine({data}){
    return(
        <MainLayout>
            <div className="flex justify-center">
                <RoutineForm apiPath='/api/routine/newRoutine' reqType="POST"/>
            </div>
        </MainLayout>
    )
}