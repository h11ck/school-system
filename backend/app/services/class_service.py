from backend.app.database.connection import get_connection

def validate_class_data(name):

    if not name:

        return "Class name is required"

    if len(name.strip()) < 2:

        return "Class name must contain at least 2 characters"

    return None

def get_all_classes():

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            id,
            name
        FROM classes
        ORDER BY id
    """)

    classes = cursor.fetchall()

    cursor.close()
    connection.close()

    result = []

    for school_class in classes:

        result.append({
            "id": school_class[0],
            "name": school_class[1]
        })

    return result


def create_class(name):

    validation_error = validate_class_data(name)

    if validation_error:

        return {

            "error": validation_error

        }

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO classes (
            name
        )
        VALUES (%s)
        RETURNING id
    """, (name,))

    class_id = cursor.fetchone()[0]

    connection.commit()

    cursor.close()
    connection.close()

    return class_id

def update_class(class_id, name):

    validation_error = validate_class_data(name)

    if validation_error:

        return {

            "error": validation_error

        }

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        UPDATE classes
        SET name = %s
        WHERE id = %s
        """,
        (
            name,
            class_id
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {

        "message": "Class updated successfully"

    }
    
def delete_class_by_id(class_id):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        DELETE FROM classes
        WHERE id = %s
        """,
        (class_id,)
    )

    connection.commit()

    cursor.close()
    connection.close()