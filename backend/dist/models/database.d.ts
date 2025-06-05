import { Enrollment } from '../types';
declare class Database {
    private db;
    connect(): Promise<void>;
    private initializeTables;
    query<T>(sql: string, params?: any[]): Promise<T[]>;
    run(sql: string, params?: any[]): Promise<{
        id: number;
        changes: number;
    }>;
    createEnrollment(enrollment: Omit<Enrollment, 'id' | 'createdAt'>): Promise<number>;
    close(): Promise<void>;
}
declare const database: Database;
export default database;
