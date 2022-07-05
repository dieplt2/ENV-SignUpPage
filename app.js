//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
console.log("Hello")

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firsName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const hoby = req.body.hoby;
    const data1 = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firsName,
                    LNAME: lastName,
                    PHONE: 0982583592,
                    HOBY: hoby
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data1);
    const url = "https://us13.api.mailchimp.com/3.0/lists/5572e4c2a5";
    const option = {
        method: "POST",
        auth: "diep:60b654d59feb5c778fc44c69d01644ac-us13",
    }
    const request = https.request(url, option, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
       console.log("data from MailChimp again!")
     
    })
    
    request.write(jsonData);
    request.end();
    
    res.sendFile(__dirname + "/success.html");
})

app.listen(process.env.PORT || 5000, function(){
    console.log("Server is listening on port 5000!");
});

