import bcrypt from "bcrypt";
export const encryptedPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
