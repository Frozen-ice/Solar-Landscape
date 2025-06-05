"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const config_1 = __importDefault(require("../config/config"));
class Database {
    constructor() {
        this.db = null;
    }
    async connect() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3_1.default.Database(config_1.default.database.path, (err) => {
                if (err) {
                    console.error('Database connection error:', err);
                    reject(err);
                    return;
                }
                console.log('Connected to SQLite database');
                this.initializeTables()
                    .then(() => resolve())
                    .catch(reject);
            });
        });
    }
    async initializeTables() {
        if (!this.db)
            throw new Error('Database not initialized');
        return new Promise((resolve, reject) => {
            const createTableSQL = `
        CREATE TABLE IF NOT EXISTS enrollments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          address TEXT NOT NULL,
          city TEXT NOT NULL,
          state TEXT NOT NULL,
          zip TEXT NOT NULL,
          utility TEXT NOT NULL,
          uan TEXT,
          assistanceProgram TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `;
            this.db.run(createTableSQL, (err) => {
                if (err) {
                    console.error('Error creating tables:', err);
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
    async query(sql, params = []) {
        if (!this.db)
            throw new Error('Database not initialized');
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }
    async run(sql, params = []) {
        if (!this.db)
            throw new Error('Database not initialized');
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err)
                    reject(err);
                else
                    resolve({ id: this.lastID, changes: this.changes });
            });
        });
    }
    async createEnrollment(enrollment) {
        const sql = `
      INSERT INTO enrollments (
        firstName, lastName, address, city, state, zip, 
        utility, uan, assistanceProgram
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
        const params = [
            enrollment.firstName,
            enrollment.lastName,
            enrollment.address,
            enrollment.city,
            enrollment.state,
            enrollment.zip,
            enrollment.utility,
            enrollment.uan || null,
            enrollment.assistanceProgram || null
        ];
        const result = await this.run(sql, params);
        return result.id;
    }
    async close() {
        if (!this.db)
            return;
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
}
// Create and export a singleton instance
const database = new Database();
exports.default = database;
//# sourceMappingURL=database.js.map