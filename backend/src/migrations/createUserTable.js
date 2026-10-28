import { pool } from "../config/db.js";

const createUserTable = async () => {
    const queryText = `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )`;

    try {
        pool.query(queryText);
        console.log("User table created successfully.");
    } catch (err) {
        console.log("Error creating User table: ", err);
    }
}

export default createUserTable;