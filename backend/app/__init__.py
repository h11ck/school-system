from flask import Flask

from flask_cors import CORS

from backend.config import Config

from backend.app.routes.main_routes import main_bp
from backend.app.routes.student_routes import student_bp
from backend.app.routes.class_routes import class_bp


def create_app():

    app = Flask(__name__)

    CORS(app)

    app.config.from_object(Config)

    app.register_blueprint(main_bp)
    app.register_blueprint(student_bp)
    app.register_blueprint(class_bp)

    return app