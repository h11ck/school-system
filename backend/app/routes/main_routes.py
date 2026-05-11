from flask import Blueprint

main_bp = Blueprint(
    "main",
    __name__
)


@main_bp.route("/")
def home():

    return """
    <h1>School System API</h1>

    <p>Backend is running successfully.</p>
    """