const mongodb = require("mongodb").MongoClient;
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

let url = "mongodb://localhost/cric-fantasy";

//const f1 = () => { //Converting User collection to CSV
    mongodb.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },
        (err, client) => {
            if (err) throw err;
            client
            .db("cric-fantasy")
            .collection("users")
            .find({})
            .toArray((err, data) => {
                if (err) throw err;
                //console.log(data);
                const json2csvParser = new Json2csvParser({ header: true });
                const csvData = json2csvParser.parse(data);
                fs.writeFile("./api/emails/users.csv", csvData, function(error) {
                    if (error) throw error;
                    console.log("User collection converted successfully!");
                });
                client.close();
            });
        }
    );
//}

//const f2 = () =>{//Converting Role collection to CSV
    mongodb.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },(err, client) => {
            if (err) throw err;
            client
            .db("cric-fantasy")
            .collection("roles")
            .find({})
            .toArray((err, data) => {
                if (err) throw err;
                //console.log(data);
                const json2csvParser = new Json2csvParser({ header: true });
                const csvData = json2csvParser.parse(data);
                fs.writeFile("./api/emails/roles.csv", csvData, function(error) {
                    if (error) throw error;
                    console.log("Roles collection converted successfully!");
                });
                client.close();
            });
        }
    );
//}

module.exports