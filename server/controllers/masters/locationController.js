import { StatusCodes } from "http-status-codes";
import { generateOtherSlug, paginationLogic } from "../../utils/functions.js";
import pool from "../../db.js";
import { BadRequestError } from "../../errors/customErrors.js";

// ------
export const pageLocations = async (req, res) => {
  const { page, search, parent } = req.query;
  const pagination = paginationLogic(page, null);

  const searchStr = search ? ` and (city ilike '%${search.trim()}%')` : ``;
  const searchDrp = parent ? ` and state='${parent}'` : ``;

  const data = await pool.query(
    `select
			city,
			id,
			state_code,
			state,
			dist_code,
			is_active
    from
			master_locations where id is not null ${searchStr} ${searchDrp} order by state, city offset $1 limit $2`,
    [pagination.offset, pagination.pageLimit]
  );

  const records = await pool.query(
    `select * from master_locations where id is not null ${searchStr} ${searchDrp}`,
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
export const getAllStates = async (req, res) => {
  const data = await pool.query(
    `select distinct(state) from master_locations order by state`,
    []
  );

  res.status(StatusCodes.OK).json({ data });
};

// ------
export const addLocation = async (req, res) => {
  const { stateName, city } = req.body;
  const citySlug = await generateOtherSlug("master_locations", city);

  try {
    await pool.query(`BEGIN`);

    const state = await pool.query(
      `select state_code from master_locations where state=$1`,
      [stateName]
    );

    if (!state.rows[0].state_code) {
      throw new BadRequestError(`State code not found`);
    }
    const data = await pool.query(
      `insert into master_locations(city, state_code, state, slug) values($1, $2, $3, $4)`,
      [city.trim(), Number(state.rows[0].state_code), stateName, citySlug]
    );

    await pool.query(`COMMIT`);

    res.status(StatusCodes.CREATED).json({ data: `success` });
  } catch (error) {
    await pool.query(`ROLLBACK`);
    console.log(error);
  }
};

// ------
export const updateLocation = async (req, res) => {
  const { id } = req.params;
  const { stateName, city } = req.body;
  const citySlug = await generateOtherSlug("master_locations", city);

  try {
    await pool.query(`BEGIN`);

    const state = await pool.query(
      `select state_code from master_locations where state=$1`,
      [stateName]
    );

    if (!state.rows[0].state_code) {
      throw new BadRequestError(`State code not found`);
    }
    const data = await pool.query(
      `update master_locations set city=$1, state_code=$2, state=$3, slug=$4 where id=$5`,
      [city.trim(), Number(state.rows[0].state_code), stateName, citySlug, id]
    );

    await pool.query(`COMMIT`);

    res.status(StatusCodes.ACCEPTED).json({ data: `success` });
  } catch (error) {
    await pool.query(`ROLLBACK`);
    console.log(error);
  }
};

// ------
export const deleteLocation = async (req, res) => {
  const { id } = req.params;

  const data = await pool.query(
    `update master_locations set is_active=false where id=$1`,
    [id]
  );

  res.status(StatusCodes.NO_CONTENT).json({ data: `deleted` });
};

// ------
export const getTopLocations = async (req, res) => {
  const data = await pool.query(
    `select * from master_locations where is_active=true limit 10`,
    []
  );

  res.status(StatusCodes.OK).json({ data });
};
