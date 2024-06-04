import mysql from 'mysql';

export function connectToDatabase() {
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'database_name'
    });

    db.connect((err) => {
        if (err) throw err;
        console.log('Connected to the database.');
    });

    return db;
}