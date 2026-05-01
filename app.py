from flask import Flask, render_template, request, redirect
import sqlite3
from datetime import date
from translations import translations

app = Flask(__name__)

LANG = "en"

def connect_db():
    return sqlite3.connect("database.db")

# ---------------- HOME ----------------
@app.route("/")
def index():
    return render_template("index.html", t=translations[LANG])

# ---------------- STUDENTS ----------------
@app.route("/students", methods=["GET", "POST"])
def students():
    conn = connect_db()
    cursor = conn.cursor()

    if request.method == "POST":
        name = request.form["name"]
        cursor.execute("INSERT INTO students (name) VALUES (?)", (name,))
        conn.commit()
        return redirect("/students")

    cursor.execute("SELECT * FROM students")
    student_list = cursor.fetchall()

    conn.close()

    return render_template("students.html", students=student_list, t=translations[LANG])

# ---------------- ATTENDANCE ----------------
@app.route("/attendance", methods=["GET", "POST"])
def attendance():
    conn = connect_db()
    cursor = conn.cursor()

    selected_date = request.args.get("date")

    if selected_date:
        today = selected_date
    else:
        today = date.today().isoformat()
        message = None

    cursor.execute("SELECT * FROM students")
    students = cursor.fetchall()

    if request.method == "POST":
        
        # 🔒 BLOQUEIO AQUI (ANTES DE SALVAR)
        if today != date.today().isoformat():
            message = "You can only register attendance for today"
        else:
            # 🔥 SÓ ENTRA AQUI SE FOR HOJE
            
            for student in students:
                student_id = student[0]

                field_name = f"absent_{student_id}"

                # se checkbox estiver marcado → absent #
                if request.form.get(field_name):
                    status = "absent"
                else:
                    status = "present"

                try:
                    cursor.execute("""
                    INSERT INTO attendance (student_id, date, status)
                    VALUES (?, ?, ?)
                    """, (student_id, today, status))

                except sqlite3.IntegrityError:
                    pass

    conn.commit()
    message = "Attendance saved successfully"


    cursor.execute("SELECT * FROM students")
    students = cursor.fetchall()

    cursor.execute("""
    SELECT students.name, attendance.status
    FROM attendance
    JOIN students ON attendance.student_id = students.id
    WHERE date = ?
    """, (today,))

    records = cursor.fetchall()

    conn.close()

    return render_template(
        
        "attendance.html",
        students=students,
        records=records,
        today=today,
        t=translations[LANG],
        message=message
    )

# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)
