import { Outlet } from "react-router-dom";

import { Header } from "../../components/Header";

const Layout = () => {
    return (
        <div>
            <Header />

            <div className="p-10 w-full bg-sand">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;