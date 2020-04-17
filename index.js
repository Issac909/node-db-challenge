const server = require("./api/server");

const PORT = process.env.PORT || 5000;

server.get("/", (req, res) => {
  res.send("<h1>Node DB Sprint Challenge!</h1>");
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
