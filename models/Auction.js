const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db'); 

class Auction {
    constructor(id, titulo, valor, tipo, cooperativa, dataExpiracao, registrationDate, description = '') {
        this.id = id;
        this.titulo = titulo;
        this.valor = valor;
        this.tipo = tipo;
        this.cooperativa = cooperativa;
        this.dataExpiracao = dataExpiracao;
        this.registrationDate = registrationDate;
        this.description = description;
    }

    displayInfo() {
        return `Auction [ID: ${this.id}, Título: ${this.titulo}, Valor: ${this.valor}, Tipo: ${this.tipo}, Cooperativa: ${this.cooperativa}, Data de expiração: ${this.dataExpiracao}, Data de registro: ${this.registrationDate}, Descrição: ${this.description}]`;
    }

    static getTableDefinition() {
        return [
            { name: "id", type: "INTEGER PRIMARY KEY AUTOINCREMENT" },
            { name: "titulo", type: "TEXT NOT NULL" },
            { name: "valor", type: "FLOAT NOT NULL" },
            { name: "tipo", type: "TEXT NOT NULL" },
            { name: "cooperativa", type: "TEXT NOT NULL" },
            { name: "dataExpiracao", type: "TEXT NOT NULL" },
            { name: "registrationDate", type: "TEXT NOT NULL" },
            { name: "description", type: "TEXT NOT NULL" },
        ];
    }

    static createTable() {
        const tableDef = Auction.getTableDefinition();
        const columns = tableDef.map(col => `${col.name} ${col.type}`).join(", ");
        const sql = `CREATE TABLE IF NOT EXISTS Auction (${columns})`;
        db.run(sql);
    }

    save() {
        const sql = `INSERT INTO Auction (titulo, valor, tipo, cooperativa, dataExpiracao, registrationDate, description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.run(sql, [this.titulo, this.valor, this.tipo, this.cooperativa, this.dataExpiracao, this.registrationDate, this.description]);
    }

    static getAll(callback) {
        const sql = `SELECT * FROM Auction`;
        db.all(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            callback(rows);
        });
    }

    static getById(id, callback) {
        const sql = `SELECT * FROM Auction WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) {
                throw err;
            }
            callback(row);
        });
    }

    static deleteById(id, callback) {
        const sql = `DELETE FROM Auction WHERE id = ?`;
        db.run(sql, [id], callback);
    }
}

Auction.createTable();

module.exports = Auction;
