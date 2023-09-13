import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'student'
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM student_table";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside Server" });
        return res.json(result);
    });
});

app.post('/addStudent', (req, res) => {
    const sql = "INSERT INTO student_table (name, city, education, age) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.city,
        req.body.education,
        req.body.age
    ];
    db.query(sql, values, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM student_table where id=?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside Server" });
        return res.json(result);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = 'UPDATE student_table SET `name`=?, `city`=?, `education`=?, `age`=? WHERE id=?';
    console.log('SQL Query:', sql);
    const id  = req.params.id;
    db.query(sql, [req.body.name, req.body.city, req.body.education, req.body.age, id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
         return res.json(result);
    })
})

app.delete('/delete/:id', (req, res) => {
    const deleteSql = 'DELETE FROM student_table WHERE id=?';
    const id = req.params.id;
    
    db.query(deleteSql, [id], (err, result) => {
        if (err) {
            return res.json({ message: "Error deleting student information." });
        } else {
            return res.json({ message: "Student information deleted successfully." });
        }
    });
});


app.listen(5310, () => {
    console.log("Server is running on port 5310");
});
