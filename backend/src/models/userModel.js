import { pool } from "../config/db.js";

const getAllUsersService = async () => {
    const text = "SELECT * FROM users";
    const result = await pool.query(text);
    return result.rows;
}

const getUserByIdService = async (id) => {
    const query = {
        text: "SELECT * FROM users where id = $1",
        values: [id]
    }
    const result = await pool.query(query);
    return result.rows[0];
}

const createUserService = async (name, email, password) => {
    const query = {
        text: "INSERT INTO users (name, email, password) values ($1, $2, $3) RETURNING *",
        values: [name, email, password]
    };
    const result = await pool.query(query);
    return result.rows[0];
}

const updateUserService = async (id, name, email) => {
    const query = {
        text: "UPDATE users SET name=$1, email=$2 WHERE id =$3 RETURNING *",
        values: [name, email, id]
    };
    const result = await pool.query(query);
    return result.rows[0];
}

const deleteUserService = async (id) => {
    const query = {
        text: "DELETE FROM users WHERE id = $1 RETURNING *",
        values: [id]
    }

    const result = await pool.query(query);
    return result.rows
}

export {
    getAllUsersService,
    getUserByIdService,
    createUserService,
    updateUserService,
    deleteUserService
}