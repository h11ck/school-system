function StudentForm({

    name,
    setName,

    classId,
    setClassId,

    classes,

    handleSubmit

}) {

    return (

        <div>

            <h2>Create Student</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Student name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <br />
                <br />

                <select
                    value={classId}
                    onChange={(event) => setClassId(event.target.value)}
                >

                    <option value="">
                        Select a class
                    </option>

                    {classes.map((schoolClass) => (

                        <option
                            key={schoolClass.id}
                            value={schoolClass.id}
                        >

                            {schoolClass.name}

                        </option>

                    ))}

                </select>

                <br />
                <br />

                <button type="submit">
                    Create Student
                </button>

            </form>

        </div>

    );
}

export default StudentForm;