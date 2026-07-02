import "./styles/class-form.css";

function ClassForm({

    loading,

    name,

    setName,

    handleSubmit,

    editingClassId

}) {

    return (

        <form
            className="class-form"
            onSubmit={handleSubmit}
        >

            <input

                type="text"

                placeholder="Class name"

                value={name}

                onChange={(event) =>
                    setName(event.target.value)
                }

            />

            <Button

                type="submit"

                loading={loading}

            >

                {editingClassId

                    ? "Update Class"

                    : "Add Class"

                }

            </Button>

        </form>

    );
}

export default ClassForm;