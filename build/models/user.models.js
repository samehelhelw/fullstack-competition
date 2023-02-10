"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class Usermodel {
    async create(u) {
        try {
            const sql = "INSERT INTO users (email, password) VALUES($1, $2) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [u.email, u.password]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`);
        }
    }
    async getOne(id) {
        try {
            const sql = `SELECT * FROM users WHERE id=($1)`;
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find user ${id}, ${error.message}`);
        }
    }
    async updateOne(u) {
        try {
            const connection = await database_1.default.connect();
            const sql = `UPDATE users 
                  SET email=$1, password=$2
                  WHERE id=$3 
                  RETURNING id, email`;
            const result = await connection.query(sql, [u.email, u.password, u.id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not update user: ${u.email}, ${error.message}`);
        }
    }
    async deleteOne(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = `DELETE FROM users 
                  WHERE id=($1) 
                  RETURNING id, email`;
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not delete user ${id}, ${error.message}`);
        }
    }
}
exports.default = Usermodel;
