import { Header } from "../../components/Header";
import { LayoutProps } from "./interface";
import {AddNewVault} from "../index";
import * as React from "react";

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            <AddNewVault />
        </div>
    )
}

export default Layout;