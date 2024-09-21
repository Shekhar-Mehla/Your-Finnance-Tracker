import express from "express";
import { route } from "./src/routes/UserRouter.js";
// database connection function
import { connectiondb } from "./src/config/DatabaseConnection.js";

const server = express();
connectiondb();

const PORT = process.env.port || 3000;
server.use(express.json());

server.use("/api/v1/users", route);

server.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${PORT}`);
});
