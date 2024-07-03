import dayjs from "dayjs";
import CryptoJS from "crypto-js";

export const serialNo = (page) => {
  const srno = !page || page <= 1 ? 1 : (page - 1) * 10 + 1;
  return srno;
};

export const switchColor = (roleId) => {
  let bcolor;

  if (roleId === 1) {
    bcolor = "primary";
  } else if (roleId === 2) {
    bcolor = "danger";
  } else if (roleId === 3) {
    bcolor = "success";
  }

  return bcolor;
};

export const switchColorF = (ftype) => {
  let bcolor;

  if (ftype === `text`) {
    bcolor = "primary";
  } else if (ftype === `textarea`) {
    bcolor = "danger";
  } else if (ftype === `dropdown`) {
    bcolor = "success";
  } else if (ftype === `radio`) {
    bcolor = "purple";
  } else if (ftype === `checkbox`) {
    bcolor = "warning";
  }

  return bcolor;
};

export const dateFormatFancy = (date) => {
  const label = dayjs(new Date(date)).format(`dddd, MMMM D, YYYY h:mm A`);
  return label;
};

export const encParam = (value) => {
  return encodeURIComponent(
    CryptoJS.AES.encrypt(value, import.meta.env.VITE_ENC_KEY).toString()
  );
};

export const decParam = (value) => {
  const data = CryptoJS.AES.decrypt(value, import.meta.env.VITE_ENC_KEY);

  return data.toString(CryptoJS.enc.Utf8);
};
