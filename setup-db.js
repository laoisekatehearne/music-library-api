const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

fs.mkdirSync('data', { recursive: true });

if (fs.existsSync('data/app.db')) {
    console.log('Database already exists. No changes made.');
    process.exit(0);
}

const sql = fs.readFileSync('model.sql', 'utf8');
const db = new sqlite3.Database('data/app.db');

db.exec(sql, (err) => {
    if (err) {
        console.error('Database setup failed:', err.message);
        process.exitCode = 1;
    } else {
        console.log('Database created with sample music data.');
    }

    db.close();
});
