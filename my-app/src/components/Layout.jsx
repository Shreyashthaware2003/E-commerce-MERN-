import { Outlet } from "react-router-dom";
import Header from "./Header";// Ensure correct import path

function Layout() {
    return (
        <>
            <Header /> {/* This ensures the header is always visible */}
            <Outlet /> {/* This will render the page content based on the route */}
        </>
    );
}

export default Layout;
