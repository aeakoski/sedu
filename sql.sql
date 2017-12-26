DROP TABLE Student;
DROP TABLE Grade;
DROP TABLE Question;
DROP TABLE StudentAnswer;
DROP TABLE Section;
DROP TABLE Part;


CREATE TABLE Student(
name text,
username text,
password text,
student_ID SERIAL,
PRIMARY KEY (student_ID)

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

INSERT INTO Student (name, username, password)
VALUES('Milda Matilda', 'missmm', '12345');

INSERT INTO Student (name, username, password)
VALUES('John Doe', 'jdoe', '12345');

-- SELECT * FROM Student WHERE username = 'jdoe' AND password = '12345'
