const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

// Create an Express app
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
// Configure PostgreSQL connection pool
// const pool = new Pool({
//   user: 'your_postgres_user',  // Update with your PostgreSQL user
//   host: 'db',                   // Database service name in Docker Compose
//   database: 'your_database_name', // Update with your database name
//   password: 'your_password',    // Update with your password
//   port: 5432,                   // Default PostgreSQL port
// });
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ct648_finalproject',
    // password: 'P@ssw0rd',
    password: '12345678',
    port: 5432,
});
// Example route to check current date/time from the database
app.get('/time', async (req, res) => {
    try {
        const result = await pool.query('SELECT now()');
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Error fetching current time from database');
    }
});

app.get('/api/:tableName', async (req, res) => {
    const client = await pool.connect();
    const tableName = req.params.tableName;
    const customQuery = req.query.query;
    try {
        if (!customQuery) {
            const result = await client.query(`SELECT * FROM ${tableName}`);
            return res.json(result.rows);
        } else {
            const result = await client.query(`${customQuery}`);
            return res.json(result.rows);
        }
    } catch (err) {
        console.error('Query error', err.stack);
        res.status(500).send('Internal Server Error');
    } finally {
        client.release();
    }
});

//Get history point
app.get('/api/get/historypoint', async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query(`SELECT * FROM quiz_history`);
        return res.json(result.rows);

    } catch (err) {
        console.error('Query error', err.stack);
        res.status(500).send('Internal Server Error');
    } finally {
        client.release();
    }
});

// Route to check if user is exciting
app.get('/api/quiz_login/quiz_login', async (req, res) => {
    const client = await pool.connect();
    const { username, password } = req.query;
    console.log('username', username)
    console.log('password', password)
    try {
        const result = await client.query(
            'SELECT * FROM quiz_login WHERE username = $1 AND password = $2',
            [username, password]
        );
        return res.json(result.rows);
    } catch (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error processing request');
    } finally {
        client.release(); // Always release the client back to the pool
    }
});

// Route to insert questions and answers
app.post('/api/questions', async (req, res) => {
    const client = await pool.connect();
    const questionsState = req.body;
    try {
        // Insert into the quiz_title table using PostgreSQL's parameterized queries
        const result = await client.query(
            'INSERT INTO quiz_title (title , create_date) VALUES ($1 ,$2) RETURNING id',
            ["GAME CREATE", "now()"]
        );

        const quizTitleId = result.rows[0].id;

        for (const questions of questionsState) {
            const { question, category, difficulty, type, correct_answer, incorrect_answers } = questions;

            // Insert question into the questions table
            const result = await client.query(
                'INSERT INTO quiz_questions (title_id, question, category, difficulty, type, correct_answer, incorrect_answers) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [quizTitleId, question, category, difficulty, type, correct_answer, JSON.stringify(incorrect_answers)]
            );
            console.log('result insert question', result)

        }

        // res.status(201).send('Questions saved successfully');
        res.status(201).json({
            message: 'Questions saved successfully',
            quizTitleId: quizTitleId
        });

    } catch (err) {
        console.error('Error inserting into database:', err);
        res.status(500).send('Error inserting data');
    } finally {
        client.release(); // Always release the client back to the pool
    }
});

// Route to insert user account
app.post('/api/singupuser', async (req, res) => {
    const client = await pool.connect();
    const userState = req.body;
    try {
        const checkResulu = await client.query(
            'select * from quiz_login where username = $1',
            [userState.username]
        )
        if (checkResulu.rowCount > 0) {
            return res.status(201).send('The username is already taken');

        } else {
            // Insert into the quiz_title table using PostgreSQL's parameterized queries
            const result = await client.query(
                'INSERT INTO quiz_login (username , password , email) VALUES ($1 ,$2 , $3) ',
                [userState.username, userState.password, userState.email]
            );
            // console.log('result',result)
            return res.status(201).send('user name saved successfully');
        }


    } catch (err) {
        console.error('Error inserting into database:', err);
        return res.status(500).send('Error inserting data');
    } finally {
        client.release(); // Always release the client back to the pool
    }
});

// Route to insert game point
app.post('/api/gamepoint', async (req, res) => {
    const client = await pool.connect();
    const userState = req.body;
    try {
        // Insert into the quiz_title table using PostgreSQL's parameterized queries
        const result = await client.query(
            'INSERT INTO quiz_history (gamepoint , useremail , gamename , time) VALUES ($1 ,$2 , $3 , $4) ',
            [userState.gamepoint, userState.useremail, userState.gamename , "now()"]
        );
        // return res.status(201).send('user name saved successfully');
        res.status(201).json({
            message: 'user name saved successfully',
            result : result
        });
    } catch (err) {
        console.error('Error inserting into database:', err);
        // return res.status(500).send('Error inserting data');
        res.status(500).json({
            message: 'Error inserting data',
        });
    } finally {
        client.release(); // Always release the client back to the pool
    }
});
// gmail login
app.post('/api/login/gmail', (req, res) => {
    console.log(req.user);
    // res.redirect('http://localhost:4200/homepage')
});

// delete question
app.delete('/api/deletequestion/:id', async (req, res) => {
    const client = await pool.connect();
    const id = req.params.id;
    console.log('id', id)
    try {
        const result = await client.query(`DELETE FROM quiz_title WHERE id = $1`, [id]);
        console.log('result', result)
        if (result.rowCount > 0) {
            const result = await client.query(`DELETE FROM quiz_questions WHERE title_id = $1`, [id]);
            if (result.rowCount > 0) {
                res.status(201).json({
                    message: 'Record deleted successfully',
                });
            }
            // return res.status(200).send('Record deleted successfully');
        } else {
            // return res.status(404).send('Record not found');
            res.status(404).json({
                message: 'Record not found',
            });
        }
    } catch (err) {
        console.error('Delete error', err.stack);
        res.status(500).send('Internal Server Error');
    } finally {
        client.release();
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
