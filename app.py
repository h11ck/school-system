from models import db, Student, Attendance, SchoolClass
from flask import Flask, render_template, request, redirect
from datetime import date
from translations import translations

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://school_user:123456@localhost/school_system"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

LANG = "en"



# ---------------- HOME ----------------
@app.route("/")
def index():
    return render_template("index.html", t=translations[LANG])

# ---------------- STUDENTS ----------------
# ---------------- STUDENTS ----------------
@app.route("/students", methods=["GET", "POST"])
def students():

    if request.method == "POST":

        name = request.form["name"]
        class_id = request.form["class_id"]

        new_student = Student(
            name=name,
            class_id=class_id
        )

        db.session.add(new_student)
        db.session.commit()

    student_list = Student.query.all()

    class_list = SchoolClass.query.all()

    return render_template(
        "students.html",
        students=student_list,
        classes=class_list,
        t=translations[LANG]
    )

# ---------------- ATTENDANCE ----------------
# ---------------- ATTENDANCE ----------------
@app.route("/attendance", methods=["GET", "POST"])
def attendance():

    selected_date = request.args.get("date")

    if selected_date:
        today = selected_date
    else:
        today = date.today().isoformat()

    message = None

    students = Student.query.all()

    # ---------------- SAVE ATTENDANCE ----------------
    if request.method == "POST":

        # block old dates
        if today != date.today().isoformat():
            message = "You can only register attendance for today"

        else:

            for student in students:

                field_name = f"absent_{student.id}"

                if request.form.get(field_name):
                    status = "absent"
                else:
                    status = "present"

                # prevent duplicate attendance
                existing = Attendance.query.filter_by(
                    student_id=student.id,
                    date=today
                ).first()

                if not existing:

                    new_attendance = Attendance(
                        student_id=student.id,
                        date=today,
                        status=status
                    )

                    db.session.add(new_attendance)

            db.session.commit()

            message = "Attendance saved successfully"

    # ---------------- HISTORY ----------------
    records = Attendance.query.filter_by(date=today).all()

    return render_template(
        "attendance.html",
        students=students,
        records=records,
        today=today,
        message=message,
        t=translations[LANG]
    )

# ---------------- CLASSES ----------------
@app.route("/classes", methods=["GET", "POST"])
def classes():

    if request.method == "POST":
        name = request.form["name"]

        new_class = SchoolClass(name=name)

        db.session.add(new_class)
        db.session.commit()

    class_list = SchoolClass.query.all()

    return render_template(
        "classes.html",
        classes=class_list,
        t=translations[LANG]
    )

# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)
