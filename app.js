const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')

const app = express()
const port = process.env.PORT || 3000
dotenv.config()

// Create a connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((err) => {
    // connection not successful
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    //connection successful
    console.log('Connected to the database.');
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// enable cors
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api/providers', (req, res) => {
    db.query('SELECT * FROM providers', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.post('/api/appointments', (req, res) => {
    const { name, email, provider, appointmentDate } = req.body;

    const sql = 'INSERT INTO appointments (patient_id, provider_id, appointment_date) VALUES (?, ?, ?)';
    const values = [1, provider || "default provider", appointmentDate]; // Assuming patient_id is 1 for now
    
    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Appointment booked successfully!' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


