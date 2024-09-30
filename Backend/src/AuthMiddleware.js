export const Authmiddleware = (req, res, next) => {
  console.log(req.headers);
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
};
