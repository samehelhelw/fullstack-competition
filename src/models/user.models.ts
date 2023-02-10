import client from "../database";
import User from "../types/user.types";

class Usermodel {
  async create(u: User): Promise<User[]> {
    try {
      const sql =
        "INSERT INTO users (email, password) VALUES($1, $2) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [u.email, u.password]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not add new user. Error: ${err}`);
    }
  }

  async getOne(id: string): Promise<User> {
    try {
      const sql = `SELECT * FROM users WHERE id=($1)`;

      const connection = await client.connect();

      const result = await connection.query(sql, [id]);

      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user ${id}, ${(error as Error).message}`);
    }
  }

  async updateOne(u: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = `UPDATE users 
                  SET email=$1, password=$2
                  WHERE id=$3 
                  RETURNING id, email`;

      const result = await connection.query(sql, [u.email, u.password, u.id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not update user: ${u.email}, ${(error as Error).message}`
      );
    }
  }

  async deleteOne(id: string): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = `DELETE FROM users 
                  WHERE id=($1) 
                  RETURNING id, email`;

      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete user ${id}, ${(error as Error).message}`
      );
    }
  }
}

export default Usermodel;
