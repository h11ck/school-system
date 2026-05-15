import { useEffect, useState } from "react";

import {
    getStudents,
    createStudent,
    getClasses,
    deleteStudent
} from "../services/api";

import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

import "./styles/students-page.css";


function StudentsPage() {

    const [students, setStudents] = useState([]);

    const [classes, setClasses] = useState([]);

    const [name, setName] = useState("");

    const [classId, setClassId] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");



    async function loadStudents() {

        const data = await getStudents();

        setStudents(data);
    }



    async function loadClasses() {

        const data = await getClasses();

        setClasses(data);
    }



    useEffect(() => {

        async function fetchData() {

            await loadStudents();

            await loadClasses();
        }

        fetchData();

    }, []);




    async function handleSubmit(event) {

        event.preventDefault();

        try {

            setLoading(true);

            setError("");

            await createStudent({

                name: name,
                class_id: classId

            });

            await loadStudents();

            setName("");

            setClassId("");

        } 
        
        catch {

            setError("Failed to create student.");

        } 
        
        finally {

            setLoading(false);
        }
    }



    async function handleDelete(studentId) {

        const confirmed = window.confirm(

            "Are you sure you want to delete this student?"
        );

        if (!confirmed) {

            return;
        }

        try {

            setLoading(true);

            setError("");

            await deleteStudent(studentId);

            await loadStudents();

        } 
        
        catch {

            setError("Failed to delete student.");

        } 
        
        finally {

            setLoading(false);
        }
    }



    return (

        <div className="students-page">

            <h1 className="page-title">
                Students
            </h1>

    {error && (

        <div className="error-message">

            {error}

        </div>
    )}

            <StudentForm

                loading={loading}

                name={name}
                setName={setName}

                classId={classId}
                setClassId={setClassId}

                classes={classes}

                handleSubmit={handleSubmit}


            />

            <StudentList
                students={students}
                handleDelete={handleDelete}
            />

        </div>
    );
}

export default StudentsPage;