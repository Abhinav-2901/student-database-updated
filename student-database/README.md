For Database


1. CREATE DATABASE student_database;

2. USE student_database;

3. CREATE TABLE students (
  enrollment_number VARCHAR(20) PRIMARY KEY,
  faculty_number VARCHAR(20),
  name VARCHAR(100),
  address VARCHAR(255),
  hall VARCHAR(100),
  course VARCHAR(100),
  branch VARCHAR(100),
  semester VARCHAR(50)
);

CREATE TABLE users (
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);



4. SHOW DATABASES;

5. USE student_database;

6. DESCRIBE students;

7. select * from student_database;
