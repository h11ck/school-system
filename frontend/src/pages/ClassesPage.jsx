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
import "./styles/classes-page.css";

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

        try {

            const data = await getClasses();

            setClasses(data);

        }

        catch (error) {

            setError(error.message);

        }

    }


    useEffect(() => {

        clearError();

        loadClasses();

    }, []);


    async function handleSubmit(event) {

        event.preventDefault();

        try {

            setLoading(true);

            clearError();

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

            setError(error.message);

        }

        finally {

            setLoading(false);

        }

    }



    function handleEdit(schoolClass) {

        clearError();

        setEditingClassId(schoolClass.id);

        setName(schoolClass.name);

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

            clearError();

            await deleteClass(classId);

            await loadClasses();

            setEditingClassId(null);

            setName("");

        }

        catch (error) {

            setError(error.message);

        }

        finally {

            setLoading(false);

        }

    }



    return (

        <div className="page-title">

            <h1>

                Classes

            </h1>

            <Alert

                message={error}

            />

            {editingClassId && (

                <h3>

                    Editing class #{editingClassId}

                </h3>

            )}

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