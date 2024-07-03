import slug from "slug";
import pool from "../db.js";

const updateSlug = async () => {
  const data = await pool.query(`select id, city from master_locations`);

  for (const city of data.rows) {
    const citySlug = slug(city.city);
    await pool.query(`update master_locations set slug=$1 where id=$2`, [
      citySlug,
      city.id,
    ]);
  }
};
updateSlug();
