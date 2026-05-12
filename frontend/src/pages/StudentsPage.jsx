import { useEffect, useState } from "react";

import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

import {
    getStudents,
    createStudent,
    getClasses
} from "../services/api";


function StudentsPage() {

    const [students, setStudents] = useState([]);

    const [classes, setClasses] = useState([]);

    const [name, setName] = useState("");

    const [classId, setClassId] = useState("");



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

        await createStudent({

            name: name,
            class_id: classId

        });

        loadStudents();

        setName("");
        setClassId("");
    }



    return (

        <div>

            <h1>Students</h1>

            <StudentForm

                name={name}
                setName={setName}

                classId={classId}
                setClassId={setClassId}

                classes={classes}

                handleSubmit={handleSubmit}

            />

            <StudentList
                students={students}
            />

        </div>

    );
}

export default StudentsPage;