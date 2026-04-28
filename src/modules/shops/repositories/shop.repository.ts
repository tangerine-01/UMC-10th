import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

export const checkRegionExists = async (regionId: number): Promise<boolean> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT EXISTS(SELECT 1 FROM region WHERE id = ?) as isExist;`,
      [regionId]
    );
    return !!rows[0]?.isExist;
  } finally {
    conn.release();
  }
};

export const addShop = async (data: {
  owner_id: number;
  region_id: number;
  shop_name: string;
  shop_position: string;
  shop_explain: string | null;
  shop_phone: string | null;
}): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query<ResultSetHeader>(
      `INSERT INTO shop (owner_id, region_id, shop_name, shop_position, shop_explain, shop_phone)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [data.owner_id, data.region_id, data.shop_name, data.shop_position, data.shop_explain, data.shop_phone]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`가게 추가 오류: ${err}`);
  } finally {
    conn.release();
  }
};

export const getShop = async (shopId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT s.*, r.region_name
       FROM shop s
       JOIN region r ON s.region_id = r.id
       WHERE s.id = ?;`,
      [shopId]
    );
    return rows[0] ?? null;
  } finally {
    conn.release();
  }
};