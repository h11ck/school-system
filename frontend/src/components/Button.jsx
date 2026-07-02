function Button({

    type = "button",

    loading,

    children,

    disabled,

    onClick,

    className = ""

}) {

    return (

        <button

            type={type}

            disabled={loading || disabled}

            onClick={onClick}

            className={className}

        >

            {loading

                ? "Loading..."

                : children

            }

        </button>

    );

}

export default Button;