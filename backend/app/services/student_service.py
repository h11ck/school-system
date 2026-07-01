from backend.app.database.connection import get_connection

def validate_student_data(name, class_id):

    if not name:

        return "Name is required"

    if len(name.strip()) < 2:

        return "Name must contain at least 2 characters"

    if not class_id:

        return "Class ID is required"

    if not isinstance(class_id, int):

        return "Class ID must be an integer"

    return None

def get_all_students(search=None):

    connection = get_connection()

    cursor = connection.cursor()

    if search:

    cursor.execute(
        """
        SELECT
            id,
            name,
            class_id
        FROM students
        WHERE LOWER(name) LIKE LOWER(%s)
        ORDER BY id
        """,
        (f"%{search}%",)
    )

    else:

        cursor.execute(
            """
            SELECT
                id,
                name,
                class_id
            FROM students
            ORDER BY id
            """
        )

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

    validation_error = validate_student_data(

    name,
    class_id
)

    if validation_error:

        return {

            "error": validation_error

        }

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

def delete_student_by_id(student_id):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(

        """
        DELETE FROM students
        WHERE id = %s
        """,

        (student_id,)
    )

    connection.commit()

    cursor.close()

    connection.close()
    
def update_student(student_id, name, class_id):

    validation_error = validate_student_data(
        name,
        class_id
    )

    if validation_error:

        return {
            "error": validation_error
        }

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        UPDATE students
        SET
            name = %s,
            class_id = %s
        WHERE id = %s
        """,
        (
            name,
            class_id,
            student_id
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message": "Student updated successfully"
    }