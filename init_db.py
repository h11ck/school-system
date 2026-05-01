import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

# STUDENTS
cursor.execute("""
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
)
""")

# ATTENDANCE (COM BLOQUEIO DE DUPLICAÇÃO)
cursor.execute("""
CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    date TEXT,
    status TEXT,
    FOREIGN KEY (student_id) REFERENCES students(id),
    UNIQUE(student_id, date)
)
""")

conn.commit()
conn.close()

print("Database created!")