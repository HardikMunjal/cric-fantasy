// all the api(s) and the routes are to be written here

const taskController = require("../controllers/taskController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const logController = require("../controllers/logController");
const Role = require("../schemas/roleSchema");

module.exports = function (app) {
  app.get("/home", (req, res) => {
    logController.customEmitter.emit("addLog", "home");
    res.send("Welcome to the registration page");
  });
  app.post("/authenticate", userController.validateCredential);
  app.get("/test", authController.validateToken); //just for token validation "testing"
  app.post(
    "/register",
    userController.checkExistingUserName,
    userController.checkExistingUserEmail,
    userController.uploadImg,
    userController.createNewUser
  );
  app.post("/task", taskController.createTask);
  app.get("/task", taskController.getTask);
  app.get("/viewlog", logController.Log.fetchLogEntries);
  app.post("/roles", (req, res) => {
    //console.log(req.body);
    const a = new Role(req.body);
    a.save()
      .then(() => {
        res.status(201).send(user);
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  });

  app.post("/user/:uid", userController.addFriends);
  /* /user/:username/
     friends [id1,id2]

*/
};
