const server = require("./server");
const dotenv = require("dotenv");
dotenv.config();

const port  = process.env.PORT;

server.get("*",(req,res) => {
    res.status(200).json({success:"Hello from auth server!"})
    console.log("Hello from auth server!");
});

server.listen(port,() => {
    console.log("Listening on port", port);
});
