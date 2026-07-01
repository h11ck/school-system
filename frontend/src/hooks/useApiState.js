import { useState } from "react";

function useApiState() {

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    function clearError() {

        setError("");

    }

    return {

        loading,

        setLoading,

        error,

        setError,

        clearError

    };

}

export default useApiState;