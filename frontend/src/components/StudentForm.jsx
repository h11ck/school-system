import "./styles/student-form.css";


function StudentForm({

    loading,

    name,

    setName,

    classId,

    setClassId,

    classes,

    handleSubmit,

}) {

    return (

        <form
            className="student-form"
            onSubmit={handleSubmit}
        >

            <input

                type="text"

                placeholder="Student name"

                value={name}

                onChange={(event) =>
                    setName(event.target.value)
                }
            />



            <select

                value={classId}

                onChange={(event) =>
                    setClassId(event.target.value)
                }
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



            <button
                type="submit"

                disabled={loading}
            >

                {loading
                    ? "Loading..."
                    : "Add Student"
                }

            </button>

        </form>
    );
}

export default StudentForm;