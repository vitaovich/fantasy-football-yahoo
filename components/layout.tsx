import React from "react";
import Header from "./header";
import Footer from "./footer";

const Layout: React.FC<{ children?: React.ReactNode }> = (props) => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-1">
                    {props.children}
                </div>
                <Footer />
            </div>

        </>
    );
}
export default Layout;