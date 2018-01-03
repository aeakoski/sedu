DROP TABLE Student;
DROP TABLE Grade;
DROP TABLE Question;
DROP TABLE StudentAnswer;
DROP TABLE Section;
DROP TABLE Part;


CREATE TABLE Student(
name text,
username text,
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

CREATE TABLE users(
username text,
password text,
isTeacher Boolean,
id SERIAL,
PRIMARY KEY (id)
);

INSERT INTO Student (name, username)
VALUES('Milda Matilda', 'missmm');

INSERT INTO Student (name, username)
VALUES('John Doe', 'jdoe');

---

INSERT INTO Student (name, username)
VALUES('Bertil Bsson', 'bbb');

INSERT INTO Student (name, username)
VALUES('Ceasar Csson', 'ccc');

INSERT INTO users (username, password, isTeacher)
VALUES ('aaa','aaa',true);

INSERT INTO users (username, password, isTeacher)
VALUES ('bbb','bbb',false);

INSERT INTO users (username, password, isTeacher)
VALUES ('ccc','ccc',false);

/*
SELECT * FROM Student WHERE username = 'jdoe' AND password = '12345'

SELECT s.name, s.description, s.section_id, t.part_count
FROM section AS s
LEFT JOIN
	(
	SELECT COUNT(section_id) AS part_count, section_id
	FROM part
	GROUP BY section_id
	) AS t
ON s.section_id = t.section_id

*/
