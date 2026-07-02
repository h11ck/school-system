import "./styles/student-form.css";
import Button from "./Button";

function StudentForm({

    loading,

    editingStudentId,

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

            maxLength={100}

            required

            onChange={(event) =>

                setName(event.target.value)

            }

        />



            <select

                required

                value={classId}

                onChange={(event) =>
                    setClassId(Number(event.target.value))
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



            <Button

                type="submit"

                loading={loading}

            >

                {editingStudentId

                    ? "Update Student"

                    : "Add Student"

                }

            </Button>

        </form>
    );
}

export default StudentForm;