const API_URL = "http://127.0.0.1:5000/api";



export async function getStudents(search = "") {

    const response = await fetch(

        `${API_URL}/students?search=${encodeURIComponent(search)}`

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

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.error);

    }  

    return data;
}



export async function getClasses() {

    const response = await fetch(
        `${API_URL}/classes`
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.error);

    }  

    return data;
}

export async function deleteStudent(studentId) {

    const response = await fetch(

        `${API_URL}/students/${studentId}`,

        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.error);

    }  

    return data;
}


export async function updateStudent(studentId, studentData) {

    const response = await fetch(

        `${API_URL}/students/${studentId}`,

        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(studentData)
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.error);

    }  

    return data;
}

export async function createClass(classData) {

    const response = await fetch(

        `${API_URL}/classes`,

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(classData)

        }

    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.error);

    }  

    return data;
}


export async function updateClass(classId, classData) {

    const response = await fetch(

        `${API_URL}/classes/${classId}`,

        {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(classData)

        }

    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.error);

    }  

    return data;
}


export async function deleteClass(classId) {

    const response = await fetch(

        `${API_URL}/classes/${classId}`,

        {

            method: "DELETE"

        }

    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.error);

    }  

    return data;
}