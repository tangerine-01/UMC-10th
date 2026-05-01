import { pool } from "../../../db.config.js";
export const checkRegionExists = async (regionId) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT EXISTS(SELECT 1 FROM region WHERE id = ?) as isExist;`, [regionId]);
        return !!rows[0]?.isExist;
    }
    finally {
        conn.release();
    }
};
export const addShop = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(`INSERT INTO shop (owner_id, region_id, shop_name, shop_position, shop_explain, shop_phone)
       VALUES (?, ?, ?, ?, ?, ?);`, [data.owner_id, data.region_id, data.shop_name, data.shop_position, data.shop_explain, data.shop_phone]);
        return result.insertId;
    }
    catch (err) {
        throw new Error(`가게 추가 오류: ${err}`);
    }
    finally {
        conn.release();
    }
};
export const getShop = async (shopId) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT s.*, r.region_name
       FROM shop s
       JOIN region r ON s.region_id = r.id
       WHERE s.id = ?;`, [shopId]);
        return rows[0] ?? null;
    }
    finally {
        conn.release();
    }
};
//# sourceMappingURL=shop.repository.js.map