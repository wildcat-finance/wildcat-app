import { Outlet } from "react-router-dom";

import { Header } from "../../components/Header";
import { LayoutProps } from "./interface";

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout;