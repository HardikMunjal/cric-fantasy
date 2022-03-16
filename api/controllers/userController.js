const bcrypt = require("bcryptjs");
const User = require("../schemas/userSchema");
const userModel = require("../models/userModel");
const passValidator = require("../../helpers/utility");
const auth = require("./authController");
const logContoller = require("../controllers/logController");

module.exports = user = {
  checkExistingUserName: function (req, res, next) {
    userModel.checkExistingUserName(req.body, function (error, result) {
      // console.log(error)
      // console.log(result)
      if (error) {
        return res.status(500).send(error);
      } else if (result.length > 0) {
        return res.status(400).send("Username already exists");
      }
      next();
    });
  },
  checkExistingUserEmail: function (req, res, next) {
    userModel.checkExistingUserEmail(req.body, function (error, result) {
      // console.log('in another block')
      // console.log(error)
      // console.log(result)
      if (error) {
        return res.status(500).send(error);
      } else if (result.length > 0) {
        let message = "Email id is already registered";
        return res.status(400).send(message);
      }
      next();
    });
  },

  createNewUser: function (req, res) {
    logContoller.customEmitter.emit("addLog", "add-user");
    if (!passValidator(req.body.password))
      return res
        .status(400)
        .send("Password must contain 1 numeric and 1 special character");
    userModel.newUser(req.body, function (error, result) {
      if (error) {
        return res.status(400).send({ error });
      }
      if (!result) {
        return res.status(400).send("something went wrong");
      }
      res.status(201).send("Success!");
    });
  },

  // addFriends: function(req,res){

  //   },

  addFriends: async function (req, res) {
    const isarray = Array.isArray(req.body.rid);
    
    if (isarray) {
      req.body.rid.forEach(async (currentID) => {
        const user = await User.findOne({ _id: req.params.uid});
        const receivingUser = await User.findById(currentID);
        if (receivingUser.friends.includes(req.params.uid)) {
          res.status(400).send("Already a friend");
        } else if (currentID === req.params.uid) {
          res.status(400).send("Can't add yourself as a friend");
        } else {
          user.friends.push(receivingUser);
          await user.save();
          receivingUser.friends.push(user);
          await receivingUser.save();
        }
      });
      res.status(201).send("user friend added");

    } else {
      const user = await User.findOne({ _id: req.params.uid });
      const receivingUser = await User.findById(req.body.rid);
      if (receivingUser.friends.includes(req.params.uid)) {
        res.status(400).send("Already a friend");
      } else if (req.body.rid === req.params.uid) {
        res.status(400).send("Can't add yourself as a friend");
      } else {
        user.friends.push(receivingUser);
        await user.save();
        receivingUser.friends.push(user);
        await receivingUser.save();
        res.status(201).send("user friend added");
      }
    }
  },
  validateCredential: async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      res.status(403).json({ error: "Email & password required" });
    } else {
      const umail = await User.findOne({ email: email });
      if (!umail) {
        res.status(403).json({ error: "User does not exist" });
      } else {
        const match = await bcrypt.compare(password, umail.password);

        if (match) {
          const accessToken = auth.createToken(umail);
          res.status(200).json(accessToken);
        } else {
          res.status(403).json({ error: "Invalid password" });
        }
      }
    }
  },
};
