import MainLayout from "../../components/layouts/MainLayout";
import NavButton from "../../components/ui/NavButton";
import Complete from "../../components/ui/workout/Complete";

export default function CompletePage(){
    return(
        <MainLayout>
            <div className="flex justify-center">
                <Complete/>
            </div>
        </MainLayout>
    )
}