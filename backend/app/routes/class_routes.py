from flask import (
    Blueprint,
    jsonify,
    request
)

from backend.app.services.class_service import (
    get_all_classes,
    create_class,
    update_class,
    delete_class_by_id
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

    result = create_class(name)

    if isinstance(result, dict) and "error" in result:

        return jsonify(result), 400

    return jsonify({

        "message": "Class created successfully",

        "class_id": result

    }), 201
    
@class_bp.route("/api/classes/<int:class_id>", methods=["PUT"])
def edit_class(class_id):

    data = request.get_json()

    name = data.get("name")

    result = update_class(
        class_id,
        name
    )

    if isinstance(result, dict) and "error" in result:

        return jsonify(result), 400

    return jsonify(result), 200

@class_bp.route("/api/classes/<int:class_id>", methods=["DELETE"])
def delete_class(class_id):

    delete_class_by_id(class_id)

    return jsonify({

        "message": "Class deleted successfully"

    }), 200