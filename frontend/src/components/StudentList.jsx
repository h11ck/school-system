import "./styles/student-list.css";


function StudentList({

    students,

    handleDelete,

    handleEdit

}) {

    if (students.length === 0) {

        return (

            <div className="student-list">

                <div className="empty-message">

                    No students found.

                </div>

            </div>
        );
    }



    return (

        <div className="student-list">

            <table className="student-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Class</th>

                        <th>Actions</th>

                    </tr>

                </thead>



                <tbody>

                    {students.map((student) => (

                        <tr key={student.id}>

                            <td>
                                {student.id}
                            </td>

                            <td>
                                {student.name}
                            </td>

                            <td>
                                {student.class_name || "No class"}
                            </td>

            <td>


                <button
                    className="
                        action-button
                        edit-button
                    "

                    onClick={() =>
                        handleEdit(student)
                    }
                >

                    Edit

                </button>
                <button
                    className="action-button delete-button"
                    onClick={() => handleDelete(student.id)}
                >

                    Delete

                </button>

            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default StudentList;