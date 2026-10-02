const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('data/app.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database');

        db.run('PRAGMA foreign_keys = ON', (err) => {
            if (err) {
                console.error('Could not enable foreign keys:', err.message);
            } else {
                console.log('Foreign keys enabled');
            }
        });
    }
});

module.exports = db;