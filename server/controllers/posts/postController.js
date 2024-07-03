import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";

export const addPost = async (req, res) => {
  res.status(StatusCodes.OK).json({ data: `ok` });
};

export const allPosts = async (req, res) => {
  res.status(StatusCodes.OK).json({ data: `ok` });
};
