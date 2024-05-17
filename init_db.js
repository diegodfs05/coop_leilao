const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run("CREATE TABLE my_table (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, value INTEGER NOT NULL)");

    const stmt = db.prepare('INSERT INTO my_table (name, value) VALUES (?, ?)');
    
    stmt.run('Sample Name', 123);
    stmt.finalize();
});

db.close();