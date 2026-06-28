import { useEffect, useState } from "react";

import {
    getStudents,
    createStudent,
    getClasses,
    deleteStudent,
    updateStudent
    
} from "../services/api";

import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

import "./styles/students-page.css";


function StudentsPage() {

    const [students, setStudents] = useState([]);

    const [classes, setClasses] = useState([]);

    const [name, setName] = useState("");

    const [classId, setClassId] = useState("");

    const [editingStudentId, setEditingStudentId] = useState(null);

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

            if (editingStudentId) {

                await updateStudent(

                    editingStudentId,

                    {
                        name: name,
                        class_id: classId
                    }

                );

            } else {
                
                await createStudent({

                    name: name,
                    class_id: classId

                });

            }

            await loadStudents();

            setEditingStudentId(null);

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

    function handleEdit(student) {

        setEditingStudentId(student.id);

        setName(student.name);

        setClassId(student.class_id);
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

            {editingStudentId && (

                <h3>

                    Editing student #{editingStudentId}

                </h3>

            )}
            
            <StudentForm

                loading={loading}

                name={name}
                setName={setName}

                classId={classId}
                setClassId={setClassId}

                classes={classes}

                handleSubmit={handleSubmit}

                editingStudentId={editingStudentId}

            />

            <StudentList
                students={students}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />

        </div>
    );
}

export default StudentsPage;