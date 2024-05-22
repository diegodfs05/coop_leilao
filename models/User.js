const DBManager = require('../db/DBManager');
const dbManager = new DBManager('../database.db');

class User {
    constructor(id, name, email, userName, password) {
      this.id = id;
      this.userName = userName;
      this.password = password;
      this.name = name;
      this.email = email;
      this.bid_history = [];
      this.registration_date = new Date();
    }
  
    // Method to display user information
    displayInfo() {
      return `User [ID: ${this.id}, Name: ${this.name}, Email: ${this.email}]`;
    }

    // Method to get DB table definition
    static getTableDefinition() {
        return [
            { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
            { name: 'name', type: 'TEXT NOT NULL' },
            { name: 'email', type: 'TEXT NOT NULL' },
            { name: 'userName', type: 'TEXT NOT NULL'},
            { name: 'password', type: 'TEXT NOT NULL'}
        ];
    }
    
    // Create USER db table
    static createTable() {
        dbManager.createTable('User', User.getTableDefinition());
    }

    // Store in DB table
    save() {
        dbManager.insertIntoTable('User', [this.id, this.name, this.email]);
    }
    
    // Retrieve from DBtable
    static getAll(callback) {
        dbManager.selectFromTable('User', callback);
    }
  }
  
  module.exports = User;
  