import { StatusCodes } from "http-status-codes";
import pool from "../db.js";
import { BadRequestError } from "../errors/customErrors.js";
import { checkPassword, hashPassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";
import { generateSlug } from "../utils/functions.js";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

// ------test
export const register = async (req, res) => {
  const { firstName, lastName, email, mobile, password, tnc } = req.body;
  console.log(firstName, lastName, email, mobile, password, tnc);
  const createdAt = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const updatedAt = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const userUuid = uuidv4();
  const userPass = await hashPassword(password);
  const userSlug = await generateSlug(firstName.trim(), lastName.trim());
  const roleId = 3;

  const data = await pool.query(
    `insert into master_users(first_name, last_name, email, mobile, password, created_at, updated_at, uuid, slug, role_id) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`,
    [
      firstName.trim(),
      lastName.trim(),
      email,
      mobile,
      userPass,
      createdAt,
      updatedAt,
      userUuid,
      userSlug,
      roleId,
    ]
  );

  res.status(StatusCodes.CREATED).json({ data });
};

// ------
export const login = async (req, res) => {
  const { username, password, remember } = req.body;

  const checkUsername = await pool.query(
    `select count(*) from master_users where email=$1 and is_active=true`,
    [username]
  );
  if (Number(checkUsername.rows[0].count) === 0)
    throw new BadRequestError(`Incorrect username`);

  const user = await pool.query(
    `select * from master_users where email=$1 and is_active=true`,
    [username]
  );

  const checkPass = await checkPassword(password, user.rows[0].password);

  if (!checkPass) throw new BadRequestError(`Incorrect password`);

  const payload = {
    uuid: user.rows[0].uuid,
  };
  const oneDay = 1000 * 60 * 60 * 24;
  const oneMonth = 1000 * 60 * 60 * 24 * 30;

  const token = createJWT(payload, remember);

  const expiryDate = remember
    ? new Date(Date.now() + oneMonth)
    : new Date(Date.now() + oneDay);

  res.cookie("token", token, {
    httpOnly: true,
    expires: expiryDate,
    secure: process.env.APP_ENV === "production",
  });

  res.status(StatusCodes.ACCEPTED).json({ data: user.rows[0] });
};

// ------
export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.NO_CONTENT).json({ msg: "User logged out" });
};

// ------
export const currentUser = async (req, res) => {
  const { uuid } = req.user;

  const user = await pool.query(
    `select master_users.*, role_master.role from master_users join role_master on master_users.role_id = role_master.id where master_users.uuid=$1`,
    [uuid]
  );

  res.status(StatusCodes.OK).json({ data: user });
};

// ------
export const restrict = async (req, res) => {
  res.status(StatusCodes.OK).json({ data: `OK` });
};

// ------
export const access = async (req, res) => {
  res.status(StatusCodes.OK).json({ data: `OK` });
};

// ------
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const min = 100000;
  const max = 999999;

  try {
    await pool.query(`BEGIN`);

    const resetToken = Math.floor(Math.random() * (max - min + 1)) + min;
    const emailEnc = await hashPassword(email);
    const tokenEnc = await hashPassword(resetToken.toString());
    const createdAt = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

    await pool.query(`delete from password_reset_tokens where email=$1`, [
      email,
    ]);

    await pool.query(
      `insert into password_reset_tokens(email, email_enc, token, token_enc, created_at) values($1, $2, $3, $4, $5)`,
      [email, emailEnc, resetToken, tokenEnc, createdAt]
    );

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: "Easy Lending Buddy <easylendingbuddy@test.com>",
      to: email,
      subject: "Reset password link - Easy Lending Buddy",
      html: `<b>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus nihil ut a ducimus velit. Quam alias nam quaerat iure numquam dolor id praesentium cum asperiores, est, voluptatum, modi accusantium corrupti!</b><br /><br />Reset OTP: ${resetToken}<br /><br /><a href="http://localhost:5173/reset-password/${encodeURIComponent(
        emailEnc
      )}/${encodeURIComponent(
        tokenEnc
      )}">Click the link to reset your password</a>
      `,
    });

    await pool.query(`COMMIT`);

    res.status(StatusCodes.OK).json({ data: `email sent` });
  } catch (error) {
    await pool.query(`ROLLBACK`);
    res.status(StatusCodes.BAD_REQUEST).json({ data: `failed` });
  }
};

// ------
export const resetPassword = async (req, res) => {
  const { otp, password, tokenEnc, emailEnc } = req.body;

  try {
    await pool.query(`BEGIN`);

    const newPassword = await hashPassword(password);

    const userEmail = await pool.query(
      `select email from password_reset_tokens where token=$1 and email_enc=$2`,
      [otp, emailEnc]
    );

    await pool.query(`update master_users set password=$1 where email=$2`, [
      newPassword,
      userEmail.rows[0].email,
    ]);

    await pool.query(
      `delete from password_reset_tokens where token=$1 and token_enc=$2 and email_enc=$3`,
      [otp, tokenEnc, emailEnc]
    );

    await pool.query(`COMMIT`);

    res.status(StatusCodes.ACCEPTED).json({ data: `success` });
  } catch (error) {
    await pool.query(`ROLLBACK`);
    res.status(StatusCodes.BAD_REQUEST).json({ data: `failed` });
  }
};
