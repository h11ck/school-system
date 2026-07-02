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
import Alert from "../components/Alert";
import useApiState from "../hooks/useApiState";

import "./styles/students-page.css";


function StudentsPage() {

    const [students, setStudents] = useState([]);

    const [classes, setClasses] = useState([]);

    const [name, setName] = useState("");

    const [classId, setClassId] = useState("");

    const [editingStudentId, setEditingStudentId] = useState(null);

    const [search, setSearch] = useState("");


    const {

        loading,

        setLoading,

        error,

        setError,

        clearError

    } = useApiState();

    async function loadStudents(search = "") {

        try {

            const data = await getStudents(search);

            setStudents(data);

        }

        catch (error) {

            setError(error.message);

        }

    }


    async function loadClasses() {

        try {

            const data = await getClasses();

            setClasses(data);

        }

        catch (error) {

            setError(error.message);

        }

    }



    useEffect(() => {

        async function fetchData() {

            clearError();

            await Promise.all([

                loadStudents(),

                loadClasses()

            ]);

        }

        fetchData();

    }, []);




    async function handleSubmit(event) {

        event.preventDefault();

        try {

            setLoading(true);

            clearError();

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

            setSearch("");

        }


        
        catch (error) {

            setError(error.message);

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

            clearError();

            await deleteStudent(studentId);

            await loadStudents();

        } 
        
        catch (error) {

            setError(error.message);

        }
        
        finally {

            setLoading(false);
        }
    }

    function handleEdit(student) {

        setEditingStudentId(student.id);

        setName(student.name);

        setClassId(String(student.class_id));
    }

    return (

        <div className="students-page">

            <h1 className="page-title">
                Students
            </h1>

    <Alert

        message={error}

    />

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

            <input

                type="text"

                placeholder="Search student..."

                value={search}

                onChange={(event) => {

                    const value = event.target.value;

                    setSearch(value);

                    loadStudents(value);

                }}

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