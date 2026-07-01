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

            <button
                type="submit"
                disabled={loading}
            >

                {loading

                    ? "Loading..."

                    : editingClassId

                        ? "Update Class"

                        : "Add Class"

                }

            </button>

        </form>

    );
}

export default ClassForm;