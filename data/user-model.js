const db = require("./db-config");

module.exports = {
    find,
    // findById,
    // add
}

function find() {
    db("users");
}