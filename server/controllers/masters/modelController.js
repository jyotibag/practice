import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";
import { paginationLogic } from "../../utils/functions.js";
import slug from "slug";
import dayjs from "dayjs";

// ------
export const pageModels = async (req, res) => {
  const { page, search, catid, brid } = req.query;
  const pagination = paginationLogic(page, null);

  const searchStr = search
    ? ` and (mm.model_name ilike '%${search.trim()}%')`
    : ``;

  let searchDrp = "";
  if (catid && !brid) {
    searchDrp = ` and mm.cat_id=${catid}`;
  } else if (catid && brid) {
    searchDrp = ` and mm.cat_id=${catid} and mm.brand_id=${brid}`;
  } else {
    searchDrp = ``;
  }

  const data = await pool.query(
    `select
        mm.model_name,
        mm.id,
        mm.model_slug,
        mm.cat_id,
        mm.brand_id,
        mm.is_active,
        cm.category,
        bm.brand
    from
        master_make_models mm 
        join master_categories cm on mm.cat_id = cm.id 
        join master_brands bm on mm.brand_id = bm.id 
        ${searchStr} ${searchDrp}
        order by cm.category, bm.brand, mm.model_name offset $1 limit $2`,
    [pagination.offset, pagination.pageLimit]
  );

  const records = await pool.query(
    `select mm.* from master_make_models as mm where mm.id is not null ${searchStr} ${searchDrp}`,
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
export const allModels = async (req, res) => {
  const data = await pool.query(
    `select * from master_make_models order by model_name`,
    []
  );

  res.status(StatusCodes.OK).json({ data });
};

// ------
export const addModel = async (req, res) => {
  const { catId, brandId, modelName } = req.body;
  const modelSlug = slug(modelName);
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

  const insert = await pool.query(
    `insert into master_make_models(cat_id, brand_id, model_name, model_slug, created_at, updated_at) values($1, $2, $3, $4, $5, $6)`,
    [catId, brandId, modelName.trim(), modelSlug, timeStamp, timeStamp]
  );

  res.status(StatusCodes.CREATED).json({ data: `success` });
};

// ------
export const updateModel = async (req, res) => {
  const { id } = req.params;
  const { catId, brandId, modelName } = req.body;
  const modelSlug = slug(modelName);
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

  const update = await pool.query(
    `update master_make_models set cat_id=$1, brand_id=$2, model_name=$3, model_slug=$4, updated_at=$5 where id=$6`,
    [catId, brandId, modelName.trim(), modelSlug, timeStamp, id]
  );

  res.status(StatusCodes.ACCEPTED).json({ data: `success` });
};

// ------
export const deleteModel = async (req, res) => {
  const { id } = req.params;
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

  const data = await pool.query(
    `update master_make_models set is_active=false, deleted_at=$1 where id=$2`,
    [timeStamp, id]
  );

  res.status(StatusCodes.NO_CONTENT).json({ data: `deleted` });
};
