import "./styles/class-list.css";

function ClassList({

    classes,

    handleEdit,

    handleDelete

}) {

    if (classes.length === 0) {

        return (

            <div className="class-list">

                No classes found.

            </div>

        );
    }

    return (

        <table className="class-table">

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Name</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {classes.map((schoolClass) => (

                    <tr key={schoolClass.id}>

                        <td>{schoolClass.id}</td>

                        <td>{schoolClass.name}</td>

                        <td>

                            <button
                                className="action-button edit-button"
                                onClick={() => handleEdit(schoolClass)}
                            >

                                Edit

                            </button>

                            <button
                                className="action-button delete-button"
                                onClick={() => handleDelete(schoolClass.id)}
                            >

                                Delete

                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );
}

export default ClassList;