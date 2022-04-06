export const siteTitle = 'middle ware demo';

export default function MainLayout({ children }) {
    return (
        <div className="flex flex-col justify-between h-full text-gray-200">
            <header className="flex justify-center border-b-2 border-gray-200">
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
            <footer className="text-center lg:text-left border-t-2 border-gray-200">
                <div className="text-center p-4">
                    Developed By: &nbsp;
                    <a className="transition-all hover:text-cyan-400" href="https://alexfraser.io">Alex Fraser</a>
                </div>
            </footer>
        </div>
    )
};