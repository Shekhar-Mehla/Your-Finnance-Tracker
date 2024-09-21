import express from "express";

const server = express();
const PORT = process.env.port || 3000;
server.use(express.json());

server.post("/api/v1/user", (req, res) => {
  res.send(req.body);
});

server.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${PORT}`);
});
