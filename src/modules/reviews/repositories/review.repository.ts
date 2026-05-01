import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

export const checkMissionCompleted = async (
  userId: number,
  shopId: number,
  userMissionId: number
): Promise<boolean> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT EXISTS(
        SELECT 1 FROM user_mission um
        JOIN mission m ON um.mission_id = m.id
        WHERE um.id = ? AND um.user_id = ? AND m.shop_id = ? AND um.status = '성공'
      ) as isValid;`,
      [userMissionId, userId, shopId]
    );
    return !!rows[0]?.isValid;
  } finally {
    conn.release();
  }
};

export const checkReviewExists = async (userMissionId: number): Promise<boolean> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT EXISTS(
        SELECT 1 FROM review WHERE user_mission_id = ?
      ) as isExist;`,
      [userMissionId]
    );
    return !!rows[0]?.isExist;
  } finally {
    conn.release();
  }
};

export const addReview = async (data: {
  user_id: number;
  shop_id: number;
  user_mission_id: number;
  rating: number;
  body: string;
}): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query<ResultSetHeader>(
      `INSERT INTO review (user_id, shop_id, user_mission_id, rating, body)
       VALUES (?, ?, ?, ?, ?);`,
      [data.user_id, data.shop_id, data.user_mission_id, data.rating, data.body]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`리뷰 삽입 오류: ${err}`);
  } finally {
    conn.release();
  }
};

export const addReviewImages = async (
  reviewId: number,
  images: { s3_url: string; s3_key: string }[]
): Promise<void> => {
  if (images.length === 0) return;

  const conn = await pool.getConnection();
  try {
    const values = images.map((img) => [reviewId, img.s3_url, img.s3_key]);
    await conn.query(
      `INSERT INTO review_image (review_id, s3_url, s3_key) VALUES ?;`,
      [values]
    );
  } catch (err) {
    throw new Error(`이미지 삽입 오류: ${err}`);
  } finally {
    conn.release();
  }
};

export const getReview = async (reviewId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT r.*, u.nickname
       FROM review r
       JOIN user u ON r.user_id = u.id
       WHERE r.id = ?;`,
      [reviewId]
    );
    return rows[0] ?? null;
  } finally {
    conn.release();
  }
};

export const getReviewImages = async (reviewId: number): Promise<any[]> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT * FROM review_image WHERE review_id = ?;`,
      [reviewId]
    );
    return rows as any[];
  } finally {
    conn.release();
  }
};

export const checkShopExists = async (shopId: number): Promise<boolean> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT EXISTS(
        SELECT 1 FROM shop WHERE id = ?
      ) as isExist;`,
      [shopId]
    );
    return !!rows[0]?.isExist;
  } finally {
    conn.release();
  }
};

export const getReviewsByShopId = async (
  shopId: number,
  cursor: number,
  limit: number = 10
): Promise<any[]> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT r.id, r.rating, r.body, r.created_date, u.nickname
       FROM review r
       JOIN user u ON r.user_id = u.id
       WHERE r.shop_id = ?
       ${cursor ? "AND r.id < ?" : ""}
       ORDER BY r.id DESC
       LIMIT ?;`,
      cursor ? [shopId, cursor, limit] : [shopId, limit]
    );
    return rows as any[];
  } finally {
    conn.release();
  }
};