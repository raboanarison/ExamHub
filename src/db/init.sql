
CREATE TYPE user_role AS ENUM ('admin', 'student');

CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       name TEXT NOT NULL,
                       email TEXT UNIQUE NOT NULL,
                       password_hash TEXT NOT NULL,
                       role user_role NOT NULL,
                       is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE courses (
                         id SERIAL PRIMARY KEY,
                         code TEXT UNIQUE NOT NULL,
                         name TEXT NOT NULL,
                         description TEXT
);

CREATE TABLE exams (
                       id SERIAL PRIMARY KEY,
                       course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE RESTRICT,
                       title TEXT NOT NULL,
                       description TEXT,
                       starts_at TIMESTAMP NOT NULL,
                       ends_at TIMESTAMP NOT NULL,
                       CHECK (ends_at > starts_at)
);


CREATE TABLE questions (
                           id SERIAL PRIMARY KEY,
                           exam_id INTEGER NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
                           statement TEXT NOT NULL,
                           points INTEGER NOT NULL CHECK (points > 0)
);

CREATE TABLE choices (
                         id SERIAL PRIMARY KEY,
                         question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
                         label TEXT NOT NULL,
                         is_correct BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE attempts (
                          id SERIAL PRIMARY KEY,
                          exam_id INTEGER NOT NULL REFERENCES exams(id) ON DELETE RESTRICT,
                          student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
                          score INTEGER,
                          submitted_at TIMESTAMP,
                          UNIQUE (exam_id, student_id)
);

CREATE TABLE answers (
                         id SERIAL PRIMARY KEY,
                         attempt_id INTEGER NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
                         question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
                         choice_id INTEGER REFERENCES choices(id) ON DELETE RESTRICT,
                         UNIQUE (attempt_id, question_id)
);

CREATE INDEX idx_exams_course ON exams(course_id);
CREATE INDEX idx_questions_exam ON questions(exam_id);
CREATE INDEX idx_choices_question ON choices(question_id);
CREATE INDEX idx_attempts_student ON attempts(student_id);
CREATE INDEX idx_attempts_exam ON attempts(exam_id);


INSERT INTO users (name, email, password_hash, role, is_active)
VALUES ('Admin', 'admin@examhub.local', '$2b$10$h0LWQegJTy9wJCm1Ym37V.wDZO695w8sf9b0fBi5F158ZW3yRJ/Lu', 'admin', TRUE);