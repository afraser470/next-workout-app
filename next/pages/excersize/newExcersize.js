import MainLayout from "../../components/layouts/MainLayout";
import NewExcersizeForm from "../../components/forms/NewExcersizeForm.jsx";

export default function NewExcersize(){
    return(
        <MainLayout>
            <div className="flex justify-center">
                <NewExcersizeForm apiPath=''></NewExcersizeForm>
            </div>
        </MainLayout>
    )
}