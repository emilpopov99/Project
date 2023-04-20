const express = require('express')
const cors = require('cors')

const app = express()

// middleware

app.use(express.json())

app.use(express.urlencoded({ extended: true }))


// routers
require('./routes/auth.routes')(app);
const router = require('./routes/user.routes.js')
app.use('/api', router)


//port
app.get("/", (req, res) => {
    res.json({ message: "Welcome to MyParfum application." });
});

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

const db = require("./models");
const Role = db.roles;
db.sequelize.sync();


db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "Admin"
  });
 
  Role.create({
    id: 2,
    name: "User"
  });
 
}