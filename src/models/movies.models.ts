import client from "../database";
import Movies from "../types/movies.types";

class Moviemodel {
  async create(u: Movies): Promise<Movies[]> {
    try {
      const sql =
        "INSERT INTO movies (name, relase_date) VALUES($1, $2) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [u.name, u.relase_date]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not add new movie. Error: ${err}`);
    }
  }

  async getOne(id: string): Promise<Movies> {
    try {
      const sql = `SELECT * FROM movies WHERE id=($1)`;

      const connection = await client.connect();

      const result = await connection.query(sql, [id]);

      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not find movie ${id}, ${(error as Error).message}`
      );
    }
  }

  async updateOne(u: Movies): Promise<Movies> {
    try {
      const connection = await client.connect();
      const sql = `UPDATE movies 
                  SET name=$1, relase_date=$2
                  WHERE id=$3 
                  RETURNING id, name ,relase_date `;

      const result = await connection.query(sql, [u.name, u.relase_date, u.id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not update movie: ${u.name}, ${(error as Error).message}`
      );
    }
  }

  async deleteOne(id: string): Promise<Movies> {
    try {
      const connection = await client.connect();
      const sql = `DELETE FROM movies 
                  WHERE id=($1) 
                  RETURNING id, name`;

      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete movie ${id}, ${(error as Error).message}`
      );
    }
  }
}

export default Moviemodel;
