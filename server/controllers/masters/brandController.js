import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";
import slug from "slug";
import dayjs from "dayjs";
import { paginationLogic } from "../../utils/functions.js";

// ------
export const pageBrands = async (req, res) => {
  const { page, search, parent } = req.query;
  const pagination = paginationLogic(page, null);

  const searchStr = search ? ` and (bm.brand ilike '%${search.trim()}%')` : ``;
  const searchDrp = parent ? ` and bm.cat_id=${parent}` : ``;

  const data = await pool.query(
    `select
			bm.brand,
			bm.id,
			bm.cat_id,
			bm.is_active,
			cm.category
    from
			master_brands bm join master_categories cm on bm.cat_id = cm.id ${searchStr} ${searchDrp}
			order by cm.category, bm.brand offset $1 limit $2`,
    [pagination.offset, pagination.pageLimit]
  );

  const records = await pool.query(
    `select bm.* from master_brands as bm where bm.id is not null ${searchStr} ${searchDrp}`,
    []
  );
  const totalPages = Math.ceil(records.rowCount / pagination.pageLimit);
  const meta = {
    totalPages: totalPages,
    currentPage: pagination.pageNo,
    totalRecords: records.rowCount,
  };

  res.status(StatusCodes.OK).json({ data, meta });
};

// ------
export const allBrands = async (req, res) => {
  const data = await pool.query(
    `select * from master_brands order by brand`,
    []
  );
  res.status(StatusCodes.OK).json({ data });
};

// ------
export const addBrand = async (req, res) => {
  const { parentId, brand } = req.body;
  const brandSlug = slug(brand);
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

  const data = await pool.query(
    `insert into master_brands(brand, slug, cat_id, created_at, updated_at) values($1, $2, $3, $4, $5)`,
    [brand.trim(), brandSlug, parentId, timeStamp, timeStamp]
  );
  res.status(StatusCodes.CREATED).json({ data: `success` });
};

// ------
export const categoryBrands = async (req, res) => {
  const { catid } = req.params;

  const data = await pool.query(
    `select * from master_brands where cat_id=$1 and is_active=true`,
    [catid]
  );
  res.status(StatusCodes.OK).json({ data });
};

// ------
export const editBrand = async (req, res) => {
  const { id } = req.params;
  const { parentId, brand } = req.body;
  const brandSlug = slug(brand);
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

  const data = await pool.query(
    `update master_brands set brand=$1, slug=$2, cat_id=$3, updated_at=$4 where id=$5`,
    [brand.trim(), brandSlug, parentId, timeStamp, id]
  );
  res.status(StatusCodes.ACCEPTED).json({ data: `success` });
};

// ------
export const deleteBrand = async (req, res) => {
  const { id } = req.params;
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

  const data = await pool.query(
    `update master_brands set is_active=false, deleted_at=$1 where id=$2`,
    [timeStamp, id]
  );
  res.status(StatusCodes.NO_CONTENT).json({ data: `success` });
};
