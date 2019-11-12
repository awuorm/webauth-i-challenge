const express = require("express");
const helmet  = require("helmet");
const cors  = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const userRouter = require("./data/userRouter");

const  server = express();


// const sessionConfig = {
//     name: 'ladygaga',
//     secret: 'make it a little long and keep it safe!',
//     cookie: {
//       maxAge: 1000 * 60 * 60, // you need it if the cookie is to survive !!
//       secure: false, // with secure, the cookie only gets set when https !!
//       httpOnly: false,
//     },
//     resave: false,
//     saveUninitialized: false,
//     store: new KnexSessionStore({
//       knex: require('../database/dbConfig'),
//       tablename: 'sessions',
//       sidfieldname: 'sid',
//       createtable: true,
//       clearInterval: 1000 * 60 * 60
//     })
//   }

const sessionConfig = {
    name: "sessionCookie",
    secret: "make it a little long and keep it safe!",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
        httpOnly: false
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: require("./data/db-config"),
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 1000 *60 *60
    })
}
  

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api",userRouter);

module.exports = server;
