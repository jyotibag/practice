import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";
import { paginationLogic } from "../../utils/functions.js";
import dayjs from "dayjs";
import slug from "slug";

// ------
export const pageCategories = async (req, res) => {
  const { page, search, parent } = req.query;
  const pagination = paginationLogic(page, null);

  const searchStr = search ? ` and (category ilike '%${search.trim()}%')` : ``;
  const searchDrp = parent ? ` and parent_id=${parent}` : ``;

  const data = await pool.query(
    `
    with recursive category_tree AS (
      select
        id, 
        category, 
        parent_id,
        category as pcategory,
        is_active,
        has_brand,
        0 as level
      from master_categories where parent_id is null
      union all
      select
        c.id, 
        c.category,
        c.parent_id,
        ct.category as pcategory,
        c.is_active,
        c.has_brand,
        ct.level + 1
      from master_categories c
      inner join category_tree ct on c.parent_id = ct.id
    )
    select
      id,
      category,
      parent_id,
      pcategory,
      is_active,
      has_brand,
      level
    from category_tree
    where id is not null ${searchStr} ${searchDrp}
    order by pcategory, level, parent_id, id offset $1 limit $2`,
    [pagination.offset, pagination.pageLimit]
  );

  const records = await pool.query(
    `select c.* from master_categories as c where c.id is not null ${searchStr} ${searchDrp}`,
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
export const allCategories = async (req, res) => {
  const data = await pool.query(
    `select * from master_categories order by category`,
    []
  );
  // console.log(data.rows);
  res.status(StatusCodes.OK).json({ data });
};

// ------
export const addCategory = async (req, res) => {
  const { isParent, parentId, category, hasBrand } = req.body;

  const pid = !isParent ? parentId : null;

  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const categorySlug = slug(category);

  const data = await pool.query(
    `insert into master_categories(category, slug, parent_id, created_at, updated_at, has_brand) values($1, $2, $3, $4, $5, $6)`,
    [category.trim(), categorySlug, pid, timeStamp, timeStamp, hasBrand]
  );

  res.status(StatusCodes.CREATED).json({ data: `success` });
};

// ------
export const editCategory = async (req, res) => {
  const { id } = req.params;
  const { isParent, parentId, category, hasBrand } = req.body;

  const pid = !isParent ? parentId : null;

  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const categorySlug = slug(category);

  const data = await pool.query(
    `update master_categories set category=$1, slug=$2, parent_id=$3, updated_at=$4, has_brand=$6 where id=$5`,
    [category.trim(), categorySlug, pid, timeStamp, id, hasBrand]
  );

  res.status(StatusCodes.ACCEPTED).json({ data: `success` });
};

// ------
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

  await pool.query(
    `update master_categories set is_active=false, deleted_at=$1 where id=$2`,
    [timeStamp, id]
  );

  res.status(StatusCodes.NO_CONTENT).json({ data: `success` });
};

// ------
export const getCategories = async (req, res) => {
  const data = await pool.query(
    `select * from master_categories where parent_id is null and is_active=true order by category`,
    []
  );

  res.status(StatusCodes.OK).json({ data });
};

// ------
export const getAllCategories = async (req, res) => {
  const data = await pool.query(
    `select cat1.id, cat1.category,cat1.slug,
    json_agg(
            json_build_object(
              'id', cat2.id,
              'category', cat2.category,
              'slug', cat2.slug
            )
          ) AS sub_cat
    from master_categories cat1
    left join master_categories cat2 on cat1.id=cat2.parent_id  
		
    where cat1.parent_id is null and cat1.is_active=true  
	  and cat2.is_active=true
    group by cat1.id`,
    []
  );

  res.status(StatusCodes.OK).json({ data });
};

// ------
export const getChildCategories = async (req, res) => {
  const { id } = req.params;
  const data = await pool.query(
    `select * from master_categories where parent_id=$1 and is_active=true order by category`,
    [id]
  );

  res.status(StatusCodes.OK).json({ data });
};

// ------
export const parentCategories = async (req, res) => {
  const data = await pool.query(
    `select * from master_categories where parent_id is null and is_active=true order by category`,
    []
  );
  res.status(StatusCodes.OK).json({ data });
};

// ------
export const getFormFieldWithOptions = async (req, res) => {
  const { catid } = req.params;
  const data = await pool.query(
    `
      select 
        f.*,
        json_agg(
          json_build_object(
            'option_id', o.id,
            'option_value', o.option_value
          )
        ) as options
      from master_form_fields f
      left join master_form_field_options o on f.id = o.field_id
      where f.cat_id = $1
      group by f.id
    `,
    [catid]
  );
  res.status(StatusCodes.OK).json({ data });
};
