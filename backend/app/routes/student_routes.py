from flask import (
    Blueprint,
    jsonify,
    request
)

from backend.app.services.student_service import (
    get_all_students,
    create_student,
    delete_student_by_id
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

    result = create_student(
        name,
        class_id
    )
    
    if "error" in result:

        return jsonify(result), 400
    

    return jsonify({

        "message": "Student created successfully",

        "student_id": result

    }), 201
    
    
@student_bp.route("/api/students/<int:student_id>", methods=["DELETE"])
def delete_student(student_id):

    delete_student_by_id(student_id)

    return jsonify({

        "message": "Student deleted successfully"

    }), 200