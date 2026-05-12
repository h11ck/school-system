import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import StudentsPage from "./pages/StudentsPage";
import ClassesPage from "./pages/ClassesPage";


function App() {

    return (

        <BrowserRouter>

            <div>

                <nav>

                    <Link to="/">
                        Students
                    </Link>

                    {" | "}

                    <Link to="/classes">
                        Classes
                    </Link>

                </nav>

                <hr />

                <Routes>

                    <Route
                        path="/"
                        element={<StudentsPage />}
                    />

                    <Route
                        path="/students"
                        element={<StudentsPage />}
                    />

                    <Route
                        path="/classes"
                        element={<ClassesPage />}
                    />

                </Routes>

            </div>

        </BrowserRouter>

    );
}

export default App;