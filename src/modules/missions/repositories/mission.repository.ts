import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 가게 존재 여부 확인
export const checkShopExists = async (shopId: number): Promise<boolean> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT EXISTS(SELECT 1 FROM shop WHERE id = ?) as isExist;`,
      [shopId]
    );
    return !!rows[0]?.isExist;
  } finally {
    conn.release();
  }
};

// 미션 삽입
export const addMission = async (data: {
  shop_id: number;
  title: string;
  body: string;
  point: number;
}): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query<ResultSetHeader>(
      `INSERT INTO mission (shop_id, title, body, point)
       VALUES (?, ?, ?, ?);`,
      [data.shop_id, data.title, data.body, data.point]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`미션 추가 오류: ${err}`);
  } finally {
    conn.release();
  }
};

// 미션 조회
export const getMission = async (missionId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT * FROM mission WHERE id = ?;`,
      [missionId]
    );
    return rows[0] ?? null;
  } finally {
    conn.release();
  }
};

// 미션 존재 여부 확인
export const checkMissionExists = async (missionId: number): Promise<boolean> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT EXISTS(
        SELECT 1 FROM mission WHERE id = ?
      ) as isExist;`,
      [missionId]
    );
    return !!rows[0]?.isExist;
  } finally {
    conn.release();
  }
};

// 이미 도전 중인 미션인지 확인
export const checkUserMissionInProgress = async (
  userId: number,
  missionId: number
): Promise<boolean> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT EXISTS(
        SELECT 1 FROM user_mission
        WHERE user_id = ? AND mission_id = ? AND status = '진행중'
      ) as isInProgress;`,
      [userId, missionId]
    );
    return !!rows[0]?.isInProgress;
  } finally {
    conn.release();
  }
};

// user_mission 삽입
export const addUserMission = async (data: {
  user_id: number;
  mission_id: number;
}): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query<ResultSetHeader>(
      `INSERT INTO user_mission (user_id, mission_id, status)
       VALUES (?, ?, '진행중');`,
      [data.user_id, data.mission_id]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`미션 도전 오류: ${err}`);
  } finally {
    conn.release();
  }
};

// user_mission 조회
export const getUserMission = async (userMissionId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT * FROM user_mission WHERE id = ?;`,
      [userMissionId]
    );
    return rows[0] ?? null;
  } finally {
    conn.release();
  }
};