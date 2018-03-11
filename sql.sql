DROP TABLE Student;
DROP TABLE Grade;
DROP TABLE Question;
DROP TABLE StudentAnswer;
DROP TABLE Section;
DROP TABLE Part;
DROP TABLE users;
DROP TABLE Teacher;


CREATE TABLE Student(
name text,
username text,
student_ID SERIAL,
PRIMARY KEY (student_ID)
);


CREATE TABLE Teacher(
name text,
username text,
teacher_ID SERIAL,
PRIMARY KEY (teacher_ID)
);

CREATE TABLE Grade(
student_ID int NOT NULL,
part_ID int NOT NULL,
grade char
);

CREATE TABLE Question(
question text,
part_ID int NOT NULL,
answer text,
isExam boolean,
question_ID SERIAL,
PRIMARY KEY (question_ID)
);

CREATE TABLE StudentAnswer(
student_ID int NOT NULL,
isCorrect boolean,
answer text,
question_ID int NOT NULL
);

CREATE TABLE Section(
name text,
description text,
section_ID SERIAL,
PRIMARY KEY (section_ID)
);

CREATE TABLE Part(
section_ID int,
name text,
description text,
video text,
part_ID SERIAL,
PRIMARY KEY (part_ID)
);

CREATE TABLE users(
username text,
password text,
isTeacher Boolean,
salt text,
id SERIAL,
PRIMARY KEY (id)
);
