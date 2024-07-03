import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";
import dayjs from "dayjs";
import slug from "slug";
import { paginationLogic, removeSpecialChars } from "../../utils/functions.js";

// ------
export const pageFormFields = async (req, res) => {
  const { page, parent } = req.query;
  const pagination = paginationLogic(page, null);

  const searchDrp = parent ? ` and ff.cat_id=${parent}` : ``;

  const data = await pool.query(
    `select
			ff.*,
			json_agg(
        json_build_object(
          'id', fo.id,
          'value', fo.option_value
        )
      ) AS field_options,
			mc.category
    from master_form_fields ff
    left join master_form_field_options fo on ff.id = fo.field_id 
    join master_categories mc on ff.cat_id = mc.id 
    where ff.id is not null ${searchDrp} group by ff.id, mc.category 
		order by mc.category offset $1 limit $2`,
    [pagination.offset, pagination.pageLimit]
  );

  const records = await pool.query(
    `select ff.* from master_form_fields ff where ff.id is not null ${searchDrp}`,
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
export const allFormFields = async (req, res) => {};

// ------
export const addFormField = async (req, res) => {
  const { ffCatId, ffLabel, ffType, isRequired, fieldOptions } = req.body;
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

  try {
    await pool.query(`BEGIN`);

    const data = await pool.query(
      `insert into master_form_fields(cat_id, field_label, field_type, is_required, created_at, updated_at) values($1, $2, $3, $4, $5, $6) returning id`,
      [
        ffCatId,
        ffLabel.trim(),
        ffType.toLowerCase(),
        isRequired,
        timeStamp,
        timeStamp,
      ]
    );

    if (fieldOptions[0]) {
      await pool.query(`delete from master_form_field_options where id=$1`, [
        data.rows[0].id,
      ]);

      for (const option of fieldOptions) {
        const optionSlug = slug(option.value);

        await pool.query(
          `insert into master_form_field_options(field_id, option_value, slug, created_at, updated_at) values($1, $2, $3, $4, $5)`,
          [
            data.rows[0].id,
            option.value.trim(),
            optionSlug,
            timeStamp,
            timeStamp,
          ]
        );
      }
    }

    await pool.query(`COMMIT`);

    res.status(StatusCodes.CREATED).json({ data: `success` });
  } catch (error) {
    await pool.query(`ROLLBACK`);
    console.log(error);
  }
};

// ------
export const updateFormField = async (req, res) => {
  const { ffCatId, ffLabel, ffType, isRequired, fieldOptions } = req.body;
  const { id } = req.params;
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  let ffName = "";
  ffLabel?.split(" ")?.map((i, index) => {
    ffName +=
      index === 0
        ? removeSpecialChars(i?.toLowerCase())
        : `_` + removeSpecialChars(i?.toLowerCase());
  });
  ffName = ffName + `_${ffCatId}`;

  try {
    await pool.query(`BEGIN`);

    const data = await pool.query(
      `update master_form_fields set cat_id=$1, field_label=$2, field_type=$3, is_required=$4, updated_at=$5, field_name=$7 where id=$6`,
      [
        ffCatId,
        ffLabel.trim(),
        ffType.toLowerCase(),
        isRequired,
        timeStamp,
        id,
        ffName,
      ]
    );

    if (fieldOptions[0]) {
      await pool.query(
        `delete from master_form_field_options where field_id=$1`,
        [id]
      );

      for (const option of fieldOptions) {
        const optionSlug = slug(option.value);

        await pool.query(
          `insert into master_form_field_options(field_id, option_value, slug, created_at, updated_at) values($1, $2, $3, $4, $5)`,
          [id, option.value.trim(), optionSlug, timeStamp, timeStamp]
        );
      }
    }

    await pool.query(`COMMIT`);

    res.status(StatusCodes.CREATED).json({ data: `success` });
  } catch (error) {
    await pool.query(`ROLLBACK`);
    console.log(error);
  }
};

// ------
export const deleteFormField = async (req, res) => {};
