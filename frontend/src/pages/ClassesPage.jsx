import { useEffect, useState } from "react";

import {

    getClasses,
    createClass,
    updateClass,
    deleteClass

} from "../services/api";

import ClassForm from "../components/ClassForm";
import ClassList from "../components/ClassList";
import Alert from "../components/Alert";
import useApiState from "../hooks/useApiState";

function ClassesPage() {

    const [classes, setClasses] = useState([]);

    const [name, setName] = useState("");

    const [editingClassId, setEditingClassId] = useState(null);

    const {

        loading,

        setLoading,

        error,

        setError,

        clearError

    } = useApiState();



    async function loadClasses() {

        const data = await getClasses();

        setClasses(data);

    }



    useEffect(() => {

        loadClasses();

    }, []);



    async function handleSubmit(event) {

        event.preventDefault();

        try {

            setLoading(true);

            clearError("");

            if (editingClassId) {

                await updateClass(

                    editingClassId,

                    {

                        name: name

                    }

                );

            }

            else {

                await createClass({

                    name: name

                });

            }

            await loadClasses();

            setEditingClassId(null);

            setName("");

        }

        catch (error) {

            clearError(error.message);

        }

        finally {

            setLoading(false);

        }

    }



    function handleEdit(schoolClass) {

        setEditingClassId(

            schoolClass.id

        );

        setName(

            schoolClass.name

        );

    }



    async function handleDelete(classId) {

        const confirmed = window.confirm(

            "Are you sure you want to delete this class?"

        );

        if (!confirmed) {

            return;

        }

        try {

            setLoading(true);

            clearError("");

            await deleteClass(classId);

            await loadClasses();

        }

        catch (error) {

            clearError(error.message);

        }

        finally {

            setLoading(false);

        }

    }



    return (

        <div>

            <h1>

                Classes

            </h1>

            <Alert

                message={error}

            />

            <ClassForm

                loading={loading}

                name={name}

                setName={setName}

                handleSubmit={handleSubmit}

                editingClassId={editingClassId}

            />

            <ClassList

                classes={classes}

                handleEdit={handleEdit}

                handleDelete={handleDelete}

            />

        </div>

    );

}

export default ClassesPage;