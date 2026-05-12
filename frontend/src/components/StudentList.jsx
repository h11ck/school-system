function StudentList({ students }) {

    return (

        <div>

            <h2>Students</h2>

            {students.map((student) => (

                <div key={student.id}>

                    <p>
                        {student.id} - {student.name}
                    </p>

                </div>

            ))}

        </div>

    );
}

export default StudentList;