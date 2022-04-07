import MainLayout from "../../components/layouts/MainLayout.jsx";
import ExcersizeForm from "../../components/forms/ExcersizeForm.jsx";

export default function NewExcersize(){
    return(
        <MainLayout>
            <div className="flex justify-center">
                <ExcersizeForm apiPath='/api/excersize/newExcersize' reqType="POST"/>
            </div>
        </MainLayout>
    )
}