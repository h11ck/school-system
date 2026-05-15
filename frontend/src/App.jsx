import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Layout from "./components/Layout";

import StudentsPage from "./pages/StudentsPage";
import ClassesPage from "./pages/ClassesPage";


function App() {

    return (

        <BrowserRouter>

            <Layout>

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

            </Layout>

        </BrowserRouter>

    );
}

export default App;