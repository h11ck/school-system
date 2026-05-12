from flask import (
    Blueprint,
    jsonify,
    request
)

from backend.app.services.class_service import (
    get_all_classes,
    create_class
)

class_bp = Blueprint(
    "classes",
    __name__
)


@class_bp.route("/api/classes", methods=["GET"])
def get_classes():

    classes = get_all_classes()

    return jsonify(classes)


@class_bp.route("/api/classes", methods=["POST"])
def add_class():

    data = request.get_json()

    name = data.get("name")

    if not name:

        return jsonify({
            "error": "Class name is required"
        }), 400

    class_id = create_class(name)

    return jsonify({
        "message": "Class created successfully",
        "class_id": class_id
    }), 201