import { Link } from "react-router-dom";

import "./styles/navbar.css";


function Navbar() {

    return (

        <nav className="navbar">

            <Link to="/">
                Students
            </Link>

            <Link to="/classes">
                Classes
            </Link>

        </nav>

    );
}

export default Navbar;