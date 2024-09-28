import bcrypt from "bcrypt";
export const encryptedPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
export const ComparePassword = (databasePassword, UserPassword) => {
  return bcrypt.compareSync(UserPassword, databasePassword);
};
