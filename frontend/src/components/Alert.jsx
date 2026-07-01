import "./styles/alert.css";

function Alert({ message }) {

    if (!message) {

        return null;

    }

    return (

        <div className="alert">

            {message}

        </div>

    );
}

export default Alert;