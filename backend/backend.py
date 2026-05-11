class Config:

    SQLALCHEMY_DATABASE_URI = (
        "postgresql://school_user:123456@localhost/school_system"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRET_KEY = "development-secret-key"