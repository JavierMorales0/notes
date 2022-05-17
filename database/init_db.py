import os
import psycopg2

# Connect to the database


def connectDB():
    try:
        conn = psycopg2.connect(
            host=os.environ['DB_HOST'],
            database=os.environ['DB_NAME'],
            user=os.environ['DB_USER'],
            password=os.environ['DB_PASS'],
        )
        return conn.cursor()
    except Exception as e:
        print("Error: Unable to connect to the database")
        print(e)
        return None
