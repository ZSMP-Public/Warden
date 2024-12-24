require('dotenv').config();
import { Client, ParseClient } from "seyfert";
const { Pool } = require('pg');

// Initialize the Seyfert Client
const client = new Client();

export const pool = new Pool({
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
    user: process.env.POSTGRES_USER ?? 'mcuser',
    password: process.env.POSTGRES_PASSWORD ?? 'mypassword',
    database: process.env.POSTGRES_NAME ?? 'mclink',
});

// Function to test the database connection
async function testDatabaseConnection() {
    try {
        const result = await pool.query('SELECT NOW() AS current_time;');
        console.log('Current time from DB:', result.rows[0].current_time);
    } catch (error) {
        console.error('Error connecting to the database:', error);
        // If we can't connect to the database, we should exit the application
        process.exit(1);
    }
}

// Function to clean up expired link requests
async function cleanupExpiredRequests() {
    try {
        const result = await pool.query(
            `UPDATE linking_requests 
             SET status = 'expired' 
             WHERE status = 'pending' 
             AND expires_at < NOW()
             RETURNING hash`
        );

        if (result.rows.length > 0) {
            console.log(`Cleaned up ${result.rows.length} expired link requests`);
        }
    } catch (error) {
        console.error('Error cleaning up expired requests:', error);
    }
}


// Proper shutdown handling
async function shutdown() {
    console.log('Shutting down...');
    try {
        // Clear any running intervals
        if (global.cleanupInterval) clearInterval(global.cleanupInterval);
        if (global.deleteOldInterval) clearInterval(global.deleteOldInterval);

        await pool.end();
        console.log('Database pool closed');
        process.exit(0);
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
}

// Handle different shutdown signals
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    shutdown();
});

client.start().then(async () => {
    console.log('Client started!');
    await client.uploadCommands();
    await testDatabaseConnection();

    // Start periodic cleanup tasks
    // Clean up expired requests every minute
    global.cleanupInterval = setInterval(cleanupExpiredRequests, 60 * 1000);

    // Run initial cleanup
    await cleanupExpiredRequests();
});

declare module 'seyfert' {
    interface UsingClient extends ParseClient<Client<true>> { }
}

// Add TypeScript global declarations
declare global {
    var cleanupInterval: NodeJS.Timeout;
    var deleteOldInterval: NodeJS.Timeout;
}