from flask import Flask

from backend.config import Config

from backend.app.routes.main_routes import main_bp
from backend.app.routes.student_routes import student_bp


def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)

    app.register_blueprint(main_bp)

    app.register_blueprint(student_bp)

    return app