import Navbar from "./Navbar";

import "./styles/layout.css";


function Layout({ children }) {

    return (

        <div>

            <Navbar />

            <main className="layout-main">

                {children}

            </main>

        </div>

    );
}

export default Layout;