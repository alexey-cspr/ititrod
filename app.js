const express = require("express");
const fs = require("fs");
    
const app = express();
const jsonParser = express.json();
  
app.use(express.static(__dirname + "/public"));
  
const filePath = "users.json";
app.get("/api/users", function(req, res){
       
    const content = fs.readFileSync(filePath,"utf8");
    const users = JSON.parse(content);
    res.send(users);
});
app.get("/api/users/:id", function(req, res){
       
    const id = req.params.id;
    const content = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(content);
    let user = null;
    for(var i=0; i<users.length; i++){
        if(users[i].id==id){
            user = users[i];
            break;
        }
    }
    if(user){
        res.send(user);
        console.log(id)
    }
    else{
        res.status(404).send();
    }
});
app.post("/api/users", jsonParser, function (req, res) {
      
    if(!req.body) return res.sendStatus(400);

    const userLogin = req.body.login;
    const userPassword = req.body.password;
    const action = req.body.action;

    if (action == "register"){
        let user = {login: userLogin, password: userPassword};
        console.log(userLogin, userPassword);

        let data = fs.readFileSync(filePath, "utf8");
        let users = JSON.parse(data);

        const id = Math.max.apply(Math,users.map(function(o){return o.id;}))

        user.id = id+1;
        user.login = userLogin;
        user.password = userPassword;

        users.push(user);
        data = JSON.stringify(users);

        fs.writeFileSync("users.json", data);
        res.send(user);
    }
    else {
        let user = {login: userLogin, password: userPassword};
        console.log(userLogin, userPassword);

        let data = fs.readFileSync(filePath, "utf8");
        let users = JSON.parse(data);

        local_user = null;
        for (let i = 0; i < users.length; i++) {
            if (users[i].login == userLogin){
                local_user = users[i];
            }
        }

        if (local_user != null){
            if (local_user.password == user.password){
                user.authResult = "auth OK";
            } 
            else {
                user.authResult = "wrong password";
            } 
        } 
        else {
            user.authResult = "wrong login";
        } 
        console.log(user.login + " authentication");
        res.send(user);
    }
});

app.put("/api/users", jsonParser, function(req, res){
       
    if(!req.body) return res.sendStatus(400);
      
    const userId = req.body.id;
    const userLogin = req.body.login;
    const userPassword = req.body.password;
      
    let data = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(data);

    if(users){
        data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        res.send(userLogin + " auth");
    }
    else{
        res.status(404).send(user);
    }
});

app.delete("/api/users/:id", function(req, res){
       
    const id = req.params.id;
    let data = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(data);
    let index = -1;
    for(var i=0; i < users.length; i++){
        if(users[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        const user = users.splice(index, 1)[0];
        data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);

        res.send(user);
    }
    else{
        res.status(404).send();
    }
});

app.listen(5500, function(){
    console.log("Сервер ожидает подключения...");
});

console.log('hello')

