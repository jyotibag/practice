import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";

export const allRoles = async (req, res) => {
  const data = await pool.query(
    `select * from role_master where is_active=true order by role`,
    []
  );

  res.status(StatusCodes.OK).json({ data });
};
