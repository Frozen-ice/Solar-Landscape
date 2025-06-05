import sqlite3 from 'sqlite3';
import config from '../config/config';
import { Enrollment } from '../types';

class Database {
  private db: sqlite3.Database | null = null;

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(config.database.path, (err) => {
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

  private async initializeTables(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

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

      this.db!.run(createTableSQL, (err) => {
        if (err) {
          console.error('Error creating tables:', err);
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      this.db!.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows as T[]);
      });
    });
  }

  async run(sql: string, params: any[] = []): Promise<{ id: number; changes: number }> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      this.db!.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  }

  async createEnrollment(enrollment: Omit<Enrollment, 'id' | 'createdAt'>): Promise<number> {
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

  async close(): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      this.db!.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

// Create and export a singleton instance
const database = new Database();
export default database; 