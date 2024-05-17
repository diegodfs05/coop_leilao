const sqlite3 = require('sqlite3').verbose();

class DBManager {
  constructor(databaseFile) {
    this.db = new sqlite3.Database(databaseFile, (err) => {
      if (err) {
        console.error('Could not connect to database', err);
      } else {
        console.log('Connected to database');
      }
    });
  }

  createTable(tableName, columns) {
    const columnsDef = columns.map(column => `${column.name} ${column.type}`).join(', ');
    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsDef})`;

    this.db.run(sql, (err) => {
      if (err) {
        console.error(`Could not create table ${tableName}`, err);
      } else {
        console.log(`Table ${tableName} created or already exists`);
      }
    });
  }

  insertIntoTable(tableName, values) {
    const placeholders = values.map(() => '?').join(', ');
    const sql = `INSERT INTO ${tableName} VALUES (${placeholders})`;

    this.db.run(sql, values, function (err) {
      if (err) {
        console.error(`Could not insert into table ${tableName}`, err);
      } else {
        console.log(`Inserted into table ${tableName}`);
      }
    });
  }

  selectFromTable(tableName, callback) {
    const sql = `SELECT * FROM ${tableName}`;

    this.db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(`Could not retrieve data from table ${tableName}`, err);
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }
}

module.exports = DBManager;
