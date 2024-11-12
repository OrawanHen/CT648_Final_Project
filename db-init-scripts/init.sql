CREATE TABLE IF NOT EXISTS public.oh_quiz_history
(
    gamepoint text,
    useremail text,
    gamename text,
    "time" timestamp with time zone  -- Stores time with time zone information
);

CREATE TABLE IF NOT EXISTS public.oh_quiz_login
(
    id SERIAL PRIMARY KEY,           -- Auto-incrementing primary key
    username text NOT NULL,          -- Username is required
    password text NOT NULL,          -- Password is required
    email text                       -- Optional email field
);

CREATE TABLE IF NOT EXISTS public.oh_quiz_questions
(
    id SERIAL PRIMARY KEY,           -- Auto-incrementing primary key
    question text,
    correct_answer text,
    category text,
    difficulty text,
    type text,
    incorrect_answers json,          -- JSON column for storing incorrect answers
    title_id integer                 -- Foreign key to quiz_title (if needed)
);

CREATE TABLE IF NOT EXISTS public.oh_quiz_title
(
    id SERIAL PRIMARY KEY,           -- Auto-incrementing primary key
    title text,
    create_date timestamp without time zone  -- Stores time without time zone information
);

