from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# ---------------- CLASSES ----------------
class SchoolClass(db.Model):
    __tablename__ = "classes"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

# ---------------- STUDENTS ----------------
class Student(db.Model):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    class_id = db.Column(
        db.Integer,
        db.ForeignKey("classes.id")
    )

# ---------------- ATTENDANCE ----------------
class Attendance(db.Model):
    __tablename__ = "attendance"

    id = db.Column(db.Integer, primary_key=True)

    student_id = db.Column(
        db.Integer,
        db.ForeignKey("students.id")
    )

    date = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), nullable=False)