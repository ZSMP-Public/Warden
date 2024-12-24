import { Client, ParseClient } from "seyfert";
const { Pool } = require('pg');

// Initialize the Seyfert Client
const client = new Client();

const pool = new Pool({
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
    } finally {
        await pool.end();
    }
}

client.start().then(async () => {
    console.log('Client started!');
    await client.uploadCommands();
    await testDatabaseConnection();
});

declare module 'seyfert' {
    interface UsingClient extends ParseClient<Client<true>> { }
}
