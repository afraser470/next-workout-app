export const siteTitle = 'middle ware demo';

export default function MainLayout({ children }) {
    return (
        <div className="flex flex-col h-full text-gray-200">
            <header className="flex justify-center border-b-2 border-gray-200 mb-24">
                <div className="container p-2 flex justify-between ">
                    <div>
                        Next Workout
                    </div>
                    <div>
                        Account
                    </div>
                </div>
            </header>
            <div className="flex justify-center">
                <div className="container p-2">
                    {children}
                </div>
            </div>
        </div>
    )
};