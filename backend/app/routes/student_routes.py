from flask import (
    Blueprint,
    jsonify,
    request
)

from backend.app.services.student_service import (
    get_all_students,
    create_student
)

student_bp = Blueprint(
    "students",
    __name__
)


@student_bp.route("/api/students", methods=["GET"])
def get_students():

    students = get_all_students()

    return jsonify(students)


@student_bp.route("/api/students", methods=["POST"])
def add_student():

    data = request.get_json()

    name = data.get("name")
    class_id = data.get("class_id")

    if not name:

        return jsonify({
            "error": "Name is required"
        }), 400

    student_id = create_student(
        name,
        class_id
    )

    return jsonify({
        "message": "Student created successfully",
        "student_id": student_id
    }), 201