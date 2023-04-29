// imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// requiring routes
const LOGIN = require("./routes/login");
const SIGNUP = require("./routes/signUp");
const CHECKUSERID = require("./routes/checkuserId");
const NEWORG = require("./routes/newOrganisation");
const LEAVEORG = require("./routes/leaveOrganisation");
const ORGANISATIONS = require("./routes/organisations");
const ISSUES = require("./routes/issues");
const CHATS = require("./routes/chats");
const NEWCAT = require("./routes/newCategory");
const CATEGORY = require("./routes/categories");
const MEMBERS = require("./routes/members");

main().catch(err => console.log(err));

// connecting mongodb
async function main() {
    await mongoose.connect(
      "mongodb+srv://ishavishwakarma29:ishaDizkuz@cluster0.zwbubwl.mongodb.net/test"
      // "mongodb+srv://adityarai:aditya07@dizkuz.4tvbing.mongodb.net/test"
    );
    console.log("db connected");
}

const server = express();
server.use(cors());

// user login
server.use("/login", LOGIN);
// user signUp
server.use("/signUp", SIGNUP);
// check if user with given user id exists
server.use("/checkuserid", CHECKUSERID);
// create new organisation
server.use("/newOrg", NEWORG);
// leave organisation
server.use("/leaveOrg", LEAVEORG);
// get all organisations
server.use("/organisations", ORGANISATIONS);
// get all issues
server.use("/issues", ISSUES);
// get messages
server.use("/chats", CHATS);
// new category
server.use("/newCategory", NEWCAT);
// category page
server.use("/categories", CATEGORY);
// members
server.use("/members", MEMBERS);

// starting server
server.listen(8080, () => {
    console.log("server started");
});