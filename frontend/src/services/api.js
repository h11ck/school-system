const API_URL = "http://127.0.0.1:5000/api";



export async function getStudents() {

    const response = await fetch(
        `${API_URL}/students`
    );

    return response.json();
}



export async function createStudent(studentData) {

    const response = await fetch(
        `${API_URL}/students`,
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(studentData)

        }
    );

    return response.json();
}



export async function getClasses() {

    const response = await fetch(
        `${API_URL}/classes`
    );

    return response.json();
}

export async function deleteStudent(studentId) {

    const response = await fetch(

        `http://127.0.0.1:5000/api/students/${studentId}`,

        {
            method: "DELETE"
        }
    );

    return response.json();
}