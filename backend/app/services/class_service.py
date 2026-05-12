from backend.app.database.connection import get_connection


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