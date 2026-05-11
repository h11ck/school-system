from backend.app.database.connection import get_connection


def get_all_students():

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            id,
            name,
            class_id
        FROM students
        ORDER BY id
    """)

    students = cursor.fetchall()

    cursor.close()
    connection.close()

    result = []

    for student in students:

        result.append({
            "id": student[0],
            "name": student[1],
            "class_id": student[2]
        })

    return result


def create_student(name, class_id):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO students (
            name,
            class_id
        )
        VALUES (%s, %s)
        RETURNING id
    """, (name, class_id))

    student_id = cursor.fetchone()[0]

    connection.commit()

    cursor.close()
    connection.close()

    return student_id